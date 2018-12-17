<template>
  <v-app id="inspire">
    <app-header></app-header>
    <v-content>
      <v-container v-if="!isLoaded" fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex shrink>
            <v-progress-circular
              indeterminate
              color="amber"
            ></v-progress-circular>
          </v-flex>
        </v-layout>
      </v-container>
      <nuxt v-show="isLoaded" />
    </v-content>
    <app-footer></app-footer>
  </v-app>
</template>

<script>
import AppFooter from '@/components/Footer'
import AppHeader from '@/components/Header'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: { AppHeader, AppFooter },
  computed: {
    ...mapGetters(['isLoaded'])
  }
}
</script>
