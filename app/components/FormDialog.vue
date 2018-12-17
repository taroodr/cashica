<template>
  <v-dialog v-model="isModalActive">
    <v-btn
      dark
      fab
      right
      bottom
      fixed
      color="amber"
      @click="isModalActive = true"
      slot="activator"
    >
      <v-icon>add</v-icon>
    </v-btn>
    <v-card>
      <v-card-text>
        <v-form>
          <v-select
            v-model="friend"
            prepend-icon="person"
            :items="friendsName"
            label="貸す友達を選ぶ"
          ></v-select>
          <v-text-field
            v-model="description"
            prepend-icon="person"
            name="login"
            label="貸したものの詳細を入力"
            type="text"
          ></v-text-field>
          <v-menu
            ref="menu"
            :close-on-content-click="false"
            v-model="menu"
            :nudge-right="40"
            :return-value.sync="date"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <v-text-field
              slot="activator"
              v-model="date"
              label="返す期限日を入力"
              prepend-icon="event"
              readonly
            ></v-text-field>
            <v-date-picker v-model="date" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
              <v-btn flat color="primary" @click="$refs.menu.save(date)"
                >OK</v-btn
              >
            </v-date-picker>
          </v-menu>
          <v-btn color="primary" @click="submit">登録</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      isModalActive: false,
      date: new Date().toISOString().substr(0, 10),
      menu: '',
      friend: '',
      description: ''
    }
  },
  methods: {
    async submit() {
      let frinedId
      this.friends.forEach(friend => {
        if (friend.name === this.friend) {
          frinedId = friend.uid
        }
      })
      await this.$store.dispatch('ADD_POST', {
        from: this.user.uid,
        to: frinedId,
        description: this.description,
        deadline: this.date
      })
      this.hideModal()
    },
    hideModal() {
      this.isModalActive = false
      this.date = ''
      this.friend = ''
      this.description = ''
    }
  },
  computed: {
    ...mapGetters(['user', 'isLoaded', 'friends', 'friendsName'])
  }
}
</script>
