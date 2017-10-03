<template>
  <div>
    <form @submit.prevent="invite()">
      <div class="form-group">
        <multiselect
          v-model="user"
          track-by="id"
          label="username"
          :options="users">
        </multiselect>
      </div>

      <div class="text-center form-group">
        <button class="btn btn-primary">Invite</button>
      </div>
    </form>
  </div>
</template>
<script>
  import Multiselect from 'vue-multiselect'
  import UserProxy from '@/proxies/UserProxy'
  import EventProxy from '@/proxies/EventProxy'

  const userProxy = new UserProxy()
  const eventProxy = new EventProxy()

  export default {
    props: [
      'event'
    ],

    data: function () {
      return {
        user: null,
        users: []
      }
    },

    methods: {
      getUsers: function () {
        userProxy.list()
          .then(({users}) => {
            this.users = users
          })
      },

      invite: function () {
        eventProxy.invite(this.event.id, this.user.id)
          .then((response) => {
            this.$emit('user-invited')
          })
      }
    },

    mounted: function () {
      this.getUsers()
    },

    components: {
      Multiselect
    }
  }
</script>

<style>
  form {
    border: none;
  }
</style>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
