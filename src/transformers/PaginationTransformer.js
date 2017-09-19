import BaseTransformer from './BaseTransformer'

class PaginationTransformer extends BaseTransformer {
  static fetch (pagination) {
    return {
      totalCount: parseInt(pagination.total),
      totalPages: parseInt(pagination.last_page),
      currentPage: parseInt(pagination.current_page),
      limit: parseInt(pagination.per_page)
    }
  }

  static send (pagination) {
    return {
      current_page: pagination.currentPage,
      per_page: pagination.limit
    }
  }
}

export default PaginationTransformer
