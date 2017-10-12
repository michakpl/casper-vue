<template>
  <div class="page page-home">
    <div class="container">
      <h2>Upcoming events</h2>
      <div class="list-group">
        <router-link v-for="event in events" :key="event.id" :to="'/event/' + event.id" class="list-group-item list-group-item-action flex-column align-items-start">
          <div class="d-flex justify-content-between row">
            <h5 class="mb-1 col-md-6">{{ event.title }}</h5>
            <small class="col-md-6 text-right d-none d-lg-block">{{ event.startsAt | moment('dddd, MMMM Do YYYY') }} (duration: {{ event.duration }})</small>
          </div>
          <p class="mb-1">
            {{ event.description }}
          </p>
          <small>{{ event.location }}</small><br>
          <small class="d-lg-none">{{ event.startsAt | moment('dddd, MMMM Do YYYY') }} (duration: {{ event.duration }})</small>
        </router-link>
      </div>
      <b-pagination-nav
        size="md"
        align="center"
        base-url="/"
        v-model="currentPage"
        :use-router="true"
        :number-of-pages="pagination.totalPages" />
    </div>
  </div>
</template>
<script>
  import EventProxy from '@/proxies/EventProxy'
  import EventTransformer from '@/transformers/EventTransformer'
  import PaginationTransformer from '@/transformers/PaginationTransformer'

  const eventProxy = new EventProxy()

  export default {
    name: 'home-index',

    data: function () {
      return {
        currentPage: parseInt(this.$route.params.page || 1),
        events: [],
        pagination: {
          totalPages: parseInt(this.$route.params.page || 1),
          currentPage: parseInt(this.$route.params.page || 1),
          limit: 5
        }
      }
    },

    mounted: function () {
      this.upcoming()
    },

    methods: {
      upcoming () {
        eventProxy.upcoming(this.pagination)
          .then((response) => {
            this.events = EventTransformer.fetchCollection(response.data)
            this.pagination = PaginationTransformer.fetch(response)
          })
      }
    },

    watch: {
      currentPage: function (val) {
        this.pagination.currentPage = val
        this.upcoming()
      }
    }
  }
</script>
