<template>
  <v-app>
    <v-app-bar
      app
      color="secondary"
      dark
    >
      <v-layout align-center>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <p class="display-1" style="margin: 0">Dashboard</p>
      </v-layout>

      <v-spacer></v-spacer>

    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      dark
      temporary
      color="secondary"
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
        class="text-center"
        >
          <v-list-item  :to="{name: 'Home'}">
            <v-icon>mdi-chart-bar-stacked</v-icon>
            <v-list-item-title class="ml-1">Dashboard</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{name: 'Upload'}">
            <v-icon>mdi-file-upload-outline</v-icon>
            <v-list-item-title class="ml-1">File Upload</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>


    <v-main>
      <router-view></router-view>
    </v-main>
</v-app>
</template>

<script>


export default {
  name: 'App',
  data: () => ({
    drawer: false
  }),
  
};
</script>
