<template>
  <v-btn outline color="amber" @click="signOut">Signout</v-btn>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  methods: {
    async signOut() {
      const signout = await this.$store.dispatch('signOut')
      this.$router.push('/signin')
    }
  }
}
</script>
