<template>
  <section>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-list two-line>
            <v-subheader> 借りているモノ </v-subheader>
            <template
              v-if="toPosts.length !== 0"
              v-for="(toPost, index) in toPosts"
            >
              <v-divider
                v-if="index !== 0"
                :inset="true"
                :key="index"
              ></v-divider>

              <v-list-tile :key="toPost.description" avatar>
                <v-list-tile-avatar>
                  <img :src="toPost.from.icon" />
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>{{
                    toPost.description
                  }}</v-list-tile-title>
                  <v-list-tile-sub-title class="text--primary"
                    >{{ toPost.from.name }}から借りている</v-list-tile-sub-title
                  >
                  <v-list-tile-sub-title
                    >返す期限日: {{ toPost.deadline }}</v-list-tile-sub-title
                  >
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-btn flat icon color="grey" @click="deletePost(toPost.id)">
                    <v-icon>delete</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
            </template>
            <template v-if="toPosts.length === 0">
              <v-list-tile avatar>
                <v-list-tile-content>
                  <v-list-tile-title
                    >現在借りているモノはありません</v-list-tile-title
                  >
                </v-list-tile-content>
              </v-list-tile>
            </template>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
    <form-dialog></form-dialog>
  </section>
</template>

<script>
import FormDialog from '~/components/FormDialog.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    FormDialog
  },
  async mounted() {
    await Promise.all([
      this.friends.length
        ? Promise.resolve()
        : this.$store.dispatch('SET_FRIENDS', { user: this.user || null }),
      this.toPosts.length
        ? Promise.resolve()
        : this.$store.dispatch('INIT_TO_POSTS', { user: this.user || null }),
      this.fromPosts.length
        ? Promise.resolve()
        : this.$store.dispatch('INIT_FROM_POSTS', { user: this.user || null })
    ])
    if (!this.isLoaded) {
      this.loadComplete()
    }
  },
  methods: {
    async deletePost(postId) {
      if (!confirm('投稿を削除しますか？')) {
        return
      }
      await this.$store.dispatch('DELETE_POST', { postId: postId || null })
    },
    ...mapActions(['loadComplete'])
  },
  computed: {
    ...mapGetters([
      'user',
      'toPosts',
      'fromPosts',
      'isLoaded',
      'friends',
      'friendsName'
    ])
  }
}
</script>

<style>
.v-btn--bottom:not(.v-btn--absolute) {
  bottom: 80px;
}
</style>
