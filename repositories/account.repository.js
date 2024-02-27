import { promises as fs} from 'fs'

const { readFile, writeFile } = fs


async function getAccounts () {
  const data = JSON.parse(await readFile(global.filename))

  return data.accounts || []
}

async function getAccount (id) {
  const accounts = await getAccounts()
  const account = accounts.find(account => account.id === parseInt(id))

  if (account) {
    return account
  }

  throw new Error('Registro não encontrado')
}

async function  insertAccount (account) {
  const data = JSON.parse(await readFile(global.filename))
  account = {
    id:  data.nextId ++,
    name: account.name,
    balance: account.balance
  }

  data.accounts.push(account)

  await writeDataAccount(data)

  return account
}

async function deleteAccountById (id) {
  let data = JSON.parse(await readFile(global.filename))
  data.accounts = data.accounts.filter(account => account.id !== parseInt(id))

  await writeDataAccount(data)

  return data
}
 
async function updateAccount (account) {
  const data = JSON.parse(await readFile(global.filename))
  
  const index = data.accounts.findIndex(dataAccount => dataAccount.id === account.id)
  if (index === -1) throw new Error('account not found')

  

  data.accounts[index].name = account.name
  data.accounts[index].balance = account.balance

  await writeDataAccount(data)

  return data.accounts[index]
}

async function updateBalance (account) {
  const currentAccount = await getAccount(account.id)

  currentAccount.balance = account.balance
  await updateAccount(currentAccount)

  return currentAccount
}

async function writeDataAccount (data) {
  return await writeFile(global.filename, JSON.stringify(data, null, 2))
}

export default {
  getAccounts,
  insertAccount,
  getAccount,
  deleteAccountById,
  updateAccount,
  updateBalance
}