import deleteMethod from '@/methods/delete'
import saveMethod from '@/methods/save'
import updateMethod from '@/methods/update'
import pickKeys from '@/methods/pick-keys'
import Service from '@/Service.js'

const services = {}

export default function( Model, config)
{
  // Static
  Model.crud = function()
  {
    if(!services[this.name]) services[this.name] = new Service(this, config)
    return services[this.name]
  }

  // Instance
  Model.prototype.delete = deleteMethod
  Model.prototype.save = saveMethod
  Model.prototype.update = updateMethod
  Model.prototype.pickKeys = pickKeys

  // test :)
  Model.prototype.sayHello = () => { console.log('hello world!') }
}
