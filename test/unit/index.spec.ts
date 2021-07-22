import { createStore } from 'vuex'
import axios from 'axios';
import VuexORM from '@vuex-orm/core'
import { Item, Attr, Str } from '@vuex-orm/core'
import VuexORMCRUD from '@/index'
import {Service} from '@/Service'


// MOCK
import mockAxios from 'jest-mock-axios';
afterEach(() => {
  // cleaning up the mess left behind the previous test
  mockAxios.reset();
});

// Vuex ORM
const baseURL:string = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity'
const params =  {
  api_key: "DEMO_KEY",
  sol: 1000,
  camera: "fhaz"
}
const client = axios.create({
  baseURL: baseURL,
  params: params,
})
VuexORM.use(VuexORMCRUD, {
  client
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
describe('unit/VuexORMCRUD', () => {

  // create user
  class Photo extends VuexORM.Model {

    static entity = 'photos'

    @Attr(null)
    id!: number | null

    @Str('')
    img_src!: string
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
    const promise = photoRepo.$crud.get()

    //expect(mockAxios.get).toHaveBeenCalledWith(baseURL, params);
    mockAxios.mockResponse({  "data": [
      {
        "id": 1,
        "img_src": "A.JPG",
      },
      {
        "id": 2,
        "img_src": "B.JPG",
      }
    ]});
    await promise;

    expect(photoRepo.orderBy('id').first()).toBeInstanceOf(Photo)
  })

  // SAVE
  it('can DO SAVE', async () => {

    // check get
    const photoRepo = store.$repo(Photo)
    const promise = photoRepo.$crud.save({
      "id": 3,
      "img_src": "C.JPG",
    })

    mockAxios.mockResponse({ "data": {
      "id": 3,
      "img_src": "C.JPG",
    }});

    await promise;
    const lastPhoto:Item<Photo> = photoRepo.orderBy('id', 'desc').first()
    expect(lastPhoto).toBeInstanceOf(Photo)
    expect(lastPhoto?.id).toBe(3)
  })
})
