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

// TEST BABY
jest
  .spyOn(axios, "get")
  .mockImplementation(() => Promise.resolve({
    "photos": [
      {
        "id": 102693,
        "img_src": "http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01000/opgs/edr/fcam/FLB_486265257EDR_F0481570FHAZ00323M_.JPG",
      },
      {
        "id": 102694,
        "img_src": "http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01000/opgs/edr/fcam/FRB_486265257EDR_F0481570FHAZ00323M_.JPG",
      }
    ]
  }));

describe('unit/VuexORMCRUD', () => {

  // create user
  class Photo extends VuexORM.Model {

    static entity = 'photos'

    static fields () {
      return {
        id: this.attr(null),
        img_src: this.attr(null)
      }
    }
  }

  // INSTALL
  it('can install the plugin', async () => {

    // check AXIOS
    expect(store.$axios).toBe(client)

    // check Service
    const photoRepo = store.$repo(Photo)
    expect(photoRepo.$crud).toBeInstanceOf(Service)
  })


  // GET
  it('can DO GET', async () => {

    // check get
    const photoRepo = store.$repo(Photo)
    await photoRepo.$crud.get()
    expect(photoRepo.orderBy('id').first()).toBeInstanceOf(Photo)
  })
})
