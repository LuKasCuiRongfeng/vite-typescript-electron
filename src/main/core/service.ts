import { net, ClientRequestConstructorOptions } from "electron";
import { _Headers } from "src/consts/ipc";
import { App } from "../app";


interface _Request extends ClientRequestConstructorOptions {
    url: string,
    method?: "GET" | "POST",
    credentials?: "include" | "omit",
    params?: Buffer | string,
    headers?: _Headers
}

export class Service {
    constructor(public myApp: App) { }

    async request(options: _Request) {
        const req = net.request({
            url: options.url,
            method: options.method || "GET",
            credentials: options.credentials || "include"
        })
        const { params, headers, method } = options
        if (headers) {
            const keys = Object.keys(headers)
            keys.forEach(key => req.setHeader(key, headers[key]))
        }
        if (params && method === "POST") {
            req.write(params)
        }
        req.end()
        const chunkList: Buffer[] = []
        const res = await new Promise<Buffer[]>((resolve, reject) => {
            req.on("response", res => {
                res.on("end", () => {
                    resolve(chunkList)
                })
                res.on("data", chunk => {
                    chunkList.push(chunk)
                })
                res.on("error", () => {
                    reject("error")
                })
            })
        })
        return this.concatBuffer(res).toString()
    }

    concatBuffer(chunkList: Buffer[]) {
        let totalLength = 0
        chunkList.forEach(chunk => totalLength += chunk.length)
        return Buffer.concat(chunkList, totalLength)
    }
}