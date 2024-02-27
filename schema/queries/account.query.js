import { GraphQLInt, GraphQLList } from "graphql"
import AccountType from "../types/Account.js"
import AccountResolver from "../resolvers/account.resolver.js";

const accountQueries = {
  getAccounts: {
    type: new GraphQLList(AccountType),
    resolve: () => AccountResolver.getAccounts()
  },
  getAccount: {
    type: AccountType,
    args: {
      id:{
        name: 'id',
        type: GraphQLInt
      }
    },
    resolve: (_, { id }) => AccountResolver.getAccountById(id)
  }
}

export default accountQueries