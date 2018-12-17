import Vue from 'vue'
import Vuex from 'vuex'
import firebase from '~/plugins/firebase'
import { firebaseMutations, firebaseAction } from 'vuexfire'
const db = firebase.firestore()
db.settings({ timestampsInSnapshots: true })

const usersRef = db.collection('users')
const postsRef = db.collection('posts')
const provider = new firebase.auth.GoogleAuthProvider()

Vue.use(Vuex)

const createStore = () => {
  return new Vuex.Store({
    state: {
      user: null,
      isLoaded: false,
      friends: [],
      toPosts: [],
      fromPosts: [],
      userInfo: null
    },
    getters: {
      user: state => state.user,
      toPosts: state => state.toPosts,
      fromPosts: state => state.fromPosts,
      isLoaded: state => state.isLoaded,
      isAuthenticated: state => !!state.user,
      friends: state => state.friends,
      friendsName: state => {
        return state.friends.map(friend => {
          return friend.name
        })
      },
      userInfo: state => state.userInfo
    },
    mutations: {
      setCredential(state, { user }) {
        state.user = user
      },
      clearCredential(state, user) {
        state.user = user
      },
      setIsLoaded(state, next) {
        state.isLoaded = !!next
      },
      setFriends(state, friend) {
        state.friends.push(friend)
      },
      ...firebaseMutations
    },
    actions: {
      async SET_CREDENTIAL({ commit }, { user }) {
        if (!user) return
        await usersRef.doc(user.uid).set({
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          icon: user.photoURL
        })
        commit('setCredential', { user })
      },
      async SET_FRIENDS({ commit }, { user }) {
        if (!user) return
        const querySnapshot = await usersRef
          .doc(user.uid)
          .collection('friends')
          .get()
        // ここをasync await で描きたい
        querySnapshot.forEach(function(doc) {
          doc
            .data()
            .user_id.get()
            .then(info => {
              const friendInfo = Object.assign({ uid: info.id }, info.data())
              commit('setFriends', friendInfo)
            })
        })
      },
      async ADD_POST({ commit }, { from, to, description, deadline }) {
        console.log(from ,to)
        await postsRef.add({
          from: db.collection('users').doc(from),
          to: db.collection('users').doc(to),
          description,
          deadline,
          createTime: firebase.firestore.FieldValue.serverTimestamp()
        })
      },
      async DELETE_POST({ commit }, { postId }) {
        await postsRef.doc(postId).delete()
      },
      async ADD_FRIEND({ commit }, { user, frinedId }) {
        if (!user) return
        await usersRef
          .doc(user.uid)
          .collection('friends')
          .doc(frinedId)
          .set({
            user_id: usersRef.doc(frinedId)
          })
        await usersRef
          .doc(frinedId)
          .collection('friends')
          .doc(user.uid)
          .set({
            user_id: usersRef.doc(user.uid)
          })
      },
      INIT_TO_POSTS: firebaseAction(({ bindFirebaseRef }, { user }) => {
        if (!user) return
        bindFirebaseRef(
          'toPosts',
          postsRef
            .where('to', '==', usersRef.doc(user.uid))
            .orderBy('createTime', 'asc')
        )
      }),
      INIT_FROM_POSTS: firebaseAction(({ bindFirebaseRef }, { user }) => {
        if (!user) return
        bindFirebaseRef(
          'fromPosts',
          postsRef
            .where('from', '==', usersRef.doc(user.uid))
            .orderBy('createTime', 'asc')
        )
      }),
      callAuth() {
        firebase.auth().signInWithRedirect(provider)
      },
      signOut({ commit }) {
        return new Promise(resolve => {
          firebase
            .auth()
            .signOut()
            .then(() => {
              commit('clearCredential', null)
              resolve()
            })
        })
      },
      loadComplete({ commit }) {
        commit('setIsLoaded', true)
      }
    }
  })
}

export default createStore
