import { GraphQLBoolean, GraphQLInt } from "graphql";
import AccountType from "../types/Account.js"
import AccountInputType  from "../types/AccountInput.js";
import AccountResolver from "../resolvers/account.resolver.js";


const accountMutation = {
  createAccount: {
    type: AccountType,
    args: {
      account: {
        name: 'account',
        type: AccountInputType
      }
    },
    resolve: (_, { account }) => AccountResolver.createAccount(account)
  },
  deleteAccount: {
    type: GraphQLBoolean,
    args: {
      id: {
        name: 'id',
        type: GraphQLInt
      }
    },
    resolve: (_, { id }) => AccountResolver.deleteAccountById(id)
  },
  updateAccount: {
    type: AccountType,
    args: {
      account: {
        name: 'account',
        type: AccountInputType
      }
    },
    resolve: (_, { account }) => AccountResolver.updateAccount(account)
  }
}

export default accountMutation