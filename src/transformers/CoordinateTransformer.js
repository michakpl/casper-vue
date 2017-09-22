import moment from 'moment'
import BaseTransformer from './BaseTransformer'

class CoordinateTransformer extends BaseTransformer {
  static fetch (coordinate) {
    if (coordinate.resourceSets.length) {
      return [
        coordinate.resourceSets[0].resources[0].point.coordinates[1],
        coordinate.resourceSets[0].resources[0].point.coordinates[0]
      ]
    } else {
      return [0, 0]
    }
  }
}

export default CoordinateTransformer
