<template>
  <div class="page page-map">
    <div class="container">
      <form @submit.prevent="search()" class="row">
          <div class="col-10">
            <input type="text" class="form-control" name="location" v-model="location" placeholder="Your location">
          </div>
          <div class="col-2">
            <button type="submit" class="btn btn-primary">Search</button>
          </div>
      </form>

      <div id="map" ref="mapContainer"></div>
    </div>
  </div>
</template>
<script>
  import 'ol/ol.css'
  import Map from 'ol/map'
  import View from 'ol/view'
  import Projection from 'ol/proj'
  import Feature from 'ol/feature'
  import Icon from 'ol/style/icon'
  import Style from 'ol/style/style'
  import TileLayer from 'ol/layer/tile'
  import GeomPoint from 'ol/geom/point'
  import StyleFill from 'ol/style/fill'
  import GeomCircle from 'ol/geom/circle'
  import VectorLayer from 'ol/layer/vector'
  import StyleCircle from 'ol/style/circle'
  import StyleStroke from 'ol/style/stroke'
  import BingSource from 'ol/source/bingmaps'
  import VectorSource from 'ol/source/vector'

  import EventProxy from '@/proxies/EventProxy'
  import LocationProxy from '@/proxies/LocationProxy'
  import EventTransformer from '@/transformers/EventTransformer'
  import CoordinateTransformer from '@/transformers/CoordinateTransformer'

  const eventProxy = new EventProxy()
  const locationProxy = new LocationProxy()

  export default {
    name: 'map-index',

    data: function () {
      return {
        map: null,
        events: [],
        location: null,
        eventsRange: null,
        eventsCenter: null,
        rangeLayer: null
      }
    },

    computed: {
      view: function () {
        return new View({
          center: Projection.fromLonLat([-70.40062, 44.07293]),
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

      addEventsToMap: function () {
        for (let index in this.events) {
          let event = this.events[index]

          if (event.locationGeo && this.isEventInRange(event)) {
            this.addMarker(event.locationGeo)
          }
        }
      },

      search: function () {
        locationProxy.query(this.location)
          .then((response) => {
            this.locationCoordinate = CoordinateTransformer.fetch(response)

            this.map.getView().setCenter(Projection.fromLonLat(this.locationCoordinate))
            this.map.getView().setZoom(12)
            this.showEventsRange()

            this.fetchEventsInRange()
          })
      },

      showEventsRange: function (radius = 5000) {
        if (this.rangeLayer) {
          this.map.removeLayer(this.rangeLayer)
        }

        let resolution = this.map.getView().getResolution()
        let projection = this.map.getView().getProjection()
        let resolutionFactor = resolution / Projection.getPointResolution(projection, resolution, this.map.getView().getCenter())
        let radiusInUnits = (radius / Projection.METERS_PER_UNIT.m) * resolutionFactor

        let source = new VectorSource({wrapX: false})
        let rangeCircle = new GeomCircle(Projection.fromLonLat(this.locationCoordinate), radiusInUnits)

        this.rangeLayer = new VectorLayer({
          source: new VectorSource({
            features: [new Feature(rangeCircle)]
          })
        })

        this.map.addLayer(this.rangeLayer)

        this.eventsRange = Projection.transformExtent(rangeCircle.getExtent(), 'EPSG:3857', 'EPSG:4326')
        this.eventsCenter = Projection.toLonLat(this.map.getView().getCenter())
      },

      fetchEventsInRange: function () {
        eventProxy.upcoming({
          locationGeo: [
            `${this.eventsRange[0]},${this.eventsRange[1]}`,
            `${this.eventsRange[2]},${this.eventsRange[3]}`
          ]
        })
          .then((response) => {
            this.events = EventTransformer.fetchCollection(response)

            this.addEventsToMap()
          })
      },

      isEventInRange: function (event) {
        let mapRadius = this.eventsCenter[0] - this.eventsRange[0]

        let eventRadius = Math.pow((event.locationGeo[0] - this.eventsCenter[0]), 2) + Math.pow((event.locationGeo[1] - this.eventsCenter[1]), 2)

        return eventRadius <= mapRadius
      }
    }
  }
</script>

<style>
  #map {
    min-height: 300px;
    width: 100%;
  }

  form.row {
    margin-bottom: 30px;
  }
</style>
