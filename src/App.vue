<script setup>
import { RouterLink, RouterView } from 'vue-router'
import './assets/css/tailwind.css'

</script>

<template>
   <v-app id="inspire">

    <v-app-bar absolute color="pink-darken-1">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <router-link :to="{
        path: '/'
      }">
      <v-toolbar-title>Forms Manager</v-toolbar-title>
      </router-link>
    </v-app-bar>

    <v-main>
      
<router-view v-slot="{ Component }">
    <component :is="Component"/>
</router-view>
    </v-main>
  </v-app>
</template>

<style scoped>
</style>
