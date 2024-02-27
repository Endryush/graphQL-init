import express from 'express'
import accountController from '../controllers/account.controller.js'


const router = express.Router()


router
  .post('/', accountController.createAccount)

  .get('/', accountController.getAllAccounts)

  .get('/:id', accountController.getAccountById)

  .delete('/:id', accountController.deleteAccountById)

  .put('/', accountController.updateAccount)

  .patch('/updateBalance', accountController.updateBalance)


export default router

