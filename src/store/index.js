import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import queries from '@/queries/query'
import moment from 'moment'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    datos: [],
    fecha: [],
    activated: true
  },
  mutations: {
    setDatos(state,datos){
      state.datos = datos;
    },
    setObtenerFecha(state,fecha){
      state.fecha = fecha;
    },
    changeActivated(state,activated){
      state.activated = activated;
    }
  },
  actions: {
    async Fechas({commit}) {
      commit('changeActivated',true)
      await axios.post(queries.apiURL,{
        query: queries.queries.date
      }).then(res => {
        var cont = 0;
        var error = 0;
        var response = [];
        //datos de la api
        let data = res.data.data.fileRequests;
        //obteniendo las fechas en un array
        var fechas = data.map(element => element.requestedAt.split('T')[0])

        //objeto global set que no permite datos repetidos
        const fechaSinrepetir = [...new Set(fechas)];
        //bucle para contabilizar las peticiones exitosas y fallidas
        for (let day of fechaSinrepetir) {
          for (let obj of data) {
            if(day == obj.requestedAt.split('T')[0]){
              if(obj.error){
                error++;
              }
              cont++;
            }
          }
          //guardando en el array
          response.push({
            requestedAt: day,
            request: {
              error: error,
              successful: cont - error
            }
          })

          //limpiando los contadores 
          error = 0;
          cont = 0;
        }
        
        commit('setDatos',response);
      }).catch(err => {
        console.log(err);
      })
      commit('changeActivated',false)
    },
    async filtrarXDias({commit,state,dispatch},fecha){
      //invocando el metodo Fechas para llenar el array datos antes de filtrar por intervalo de tiempo 
      await dispatch('Fechas');
      //desglosando el string en un array de 3 posiciones
      var fecha_1 = fecha[0].split('-');
      var fecha_2 = fecha[1].split('-');
      

      var fechamin = new Date(parseInt(fecha_1[0]),parseInt(fecha_1[1]),parseInt(fecha_1[2])).getTime();
      var fechamax = new Date(parseInt(fecha_2[0]),parseInt(fecha_2[1]),parseInt(fecha_2[2])).getTime();
      
      //variable auxiliar para cambiar valor      
      var aux;
      
      if(fechamax<=fechamin){
        aux = fechamax;
        fechamax = fechamin;
        fechamin = aux;
      }

      var fecha1= moment(fechamin);
      var fecha2= moment(fechamax);

      var dias = fecha2.diff(fecha1,'days')

      //validando si el numero de dias es menor a 30 dias
      var fechasFiltradas = [] 
      await state.datos.forEach(element => {
        var fecha = element.requestedAt.split('-')
        var fechaTrans = new Date(parseInt(fecha[0]),parseInt(fecha[1]),parseInt(fecha[2])).getTime();
        if(fechamax>=fechaTrans && fechaTrans>=fechamin){
          fechasFiltradas.push(element)
        }
      });

      
      console.log(fechasFiltradas);
      await commit('setObtenerFecha',fecha);
      if(dias<30){
        await commit('setDatos',fechasFiltradas);
      }else{
        var fechas = fechasFiltradas.map(element => element.requestedAt.split('T')[0].split('-')[1]);
        
        await dispatch('filtroMeses',{datos: fechasFiltradas,fechas})
      }
    },
    async filtrarXMes({commit,state,dispatch},m){
      await dispatch('Fechas')
      console.log(state.datos);
      var fechas = state.datos.map(element => element.requestedAt.split('T')[0].split('-')[1]);
      console.log(fechas);
      dispatch('filtroMeses',{datos: state.datos,fechas});
      
    },
    async filtroMeses({commit,state},{fechas,datos}){
      var successful = 0;
      var error = 0;
      var filtro = [];

      //array sin datos repetidos
      fechas = [...new Set(fechas)];
      
      for (let mes of fechas) {
        for (let dato of datos) {
          if(mes == dato.requestedAt.split('T')[0].split('-')[1]){
            successful += dato.request.successful;
            error += dato.request.error;
          }
        }
        filtro.push({
          requestedAt: mes,
          request: {
            successful,
            error
          }
        })
        successful = 0;
        error = 0;
      }
      commit('setDatos',filtro);
    }
  },
  getters:{}
})
