import BaseProxy from './BaseProxy'
import PaginationTransformer from '@/transformers/PaginationTransformer'

class EventProxy extends BaseProxy {
  constructor () {
    super('events')
  }

  upcoming (payload = []) {
    return this.submit('get', `${this.endpoint}/upcoming`, {
      params: PaginationTransformer.send(payload)
    })
  }

  get (id) {
    return this.submit('get', `${this.endpoint}/${id}`)
  }

  create (item) {
    return this.submit('post', `${this.endpoint}`, item)
  }

  join (id) {
    return this.submit('post', `${this.endpoint}/${id}/join`)
  }
}

export default EventProxy
