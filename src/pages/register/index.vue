<template>
  <div class="page page-register">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-6">
          <form @submit.prevent="register()" @keydown="errors.clear($event.target.name)" @change="errors.clear($event.target.name)">
            <div class="form-group">
              <label for="username">Username</label>
              <input type="text" class="form-control" :class="{'is-invalid': errors.has('username')}" name="username" v-model="form.username">

              <span class="invalid-feedback" v-if="errors.has('username')" v-text="errors.get('username')"></span>
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input type="text" class="form-control" :class="{'is-invalid': errors.has('email')}" name="email" v-model="form.email">

              <span class="invalid-feedback" v-if="errors.has('email')" v-text="errors.get('email')"></span>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" class="form-control" :class="{'is-invalid': errors.has('password')}" name="password" v-model="form.password">

              <span class="invalid-feedback" v-if="errors.has('password')" v-text="errors.get('password')"></span>
            </div>
            <div class="form-group">
              <label for="passwordConfirmation">Password confirmation</label>
              <input type="password" class="form-control" :class="{'is-invalid': errors.has('passwordConfirmation')}" name="passwordConfirmation" v-model="form.passwordConfirmation">

              <span class="invalid-feedback" v-if="errors.has('passwordConfirmation')" v-text="errors.get('passwordConfirmation')"></span>
            </div>
            <div class="form-group">
              <label for="gender">Gender</label>
              <select class="form-control" :class="{'is-invalid': errors.has('gender')}" name="gender" v-model="form.gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>

              <span class="invalid-feedback" v-if="errors.has('gender')" v-text="errors.get('gender')"></span>
            </div>
            <div class="form-group">
              <label for="birthdate">Birthdate</label>
              <flat-pickr v-model="form.birthdate"
                          class="form-control"
                          :class="{'is-invalid': errors.has('birthdate')}"
                          name="birthdate"
                          id="birthdate"
                          placeholder="Click to select date">
              </flat-pickr>

              <span class="invalid-feedback" v-if="errors.has('birthdate')" v-text="errors.get('birthdate')"></span>
            </div>
            <button type="submit" class="btn btn-primary">Register</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import 'flatpickr/dist/flatpickr.css'
  import Errors from '@/utils/Errors'
  import UserProxy from '@/proxies/UserProxy'
  import FlatPickr from 'vue-flatpickr-component'
  import UserTransformer from '@/transformers/UserTransformer'

  const proxy = new UserProxy()

  export default {
    data () {
      return {
        form: {
          username: null,
          email: null,
          password: null,
          passwordConfirmation: null,
          gender: 'male',
          birthdate: null
        },
        errors: new Errors()
      }
    },

    methods: {
      register () {
        proxy.register(UserTransformer.send(this.form))
          .then((response) => {
            this.$store.dispatch('user/register', this.form)
          })
          .catch(({ errors }) => {
            this.errors.record(errors)
          })
      }
    },

    components: {
      FlatPickr
    }
  }
</script>
