<template>
  <v-bottom-nav v-if="user" :value="true" color="white" fixed app>
    <v-btn color="amber" flat nuxt to="/">
      <span>借りている</span>
      <v-icon>undo</v-icon>
    </v-btn>

    <v-btn color="amber" flat nuxt to="lend">
      <span>借している</span>
      <v-icon>redo</v-icon>
    </v-btn>

    <v-btn color="amber" flat nuxt to="config">
      <span>設定</span>
      <v-icon>person</v-icon>
    </v-btn>
  </v-bottom-nav>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'footer',
  computed: {
    ...mapGetters(['user'])
  }
}
</script>
