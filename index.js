import express from 'express'
import winston from 'winston'
import { promises as fs} from 'fs'
import accountsRouter from './routes/accounts.js'
import cors from 'cors'


const { readFile, writeFile } = fs
// global json file to write and read items for learning purposes
global.filename = 'accounts.json'
const { combine, timestamp, label, printf } = winston.format
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}]  ${level}: ${message}`
})
global.logger = winston.createLogger({
  level: 'silly',
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({ filename: 'bank-api-logger.log' })
  ],
  format: combine(
    label({ label: 'my-bank-api' }),
    timestamp(),
    myFormat
  )
})
const app = express()
app.use(cors())
app.use(express.json())


// routes
app.use('/account', accountsRouter )

app.listen(3000, async ()=> {
  try {
    await readFile(global.filename)
    logger.info('Server is running on port 3000')

  } catch (error) {
    const initialJson = {
      nextId: 1,
      accounts: []
    }
    await writeFile(global.filename, JSON.stringify(initialJson))
    logger.info('Server is running on port 3000, initialJson has created')
  }
})