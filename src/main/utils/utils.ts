import { app } from 'electron'
import { join } from 'path'
import { config } from 'dotenv'

config()

const baseUrl = app.isPackaged
    ? join(__dirname, "../../dist/render/html#")
    : `http://localhost:${process.env.PORT}/#`

function getBaseUrl() {
    return baseUrl
}


export {
    getBaseUrl
}