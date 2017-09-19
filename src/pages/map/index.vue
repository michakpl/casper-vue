<template>
  <div class="page page-map">
    <div class="container">
      <div id="map" ref="mapContainer"></div>
    </div>
  </div>
</template>
<script>
  import 'ol/ol.css'
  import Map from 'ol/map'
  import View from 'ol/view'
  import Feature from 'ol/feature'
  import Icon from 'ol/style/icon'
  import Style from 'ol/style/style'
  import TileLayer from 'ol/layer/tile'
  import OSMSource from 'ol/source/osm'
  import GeomPoint from 'ol/geom/point'
  import VectorLayer from 'ol/layer/vector'
  import VectorSource from 'ol/source/vector'

  import EventProxy from '@/proxies/EventProxy'
  import EventTransformer from '@/transformers/EventTransformer'

  const eventProxy = new EventProxy()

  export default {
    name: 'map-index',

    data: function () {
      return {
        map: null,
        events: []
      }
    },

    computed: {
      view: function () {
        return new View({
          projection: 'EPSG:3857',
          center: [0, 0],
          zoom: 4.5
        })
      },

      layers: function () {
        return [
          new TileLayer({
            source: new OSMSource()
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

      this.upcoming()
    },

    methods: {
      initMap: function () {
        this.map = new Map({
          target: this.$refs.mapContainer,
          loadTilesWhileAnimating: true,
          view: this.view,
          layers: this.layers
        })
      },

      addMarker: function (location) {
        let eventMarker = new Feature({
          type: 'icon',
          geometry: new GeomPoint(location)
        })

        let markerLayer = new VectorLayer({
          source: new VectorSource({
            features: [eventMarker]
          }),
          style: this.markerStyle
        })

        this.map.addLayer(markerLayer)
      },

      upcoming () {
        eventProxy.upcoming()
          .then((response) => {
            this.events = EventTransformer.fetchCollection(response)

            this.addEventsToMap()
          })
      },

      addEventsToMap () {
        for (let event in this.events) {
          if (event.locationGeo) {
            let coordinates = event.locationGeo.split(',')

            this.addMarker(coordinates)
          }
        }
      }
    },

    watch: {
    }
  }
</script>

<style>
  #map {
    min-height: 300px;
    width: 100%;
  }
</style>
