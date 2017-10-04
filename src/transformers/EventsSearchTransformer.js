import BaseTransformer from './BaseTransformer'
import EventTransformer from '@/transformers/EventTransformer'
import PaginationTransformer from '@/transformers/PaginationTransformer'

class EventsSearchTransformer extends BaseTransformer {
  static fetch (events) {
    let pagination = PaginationTransformer.fetch(events)

    return {
      events: EventTransformer.fetchCollection(events.data),
      ...pagination
    }
  }

  static send (events) {
    let pagination = PaginationTransformer.send(events)

    return {
      location_geo: events.locationGeo,
      ...pagination
    }
  }
}

export default EventsSearchTransformer
