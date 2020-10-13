<template>
  <v-layout class="mt-5" justify-center height="100">
    <BarChart/>
  </v-layout>
</template>

<script>
// @ is an alias to /src
import BarChart from '@/components/BarChart.vue'

export default {
  name: 'Home',
  components: {
    BarChart
  },
}
</script>
