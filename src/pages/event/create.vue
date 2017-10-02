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
          <form @submit.prevent="createEvent()">
            <div class="form-group">
              <label for="title">Title</label>
              <input type="text" class="form-control" name="title" id="title" v-model="form.title">
            </div>

            <div class="form-group">
              <label for="location">Location</label>
              <input type="text" class="form-control" name="location" id="location" v-model="form.location">

              <div id="map" ref="mapContainer" @click-map="setLocationGeo($event)"></div>
            </div>

            <div class="form-group">
              <label for="description">Description</label>
              <textarea class="form-control" name="description" id="description" v-model="form.description" rows="3"></textarea>
            </div>

            <div class="form-group">
              <label for="startsAt">Starts at</label>
              <flat-pickr v-model="form.startsAt"
                          class="form-control"
                          name="startsAt"
                          id="startsAt"
                          placeholder="Click to select date">
              </flat-pickr>
            </div>

            <div class="form-group">
              <label for="duration">Duration</label>
              <input type="text" class="form-control" name="duration" id="duration" v-model="form.duration">
            </div>

            <div class="form-group">
              <label for="guestsLimit">Participants limit</label>
              <input type="text" class="form-control" name="guestsLimit" id="guestsLimit" v-model="form.guestsLimit">
            </div>

            <div class="form-group">
              <label for="registrationEndsAt">Register ends at</label>
              <flat-pickr v-model="form.registrationEndsAt"
                          class="form-control"
                          name="registrationEndsAt"
                          id="registrationEndsAt"
                          placeholder="Click to select date">
              </flat-pickr>
            </div>

            <div class="form-group">
              <label class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" name="isPrivate" v-model="form.isPrivate">
                <span class="custom-control-indicator"></span>
                <span class="custom-control-description">Is event private?</span>
              </label>
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
        markerLayer: null
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

      this.$on('click-map', (event) => {
        this.setLocationGeo(event)
      })
    },

    methods: {
      createEvent: function () {
        this.$store.dispatch('event/create', this.form)
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
          this.$emit('click-map', event)
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
