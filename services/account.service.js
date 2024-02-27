import AccountRepository from '../repositories/account.repository.js'


async function createAccount (account) {
  return await AccountRepository.insertAccount(account)
}

async function getAccounts () {
  return await AccountRepository.getAccounts()
}

async function getAccountById (id) {
  return await AccountRepository.getAccount(id)
}

async function deleteAccountById (id) {
  return await AccountRepository.deleteAccountById(id)
}

async function updateAccount (account) {
  return await AccountRepository.updateAccount(account)
}

async function updateBalance (account) {
  return await AccountRepository.updateBalance(account)
}

export default {
  createAccount,
  getAccounts,
  getAccountById,
  deleteAccountById,
  updateAccount,
  updateBalance
}