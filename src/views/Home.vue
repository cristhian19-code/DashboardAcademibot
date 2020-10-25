<template>
  <v-container grid-list-xs>
    <v-layout row class="mt-5" align-center >
      <v-flex xs6>
        <RangePicker/>
      </v-flex>
      <v-flex xs6>
        <v-combobox
          v-model="select"
          color="secondary"
          :items="items"
          label="Seleccionar"
          @change="filtrarXMes(select)"
        ></v-combobox>
      </v-flex>
    </v-layout>
    <v-layout justify-center row wrap>
      <BarChart/>
    </v-layout>
    <Loader :activated="activated"/>
  </v-container>
</template>

<script>
// @ is an alias to /src
import BarChart from '@/components/BarChart.vue'
import RangePicker from '@/components/RangePicker.vue'
import { mapActions, mapState } from 'vuex'
import Loader from '@/components/Loader'

export default {
  name: 'Home',
  components: {
    BarChart,
    RangePicker,
    Loader
  },
  data() {
    return {
      items: ['Todos','Hace 3 Meses','Hace 6 Meses'],
      select: ''
    }
  },
  methods: {
    ...mapActions(['filtrarXMes'])
  },
  computed: {
    ...mapState(['activated'])
  },
}
</script>
