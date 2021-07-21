// import { nextTick } from 'vue'
import { createStore } from 'vuex'
import axios from 'axios'
import VuexORM from '@vuex-orm/core'
import VuexORMCRUD from '@/index'
import {Service} from '@/Service'

// Vuex ORM
const client = axios.create({
  baseURL: 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity',
  params: {
    api_key: "DEMO_KEY",
    sol: 1000,
    camera: "fhaz"
  },
})
VuexORM.use(VuexORMCRUD, {
  client,
  dataKey: "photos"
})

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

  // create user
  class Photo extends VuexORM.Model {
    static entity = 'photos'
  }

  it('can install the plugin', async () => {

    // check AXIOS
    expect(store.$axios).toBe(client)

    // check Service
    const photoRepo = store.$repo(Photo)
    expect(photoRepo.$crud).toBeInstanceOf(Service)

    // check get
    let records = await photoRepo.$crud.get()
    console.log(records)
    expect(photoRepo.find(1)).toBeInstanceOf(Photo)
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

    const photoRepo = store.$repo(User)

    expect(photoRepo.apolloProvider).toBe(apolloProvider)
    expect(photoRepo.apollo).toBe(apolloClient)
  })
})

*/
