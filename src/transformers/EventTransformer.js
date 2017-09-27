import moment from 'moment'
import BaseTransformer from './BaseTransformer'
import UserTransformer from './UserTransformer'

class EventTransformer extends BaseTransformer {
  static fetch (event) {
    return {
      id: event.id,
      title: event.title,
      location: event.location,
      locationGeo: event.location_geo ? event.location_geo.split(',').map(Number) : null,
      description: event.description,
      startsAt: event.starts_at,
      duration: moment.duration(event.duration, 'hours').humanize(),
      guestsLimit: event.guests_limit,
      registrationEndsAt: event.registration_ends_at,
      isPrivate: event.is_private,
      user: event.user ? UserTransformer.fetch(event.user) : event.user_id,
      guests: event.guests ? UserTransformer.fetchCollection(event.guests) : [],
      createdAt: event.created_at,
      updatedAt: event.updated_at
    }
  }

  static send (event) {
    return {
      title: event.title,
      location: event.location,
      location_geo: event.locationGeo ? event.locationGeo.join() : null,
      description: event.description,
      starts_at: event.startsAt,
      duration: event.duration,
      guests_limit: event.guestsLimit,
      registration_ends_at: event.registrationEndsAt,
      is_private: event.isPrivate
    }
  }
}

export default EventTransformer
