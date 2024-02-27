import { promises as fs} from 'fs'

const { readFile, writeFile } = fs

async function createAccount (account) {
  const data = JSON.parse(await readFile(global.filename))
  account = {
    id:  data.nextId ++,
    name: account.name,
    balance: account.balance
  }

  data.accounts.push(account)

  await writeFile(global.filename, JSON.stringify(data, null, 2))

  return account
}

async function getAccounts () {
  return JSON.parse(await readFile(global.filename))?.accounts
}

async function getAccountById (id) {
  const data = JSON.parse(await readFile(global.filename))?.accounts
  
  return data?.find(account => account.id === parseInt(id))
}

async function deleteAccountById (id) {
  const data = JSON.parse(await readFile(global.filename))
  data.accounts = data.accounts.filter(account => account.id !== parseInt(id))

  await writeFile(global.filename, JSON.stringify(data, null, 2))

  return data
}

async function updateAccount (account) {
  const data = JSON.parse(await readFile(global.filename))
  
  const index = data.accounts.findIndex(dataAccount => dataAccount.id === account.id)
  if (index === -1) throw new Error('account not found')

  

  data.accounts[index].name = account.name
  data.accounts[index].balance = account.balance

  await writeFile(global.filename, JSON.stringify(data))

  return data.accounts[index]
}

async function updateBalance (account) {
  const data = JSON.parse(await readFile(global.filename))
  const index = data.accounts.findIndex(dataAccount => dataAccount.id === account.id)

  if (index === -1) throw new Error('account not found')

  data.accounts[index].balance = account.balance

  await writeFile(global.filename, JSON.stringify(data))

  return data.accounts[index]
}

export default {
  createAccount,
  getAccounts,
  getAccountById,
  deleteAccountById,
  updateAccount,
  updateBalance
}