<template>
  <q-item v-if="target === '_self'" v-ripple :to="link" color="primary">
    <q-icon left :name="`svguse:icons/allIcons.svg#${icon}`"/>
    <q-toolbar-title>
      {{ title }}
    </q-toolbar-title>
  </q-item>

  <q-item v-if="target === '_blank'" v-ripple clickable color="primary" @click="go">
    <q-icon left :name="`svguse:icons/allIcons.svg#${icon}`"/>
    <q-toolbar-title>
      {{ title }}
    </q-toolbar-title>
  </q-item>

</template>

<script>
import {defineComponent} from 'vue';


export default defineComponent({
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true,
    },

    target: {
      type: String,
      default: '_self'
    },

    name: {
      type: String,
      required: true,
    },

    link: {
      type: String,
      default: '#',
    },

    icon: {
      type: String,
      default: '',
    },
  },
  methods: {
    go() {
      window.open(this.link, '_blank')
    }
  }
});
</script>
