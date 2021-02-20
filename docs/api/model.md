---
sidebarDepth: 2
---

# Model

## Static Methods

### crud

- **`crud(): Service`**

  Get CRUD Service instance.

  ```js
  const service = User.crud()
  ```

## Static Properties

### apiPath

- **`apiPath String`**

  Sets the API path if different than entity value

  ```js
  Model.apiPath = 'models'
  ```

## Instance Methods

### apiPath

- **`apiPath(path = null): String`**

  Return the API path for the instance

  ```js
  const user = User.find(1)

  console.log(user.apiPath()) // users/1
  ```

### delete

- **`delete(path = null, keys = null, config = null): Promise`**

  Deletes the instance in the API and the Store.

  ```js
  const user = User.find(1)

  user.delte()
  ```


### pickKeys

- **`pickKeys(keys = Object.keys(this.$toJson())): Array`**

  Deletes the instance in the API and the Store.

  ```js
  const user = User.find(1)

  console.log(user.pickKeys()); // ['first_name','last_name', ...]
  ```

### save

- **`save(path = null, keys = null, config = null): Promise`**

  Saves the instance in the API and the Store.

  ```js
  const user = new User({first_name:'toto', last_name: 'foo'})

  user.save()
  ```

### update

- **`update(path = null, keys = null, config = null): Promise`**

  Updates the instance in the API and the Store.

  ```js
  const user = User.find(1)
  user.first_name = 'changed'

  user.update()
  ```
