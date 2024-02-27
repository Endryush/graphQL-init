import express from 'express'
import { promises as fs} from 'fs'

const { readFile, writeFile } = fs
const router = express.Router()


router
  .post('/', async (req, res) => {
    try {
      let account = req.body

      if (!account.name || account.balance === null ||  account.balance === undefined) {
        throw new Error ('campos name e balance são obrigatórios')
      }
      const data = JSON.parse(await readFile(global.filename))
      account = {
        id:  data.nextId ++,
        name: account.name,
        balance: account.balance
      }

      data.accounts.push(account)

      await writeFile(global.filename, JSON.stringify(data, null, 2))

      logger.info(`POST /account - ${JSON.stringify(account)}`)
      res.send(account)
    } catch (error) {
      logger.error(`${req.method} => ${req.baseUrl} ${error.message}`)
      res.status(500).send({ error: error.message })
    }
  })

  .get('/', async (req, res) => {
    try {
      const data = JSON.parse(await readFile(global.filename))

      logger.info(`GET /account`)
      res.send({ accounts: data.accounts })
    } catch (error) {
      logger.error(`${req.method} => ${req.baseUrl} ${error.message}`)
      res.status(500).send({ error: error.message })
    }
  })

  .get('/:id', async (req, res) => {
    try {
      const { id } = req.params
      const data = JSON.parse(await readFile(global.filename)).accounts
      const currentAccount = data.find(account => account.id === parseInt(id))

      logger.info(`GET /account/:id`)

      res.send(currentAccount)
    } catch (error) {
      logger.error(`${req.method} => ${req.baseUrl} ${error.message}`)
      res.status(500).send({ error: error.message })
    }
  })

  .delete('/:id', async (req, res) => {
    try {
      const { id } = req.params
      const data = JSON.parse(await readFile(global.filename))
      data.accounts = data.accounts.filter(account => account.id !== parseInt(id))

      await writeFile(global.filename, JSON.stringify(data, null, 2))
      logger.info(`DELETE /account/:id => account deleted = ${id}`)
      res.end()
    } catch (error) {
      logger.error(`${req.method} => ${req.baseUrl} ${error.message}`)
      res.status(500).send({ error: error.message })
    }
  })

  .put('/', async (req, res) => {
    try {
      const account = req.body
      const data = JSON.parse(await readFile(global.filename))
      console.error('indes', data)
      const index = data.accounts.findIndex(dataAccount => dataAccount.id === account.id)
      if (index === -1) throw new Error('account not found')
      
      if (!account.name || account.balance === null ||  account.balance === undefined) {
        throw new Error ('campos name e balance são obrigatórios')
      }
      

      data.accounts[index].name = account.name
      data.accounts[index].balance = account.balance

      await writeFile(global.filename, JSON.stringify(data))
      
      logger.info(`PUT /account - ${JSON.stringify(account)}`)

      res.send(account)
    } catch (error) {
      logger.error(`${req.method} => ${req.baseUrl} ${error.message}`)
      res.status(500).send({ error: error.message })
    }
  })

  .patch('/updateBalance', async (req, res) => {
    try {
      const account = req.body

      const data = JSON.parse(await readFile(global.filename))
      const index = data.accounts.findIndex(dataAccount => dataAccount.id === account.id)

      if (index === -1) throw new Error('account not found')

      data.accounts[index].balance = account.balance

      await writeFile(global.filename, JSON.stringify(data))

      logger.info(`PATCH /account/updateBalance - ${JSON.stringify(account)}`)
      
      res.send(data.accounts[index])
    } catch (error) {
      logger.error(`${req.method} => ${req.baseUrl} ${error.message}`)
      res.status(500).send({ error: error.message })
    }
  })


export default router

