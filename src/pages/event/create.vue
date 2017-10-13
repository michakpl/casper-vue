<template>
  <div class="page page-event-create">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h2>Add Event</h2>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <form @submit.prevent="createEvent()" @keydown="errors.clear($event.target.name)" @change="errors.clear($event.target.name)">
            <div class="form-group">
              <label for="title">Title</label>
              <input type="text" class="form-control" :class="{'is-invalid': errors.has('title')}" name="title" id="title" v-model="form.title">

              <span class="invalid-feedback" v-if="errors.has('title')" v-text="errors.get('title')"></span>
            </div>

            <div class="form-group">
              <label for="location">Location</label>
              <input type="text" class="form-control" :class="{'is-invalid': errors.has('location')}" name="location" id="location" v-model="form.location">

              <div id="map" ref="mapContainer"></div>

              <span class="invalid-feedback" v-if="errors.has('location')" v-text="errors.get('location')"></span>
            </div>

            <div class="form-group">
              <label for="description">Description</label>
              <textarea class="form-control" :class="{'is-invalid': errors.has('description')}" name="description" id="description" v-model="form.description" rows="3"></textarea>

              <span class="invalid-feedback" v-if="errors.has('description')" v-text="errors.get('description')"></span>
            </div>

            <div class="form-group">
              <label for="startsAt">Starts at</label>
              <flat-pickr v-model="form.startsAt"
                          class="form-control"
                          :class="{'is-invalid': errors.has('startsAt')}"
                          name="startsAt"
                          id="startsAt"
                          placeholder="Click to select date">
              </flat-pickr>

              <span class="invalid-feedback" v-if="errors.has('startsAt')" v-text="errors.get('startsAt')"></span>
            </div>

            <div class="form-group">
              <label for="duration">Duration</label>
              <input type="text" class="form-control" :class="{'is-invalid': errors.has('duration')}" name="duration" id="duration" v-model="form.duration">

              <span class="invalid-feedback" v-if="errors.has('duration')" v-text="errors.get('duration')"></span>
            </div>

            <div class="form-group">
              <label for="guestsLimit">Participants limit</label>
              <input type="text" class="form-control" :class="{'is-invalid': errors.has('guestsLimit')}" name="guestsLimit" id="guestsLimit" v-model="form.guestsLimit">

              <span class="invalid-feedback" v-if="errors.has('guestsLimit')" v-text="errors.get('guestsLimit')"></span>
            </div>

            <div class="form-group">
              <label for="registrationEndsAt">Register ends at</label>
              <flat-pickr v-model="form.registrationEndsAt"
                          class="form-control"
                          :class="{'is-invalid': errors.has('registrationEndsAt')}"
                          name="registrationEndsAt"
                          id="registrationEndsAt"
                          placeholder="Click to select date">
              </flat-pickr>

              <span class="invalid-feedback" v-if="errors.has('registrationEndsAt')" v-text="errors.get('registrationEndsAt')"></span>
            </div>

            <div class="form-group">
              <label class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" :class="{'is-invalid': errors.has('isPrivate')}" name="isPrivate" v-model="form.isPrivate">
                <span class="custom-control-indicator"></span>
                <span class="custom-control-description">Is event private?</span>
              </label>

              <span class="invalid-feedback" v-if="errors.has('isPrivate')" v-text="errors.get('isPrivate')"></span>
            </div>

            <button type="submit" class="btn btn-primary">Save</button>
          </form>
        </div>
      </div>
    </div>
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

  import 'flatpickr/dist/flatpickr.css'
  import FlatPickr from 'vue-flatpickr-component'

  import Errors from '@/utils/Errors'
  import EventProxy from '@/proxies/EventProxy'
  import LocationProxy from '@/proxies/LocationProxy'
  import EventTransformer from '@/transformers/EventTransformer'
  import CoordinateTransformer from '@/transformers/CoordinateTransformer'

  const eventProxy = new EventProxy()
  const locationProxy = new LocationProxy()

  export default {
    name: 'event-create',

    data: function () {
      return {
        form: {
          title: null,
          location: null,
          locationGeo: null,
          description: null,
          startsAt: null,
          duration: null,
          guestsLimit: null,
          registrationEndsAt: null,
          isPrivate: false
        },
        map: null,
        markerLayer: null,
        errors: new Errors()
      }
    },

    computed: {
      view: function () {
        return new View({
          center: Projection.fromLonLat([0, 0]),
          zoom: 4.5,
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
      }
    },

    mounted: function () {
      this.initMap()
    },

    methods: {
      createEvent: function () {
        const transformedEvent = EventTransformer.send(this.form)

        eventProxy.create(transformedEvent)
          .then((response) => {
            this.$store.dispatch('event/create', this.form)
          })
          .catch(({ errors }) => {
            this.errors.record(errors)
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

        this.map.on('click', (event) => {
          this.setLocationGeo(event)
        })
      },

      getLocationGeo: _.debounce(function (location) {
        locationProxy.query(location)
          .then((response) => {
            this.form.locationGeo = CoordinateTransformer.fetch(response)

            this.setMarker(this.form.locationGeo)
            this.map.getView().setCenter(Projection.fromLonLat(this.form.locationGeo))
            this.map.getView().setZoom(12)
          })
      }, 1500),

      setMarker: function (location) {
        if (this.markerLayer) {
          this.map.removeLayer(this.markerLayer)
        }

        let eventMarker = new Feature({
          type: 'icon',
          geometry: new GeomPoint(Projection.fromLonLat(location))
        })

        this.markerLayer = new VectorLayer({
          source: new VectorSource({
            features: [eventMarker]
          }),
          style: this.markerStyle
        })

        this.map.addLayer(this.markerLayer)
      },

      setLocationGeo: function (event) {
        this.form.locationGeo = Projection.toLonLat(event.coordinate, 'EPSG:3857')

        this.setMarker(this.form.locationGeo)
      }
    },

    components: {
      FlatPickr
    },

    watch: {
      'form.location': function (val) {
        this.getLocationGeo(val)
      }
    }
  }
</script>

<style lang="scss">
  #map {
    height: 200px;
  }
</style>
