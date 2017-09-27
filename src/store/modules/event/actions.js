import Vue from 'vue'
import * as types from './mutation-types'
import EventProxy from '@/proxies/EventProxy'
import EventTransformer from '@/transformers/EventTransformer'
import PaginationTransformer from '@/transformers/PaginationTransformer'

const proxy = new EventProxy()

export const all = ({ commit }, fn = null) => {
  if (typeof fn === 'function') {
    fn(proxy)
  }

  proxy.all()
    .then((response) => {
      const data = {
        events: response.data,
        pagination: PaginationTransformer.fetch(response)
      }

      commit(types.ALL, data)
    })
}

export const create = ({ commit }, event) => {
  const transformedEvent = EventTransformer.send(event)

  proxy.create(transformedEvent)
    .then(() => {
      Vue.router.push({
        name: 'home.index'
      })
    })
}

export const join = ({ commit }, id) => {
  proxy.join(id)
    .then(() => {

    })
}

export default {
  all,
  create,
  join
}
