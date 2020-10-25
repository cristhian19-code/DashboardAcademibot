<template>
  <v-layout style="height:100%" justify-center align-center>
    <v-flex xs10 md6 lg4 xl3>
      <v-card  elevation="14" class="my-4 rounded-lg">
        <v-card-text>
          <p class="text-center display-3">Upload</p>
        </v-card-text>

        <v-card-text v-if="file" style="height: 40%;" class="text-center">
          <v-img v-if="validate" class="rounded-lg" style="height:auto" :src="urlTemporal" ></v-img>
          <iframe v-else :src="urlTemporal" scrolling="no" style="height: 50vh" frameborder="0"></iframe>
        </v-card-text>
        
        <v-card-text>
          <input hidden type="file" ref="file" name="file" @change="searchImage($event)" id="file">
          <v-btn block color="info" @click="$refs.file.click()" dark><v-icon class="mr-2">mdi-file-search-outline</v-icon>Search</v-btn>
        </v-card-text>
        
        <v-card-text>
          <v-btn block color="success" dark><v-icon class="mr-2">mdi-file-upload-outline</v-icon>File Upload</v-btn>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "Upload",
  data() {
    return {
      file: null,
      urlTemporal: '',
      type: '',
      name: '',
      validate: false
    }
  },
  methods: {
    searchImage(e){
      this.file = e.target.files[0];
      this.type = this.file.type
        
      if(this.type === "image/jpeg" || this.type === "image/png"){ 
        this.validate = true;
      }else if(this.type === "application/pdf"){
        this.validate = false;
      }else{
        this.file = null;
        return
      }
      
      //obteniendo el nombre del documento
      this.name = this.file.name;

      //sabiendo si se selecciono un documento
      if(this.file){
        const reader = new FileReader();
        reader.readAsDataURL(this.file);
        reader.onload = (e) => {
          this.urlTemporal = e.target.result;
        }
      }
    }
  },
};
</script>
