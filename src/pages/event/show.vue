<template>
  <div class="page page-event">
    <div class="container">
      <div class="row" v-if="event">
        <div class="col-12">
          <h2>{{ event.title }}</h2>
          <p class="description">
            {{ event.description }}
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6" v-if="event">
          <table class="table table-sm">
            <tbody>
              <tr>
                <td>Created by:</td>
                <td>{{ event.user.username }}</td>
              </tr>
              <tr>
                <td>Location</td>
                <td>{{ event.location }}</td>
              </tr>
              <tr>
                <td>Starts at:</td>
                <td>{{ event.startsAt | moment('h:mm a dddd, MMMM Do YYYY') }}</td>
              </tr>
              <tr>
                <td>Duration</td>
                <td>{{ event.duration }}</td>
              </tr>
              <tr>
                <td>Participant limit</td>
                <td>{{ event.guestLimit ? event.guestLimit : 'no limit' }}</td>
              </tr>
              <tr>
                <td>Registration ends at:</td>
                <td>{{ event.registrationEndsAt | moment('h:mm a dddd, MMMM Do YYYY') }}</td>
              </tr>
              <tr>
                <td>Status</td>
                <td>{{ event.isPrivate ? 'Invitation only' : 'Public' }}</td>
              </tr>
              <tr>
                <td>Created at</td>
                <td>{{ event.createdAt | moment('MMMM Do YYYY, h:mm:ss a') }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-md-6">
          <div id="map" ref="mapContainer"></div>
        </div>
      </div>
      <div class="row">
        <div class="col-12" v-if="event">
          <div>
            <h2 class="d-inline">Participants</h2>
            <a
              href="#"
              class="btn btn-sm btn-primary float-right"
              @click.prevent="showInvitationForm()"
              @if="isAuthor">
            Invite</a>
            <a
              @click.prevent="join()"
              href="#"
              class="btn btn-sm btn-primary float-right"
              v-if="$store.state.auth.authenticated === true && isJoined && !isAuthor">
            Join</a>
            <span class="clearfix"></span>
          </div>
          <ul v-if="event.guests.length">
            <li v-for="guest in event.guests">{{ guest.username }}</li>
          </ul>
          <p v-else class="text-center">No participants yet</p>
        </div>
      </div>
    </div>
    <b-modal ref="invitationForm" title="Invitiation Form" :hide-footer="true" :no-enforce-focus="true">
      <invitation-form :event="event"/>
    </b-modal>
  </div>
</template>
<script>
  import 'ol/ol.css'
  import _ from 'lodash'
  import Map from 'ol/map'
  import View from 'ol/view'
  import Projection from 'ol/proj'
  import Icon from 'ol/style/icon'
  import Feature from 'ol/feature'
  import Style from 'ol/style/style'
  import GeomPoint from 'ol/geom/point'
  import TileLayer from 'ol/layer/tile'
  import VectorLayer from 'ol/layer/vector'
  import VectorSource from 'ol/source/vector'
  import BingSource from 'ol/source/bingmaps'

  import EventProxy from '@/proxies/EventProxy'
  import EventTransformer from '@/transformers/EventTransformer'
  import InvitationForm from '@/components/event/InvitationForm'

  const eventProxy = new EventProxy()

  export default {
    name: 'event-show',

    data: function () {
      return {
        map: null,
        event: null
      }
    },

    computed: {
      view: function () {
        return new View({
          center: Projection.fromLonLat(this.event.locationGeo),
          zoom: 16,
          maxZoom: 19
        })
      },

      layers: function () {
        return [
          new TileLayer({
            source: new BingSource({
              key: process.env.BING_API_KEY,
              imagerySet: 'AerialWithLabels'
            })
          })
        ]
      },

      markerStyle: function () {
        return new Style({
          image: new Icon(({
            anchor: [0.5, 1],
            anchorXUnits: 'fraction',
            anchorYUnits: 'fraction',
            opacity: 1,
            src: 'http://openlayers.org/en/v3.19.1/examples/data/icon.png'
          }))
        })
      },

      isJoined: function () {
        let guestIndex = _.findIndex(this.event.guests, (guest) => {
          return guest.id === this.$store.state.auth.currentUser.id
        })

        if (guestIndex !== -1) {
          return false
        }

        return true
      },

      isAuthor: function () {
        return this.event.user.id === this.$store.state.auth.currentUser.id
      }
    },

    mounted: function () {
      this.getEvent(this.$route.params.id)
    },

    methods: {
      getEvent: function (id) {
        eventProxy.get(id)
                  .then((response) => {
                    this.event = EventTransformer.fetch(response)

                    if (this.event.locationGeo) {
                      this.initMap()

                      this.addMarker(this.event.locationGeo)
                    }
                  })
      },

      initMap: function () {
        if (this.map) {
          this.map.updateSize()
        } else {
          this.map = new Map({
            target: this.$refs.mapContainer,
            loadTilesWhileAnimating: true,
            view: this.view,
            layers: this.layers
          })
        }
      },

      addMarker: function (location) {
        let eventMarker = new Feature({
          type: 'icon',
          geometry: new GeomPoint(Projection.fromLonLat(location))
        })

        let markerLayer = new VectorLayer({
          source: new VectorSource({
            features: [eventMarker]
          }),
          style: this.markerStyle
        })

        this.map.addLayer(markerLayer)
      },

      join: function () {
        eventProxy.join(this.event.id)
          .then(() => {
            this.getEvent(this.event.id)
          })
      },

      showInvitationForm: function () {
        this.$refs.invitationForm.show()
      }
    },

    components: {
      InvitationForm
    }
  }
</script>
<style lang="scss">
  table {
    td:first-child {
      font-weight: 700;
    }
  }

  #map {
    height: 400px;
    width: 100%;
  }

  .row {
    margin-bottom: 15px;
  }
</style>
