<template>
  <div>
    <bar-chart class="small" :chart-data="datacollection"></bar-chart>
  </div>
</template>

<script>
import BarChart from './BarChart'
import {mapActions,mapState} from 'vuex'


export default {
  components: {
    BarChart
  },
  data () {
    return {
      datacollection: {},
    }
  },
  async created () {
    await this.Fechas()
    this.fillData()
  },
  computed: {
    ...mapState(['datos','fecha'])
  },
  methods: {
    ...mapActions(['Fechas']),
    fillData () {
      this.datacollection = {
        labels:  this.datos.map(res => res.requestedAt),
        datasets: [{
            label: '# of Successful',
            data: this.datos.map(res => res.request.successful),
            backgroundColor: '#92EFFE',
            borderColor: '#52BDF4',
            borderWidth: 1
          },
          {
            label: '# of Error',
            data: this.datos.map(res => res.request.error),
            backgroundColor: '#F7998A',
            borderColor: '#DE614E',
            borderWidth: 1
          }
        ],
      }
    },
  },
  watch: {
      datos: function() {
        this.fillData()
      }
  },
}
</script>

<style>
  .small {
    width: 60vw;
  }
</style>