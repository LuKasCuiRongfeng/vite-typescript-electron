import { exec, ChildProcess } from 'child_process'
import { join } from 'path'
import { watch, rollup, OutputOptions } from 'rollup'
import minimist from 'minimist'
import chalk from 'chalk'
import ora from 'ora'
import waiton from 'wait-on'
import { config } from 'dotenv'
import { rollupConfig } from './rollup.config'

config()

const argv = minimist(process.argv.slice(2))
const spinner = ora({ text: "> wait for renderer packaging..." }).start()
const rollupOptions = rollupConfig(argv.prod)
const watcher = watch(rollupOptions)
let child: ChildProcess
if (!argv.prod) {
    waiton({
        resources: [`tcp:${process.env.PORT}`]
    }).then(() => {
        spinner.start("> ready to compile main process...")
        watcher.on("change", filename => {
            console.log(chalk.yellowBright(`> ${filename} has been changed`))
        })
        watcher.on("event", e => {
            if (e.code === "END") {
                console.log("> compile main process successfully")
                console.log("> path: " + join(__dirname, "../dist/main/main.js"))
                if (child) child.kill()
                spinner.start("> ready to start electron")
                let command = "electron ."
                if (argv.debug) {
                    command = "electron --inspect=5858 ."
                    console.log(chalk.yellowBright(`open chrome://inspect to debug main process`))
                }
                child = exec(command, (err, stdout) => {
                    if (err) {
                        console.log(chalk.red(err.message))
                        process.exit(1)
                    }
                })
                console.log(chalk.yellowBright("> electron start successfully"))
            } else if (e.code === "ERROR") {
                console.log(chalk.red(`${e.error}`))
            }
        })
    })
} else {
    spinner.start("> ready to compile main process...")
    rollup(rollupOptions).then(build => {
        spinner.stop()
        console.log("> compile main process successfully")
        console.log("> path: " + join(__dirname, "../dist/main/main.js"))
        build.write(rollupOptions.output as OutputOptions).then(() => {
            // 必须主动调用，不然没法进入打包
            process.exit(0)
        })
    }).catch(err => {
        spinner.stop()
        console.log(chalk.red(`failed to complie: ${err}`))
        process.exit(1)
    })
}