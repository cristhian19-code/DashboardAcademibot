<template>
  <div>
    <bar-chart class="small" :chart-data="datacollection"></bar-chart>
  </div>
</template>

<script>
import BarChart from './BarChart'
import {mapActions,mapState} from 'vuex'
import axios from 'axios'
import queries from '@/queries/query'

export default {
  components: {
    BarChart
  },
  data () {
    return {
      datacollection: {},
      dato: []
    }
  },
  created () {
    this.Datos  
  },
  methods: {
    fillData () {
      this.datacollection = {
        labels:  this.dato.map(res => res.requestedAt),
        datasets: [{
            label: '# of Successful',
            data: this.dato.map(res => res.request.successful),
            backgroundColor: '#92EFFE',
            borderColor: '#52BDF4',
            borderWidth: 1
          },
          {
            label: '# of Error',
            data: this.dato.map(res => res.request.error),
            backgroundColor: '#F7998A',
            borderColor: '#DE614E',
            borderWidth: 1
          }
        ],
      }
    },
  },
  computed: {
    Datos: async function() {
      await axios.post(queries.apiURL,{
        query: queries.queries.date
      }).then(res => {
        var cont = 0;
        var error = 0;
        var response = [];
        let data = res.data.data.fileRequests;
        let aux_date =data[0].requestedAt.split('T')[0]; 
        data.forEach((element,index) => {
          if(aux_date === element.requestedAt.split('T')[0]){
            if(element.error){
              error++;
            }
            cont++;
            data[index].requestedAt = element.requestedAt.split('T')[0];
            
          }else{
            response.push({
              requestedAt: element.requestedAt.split('T')[0],
              request: {
                error ,
                successful: cont - error 
              }
            })
            cont = 0;
            error = 0;
            aux_date = element.requestedAt.split('T')[0];
            if(element.error){
              error++;
            }
            cont++;
            if(index === data.length-1){
              response.push({
                requestedAt: element.requestedAt.split('T')[0],
                request: {
                  error,
                  successful: cont - error 
                }
              })
            }
          }
        });
        this.dato = response
        console.log(response);
      }).catch(err => {
        console.log(err);
      })
      this.fillData()
    },
  },
}
</script>

<style>
  .small {
    width: 40vw;
  }
</style>