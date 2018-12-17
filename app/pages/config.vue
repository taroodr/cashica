<template>
  <section class="container">
    <v-layout row wrap align-center>
      <v-flex xs12>
        <div class="text-xs-center">
          <v-avatar :size="80">
            <img class="img-circle elevation-7 mb-1" :src="user.photoURL" />
          </v-avatar>
          <div class="headline mt-2">{{ user.displayName }}</div>
          <div class="subheading text-xs-center grey--text pt-1 pb-3">
            {{ user.email }}
          </div>
        </div>
      </v-flex>
    </v-layout>
    <qr :user="user"></qr>
    <v-layout row wrap align-center>
      <v-flex xs12 class="mt-5 text-xs-center"> <sign-out></sign-out> </v-flex>
    </v-layout>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import Qr from '~/components/Qr.vue'
import SignOut from '@/components/SignOut'

export default {
  components: {
    Qr,
    SignOut
  },
  computed: {
    ...mapGetters(['user'])
  }
}
</script>
