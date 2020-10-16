<template>
  <v-app>
    <v-app-bar
      app
      color="secondary"
      dark
    >
      <v-layout align-center>
        <p class="display-1" style="margin: 0">Dashboard</p>
      </v-layout>

      <v-spacer></v-spacer>

    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
    <Loader :activated="activated"/>
</v-app>
</template>

<script>
import { mapState } from 'vuex';
import Loader from '@/components/Loader'

export default {
  name: 'App',
  components:{
    Loader
  },
  data: () => ({
  }),
  computed: {
    ...mapState(['activated'])
  },
};
</script>
