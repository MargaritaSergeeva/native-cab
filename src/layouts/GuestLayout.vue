<template>
  <q-layout class="guest-layout" view="lHh Lpr lFf">
    <div class="logo">
      <router-link to="/">
        <img alt="logo" class="logo__img" src="~assets/logo.svg" clickable/>
      </router-link>
    </div>
    <q-page-container style="flex: 1 0 auto;">
      <router-view/>
    </q-page-container>
    <MainFooter/>
  </q-layout>
</template>

<script setup lang="ts">
import MainFooter from 'components/MainFooter.vue';
</script>
