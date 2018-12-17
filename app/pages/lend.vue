<template>
  <section>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-list two-line>
            <v-subheader> 借しているモノ </v-subheader>
            <template
              v-if="fromPosts.length !== 0"
              v-for="(fromPost, index) in fromPosts"
            >
              <v-divider
                v-if="index !== 0"
                :inset="true"
                :key="index"
              ></v-divider>

              <v-list-tile :key="fromPost.description" avatar>
                <v-list-tile-avatar>
                  <img :src="fromPost.to.icon" />
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>{{
                    fromPost.description
                  }}</v-list-tile-title>
                  <v-list-tile-sub-title class="text--primary"
                    >{{ fromPost.to.name }}に借している</v-list-tile-sub-title
                  >
                  <v-list-tile-sub-title
                    >返す期限日: {{ fromPost.deadline }}</v-list-tile-sub-title
                  >
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-btn
                    flat
                    icon
                    color="grey"
                    @click="deletePost(fromPost.id)"
                  >
                    <v-icon>delete</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
            </template>
            <template v-if="fromPosts.length === 0">
              <v-list-tile avatar>
                <v-list-tile-content>
                  <v-list-tile-title
                    >現在借しているモノはありません</v-list-tile-title
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
import { mapGetters } from 'vuex'

export default {
  components: {
    FormDialog
  },
  methods: {
    async deletePost(postId) {
      if (!confirm('投稿を削除しますか？')) {
        return
      }
      await this.$store.dispatch('DELETE_POST', { postId: postId || null })
    }
  },
  computed: {
    ...mapGetters(['fromPosts'])
  }
}
</script>

<style>
.v-btn--bottom:not(.v-btn--absolute) {
  bottom: 80px;
}
</style>
