<template>
  <v-container v-if="!user" fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex shrink class="text-xs-center">
        <div class="mb-5">
          <img src="/cashica-black.png" alt="" width="200">
          <p class="mt-2">貸し借りを可視化して人間関係を円滑に</p>
        </div>
        <img
          src="/btn_google_signin_light.png"
          @click="callAuth"
          alt="sign in with google"
          width="80%"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import auth from '~/plugins/auth'
import { mapGetters, mapActions } from 'vuex'

export default {
  async mounted() {
    let user
    if (!this.user) user = await auth()
    await Promise.all([
      this.user
        ? Promise.resolve()
        : this.$store.dispatch('SET_CREDENTIAL', { user: user || null })
    ])
    if (user) {
      this.$router.push('/')
    } else {
      this.loadComplete()
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    ...mapActions(['callAuth', 'loadComplete'])
  }
}
</script>

<style></style>
