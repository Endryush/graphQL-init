import  AccountService from  '../services/account.service.js'

async function createAccount (req, res) {
  try {
    let account = req.body

    if (!account.name || account.balance === null ||  account.balance === undefined) {
      throw new Error ('campos name e balance são obrigatórios')
    }
    
    account =  await AccountService.createAccount(account)

    if (!account) {
      throw new Error('Erro ao criar conta')
    }

    logger.info(`POST /account - ${JSON.stringify(account)}`)
    res.send(account)
  } catch (error) {
    logger.error(`${req.method} => ${req.baseUrl} ${error.message}`)
    res.status(500).send({ error: error.message })
  }
}

async function getAllAccounts (req, res) {
  try {
    const data = await AccountService.getAccounts()

    logger.info(`GET /account`)
    res.send({ accounts: data })
  } catch (error) {
    logger.error(`${req.method} => ${req.baseUrl} ${error.message}`)
    res.status(500).send({ error: error.message })
  }
}

async function getAccountById (req, res) {
  try {
    const { id } = req.params
    const currentAccount = await AccountService.getAccountById(id)

    logger.info(`GET /account/:id`)

    res.send(currentAccount)
  } catch (error) {
    logger.error(`${req.method} => ${req.baseUrl} ${error.message}`)
    res.status(500).send({ error: error.message })
  }
}

async function deleteAccountById (req, res)  {
  try {
    const { id } = req.params

    await AccountService.deleteAccountById(id)

    logger.info(`DELETE /account/:id => account deleted = ${id}`)
    res.end()
  } catch (error) {
    logger.error(`${req.method} => ${req.baseUrl} ${error.message}`)
    res.status(500).send({ error: error.message })
  }
}

async function updateAccount (req, res) {
  try {
    const account = req.body

    if (!account.name || account.balance === null ||  account.balance === undefined) {
      throw new Error ('campos name e balance são obrigatórios')
    }
    
    logger.info(`PUT /account - ${JSON.stringify(account)}`)

    res.send(await AccountService.updateAccount(account))
  } catch (error) {
    logger.error(`${req.method} => ${req.baseUrl} ${error.message}`)
    res.status(500).send({ error: error.message })
  }
}

async function updateBalance (req, res) {
  try {
    const account = req.body

    if (!account.id || account.balance === null ||  account.balance === undefined) {
      throw new Error ('campos name e balance são obrigatórios')
    }

    logger.info(`PATCH /account/updateBalance - ${JSON.stringify(account)}`)
    
    res.send(await AccountService.updateBalance(account))
  } catch (error) {
    logger.error(`${req.method} => ${req.baseUrl} ${error.message}`)
    res.status(500).send({ error: error.message })
  }
}

export default {
  createAccount,
  getAllAccounts,
  getAccountById,
  deleteAccountById,
  updateAccount,
  updateBalance
}