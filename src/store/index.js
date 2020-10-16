import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import queries from '@/queries/query'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    datos: [],
    fecha: [],
  },
  mutations: {
    setDatos(state,datos){
      state.datos = datos;
    },
    setObtenerFecha(state,fecha){
      state.fecha = fecha;
    }
  },
  actions: {
    async Fechas({commit}) {
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
        console.log(response);
        commit('setDatos',response);
      }).catch(err => {
        console.log(err);
      })
    },
    async obtenerFecha({commit,state,dispatch},fecha){
      //invocando el metodo Fechas para llenar el array datos antes de filtrar por intervalo de tiempo 
      await dispatch('Fechas');

      var fecha_1 = fecha[0].split('-');
      var fecha_2 = fecha[1].split('-');
      var fechamin = new Date(parseInt(fecha_1[0]),parseInt(fecha_1[1]),parseInt(fecha_1[2])).getTime();
      var fechamax = new Date(parseInt(fecha_2[0]),parseInt(fecha_2[1]),parseInt(fecha_2[2])).getTime();
      var aux = '';
      if(fechamax<fechamin){
        aux = fechamin;
        fechamax = fechamin;
        fechamin = aux;
      }

      console.log(fechamax, '   ', fechamin);
      var fechasFiltradas = [] 
      state.datos.forEach(element => {
        var fecha = element.requestedAt.split('-')
        var fechaTrans = new Date(parseInt(fecha[0]),parseInt(fecha[1]),parseInt(fecha[2])).getTime();
        if(fechamax>fechaTrans && fechaTrans>fechamin){
          fechasFiltradas.push(element)
        }
      });
      console.log(fechasFiltradas);
      commit('setObtenerFecha',fecha);
      commit('setDatos',fechasFiltradas);
    }
  },
  modules: {
  }
})
