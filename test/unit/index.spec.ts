import { createStore } from 'vuex'
import axios from 'axios';
import VuexORM from '@vuex-orm/core'
import { Item, Attr, Str } from '@vuex-orm/core'
import VuexORMCRUD from '@/index'
import {Service} from '@/Service'

// MOCK
import mockAxios from 'jest-mock-axios';
afterEach(() => { mockAxios.reset();});

// Vuex ORM
const client = axios.create()
VuexORM.use(VuexORMCRUD, {client})
const store = createStore({plugins: [VuexORM.install()]})

// create user
class Photo extends VuexORM.Model {

  static entity = 'photos'

  @Attr(null)
  id!: number | null

  @Str('')
  img_src!: string
}

// TEST BABY
describe('unit/VuexORMCRUD', () => {

  // 1. INSTALL
  it('can install the plugin', async () => {

    // check AXIOS
    expect(store.$axios).toBe(client)

    // check Service
    const photoRepo = store.$repo(Photo)
    expect(photoRepo.$crud).toBeInstanceOf(Service)
  })

  // 2. GET
  it('can DO GET', async () => {

    // check get
    const photoRepo = store.$repo(Photo)
    const promise = photoRepo.$crud.get()

    // mock response
    mockAxios.mockResponse({  "data": [
      {"id": 1,"img_src": "A.JPG"},
      {"id": 2,"img_src": "B.JPG"}
    ]});
    await promise;

    expect(photoRepo.orderBy('id').first()).toBeInstanceOf(Photo)
  })

  // 3. SAVE
  it('can DO SAVE', async () => {

    // check get
    const photoRepo = store.$repo(Photo)
    const promise = photoRepo.$crud.save({"id": 3,"img_src": "C.JPG"})

    // mock response
    mockAxios.mockResponse({ "data": {"id": 3, "img_src": "C.JPG"}});
    await promise;

    const lastPhoto:Item<Photo> = photoRepo.orderBy('id', 'desc').first()
    expect(lastPhoto).toBeInstanceOf(Photo)
    expect(lastPhoto?.id).toBe(3)
  })
})
