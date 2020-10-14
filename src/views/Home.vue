<template>
  <v-layout column class="mt-5" align-center >
    <RangePicker/>
    <BarChart/>
  </v-layout>
</template>

<script>
// @ is an alias to /src
import BarChart from '@/components/BarChart.vue'
import RangePicker from '@/components/RangePicker.vue'

export default {
  name: 'Home',
  components: {
    BarChart,
    RangePicker
  },
}
</script>
