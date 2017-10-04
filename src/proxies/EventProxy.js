import BaseProxy from './BaseProxy'
import EventsSearchTransformer from '@/transformers/EventsSearchTransformer'

class EventProxy extends BaseProxy {
  constructor () {
    super('events')
  }

  upcoming (payload = null) {
    return this.submit('get', `${this.endpoint}/upcoming`, {
      params: EventsSearchTransformer.send(payload)
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

  invite (id, userId) {
    return this.submit('post', `${this.endpoint}/${id}/invite`, {
      user_id: userId
    })
  }

  removeGuest (id, guestId) {
    return this.submit('delete', `${this.endpoint}/${id}/guests/${guestId}`)
  }
}

export default EventProxy
