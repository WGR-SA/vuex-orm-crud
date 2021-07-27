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
VuexORM.use(VuexORMCRUD, {client, yo: 'test'})
const store = createStore({plugins: [VuexORM.install()]})

// create user
class Photo extends VuexORM.Model {
  static entity = 'photos'
  @Attr(null) id!: number | null
  @Str('') img_src!: string
}
const photoRepo = store.$repo(Photo)

// TEST BABY
describe('unit/VuexORMCRUD', () => {

  // 1. INSTALL
  it('can install the plugin', async () => {

    // check AXIOS
    expect(store.$axios).toBe(client)

    // check Service
    expect(photoRepo.$crud).toBeInstanceOf(Service)
  })

  // 2. GET
  it('can DO GET', async () => {

    // check get
    const promise = photoRepo.$crud.get()

    // mock response
    mockAxios.mockResponse({  "data": [
      {"id": 1,"img_src": "A.JPG"},
      {"id": 2,"img_src": "B.JPG"}
    ]});
    await promise;

    // check url called
    expect(mockAxios.get).toHaveBeenCalledWith('photos', {});

    // check store
    expect(photoRepo.orderBy('id').first()).toBeInstanceOf(Photo)
  })

  // 3. SAVE
  it('can DO SAVE', async () => {

    // check save
    let payload = {"img_src": "C.JPG"}
    const promise = photoRepo.$crud.save(payload)

    // mock response
    mockAxios.mockResponse({ "data": {"id": 3, "img_src": "C.JPG"}});
    await promise;

    // check url called
    expect(mockAxios.post).toHaveBeenCalledWith('photos', payload, {});

    // check store
    const lastPhoto:Item<Photo> = photoRepo.orderBy('id', 'desc').first()
    expect(lastPhoto?.id).toBe(3)
  })

  // 4. UPDATE
  it('can DO UPDATE', async () => {

    // check update
    let payload = {"id": 3, "img_src": "D.JPG"}
    const promise = photoRepo.$crud.update(payload)

    // mock response
    mockAxios.mockResponse({ "data": {"id": 3}});
    await promise;

    // check url called
    expect(mockAxios.put).toHaveBeenCalledWith('photos/3', payload, {});

    // check store
    const lastPhoto:Item<Photo> = photoRepo.orderBy('id', 'desc').first()
    expect(lastPhoto?.img_src).toBe("D.JPG")
  })

  // 4. DELETE
  it('can DO DELETE', async () => {

    // check delete
    const promise = photoRepo.$crud.delete(3)

    // mock response
    mockAxios.mockResponse({ "data": {"id": 3}});
    await promise;

    // check url called
    expect(mockAxios.delete).toHaveBeenCalledWith('photos/3', {});

    // check store
    const lastPhoto:Item<Photo> = photoRepo.orderBy('id', 'desc').first()
    expect(lastPhoto?.id).toBe(2)
  })
})
