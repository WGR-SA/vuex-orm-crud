// import { nextTick } from 'vue'
import { createStore } from 'vuex'
import axios from 'axios'
import VuexORM from '@vuex-orm/core'
import VuexORMCRUD from '@/index'

// Vuex ORM
const client = axios.create({ baseURL: '/api' })
VuexORM.use(VuexORMCRUD, { client })

const store = createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
  plugins: [VuexORM.install()]
})

describe('unit/VuexORMCRUD', () => {

  it('can install the plugin', () => {
    expect(store['$client']).toBe(client)
  })
})


/*
const link = createHttpLink({ uri: '/graphql', fetch })

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({ link, cache })

const apolloProvider = new ApolloProvider({
  defaultClient: apolloClient
})

Vue.use(Vuex)
VuexORM.use(VuexORMApollo, { apolloProvider })

describe('unit/VuexORMApollo', () => {
  class User extends Model {
    static entity = 'users'
  }

  it('can install the plugin', () => {
    const store = new Store({
      plugins: [VuexORM.install()],
      strict: true
    })

    expect(store.$apolloProvider).toBe(apolloProvider)
    expect(store.$apollo).toBe(apolloClient)

    const userRepo = store.$repo(User)

    expect(userRepo.apolloProvider).toBe(apolloProvider)
    expect(userRepo.apollo).toBe(apolloClient)
  })
})

*/
