import * as fb from 'firebase'
import router from '@/router/router'

class User {
  constructor (id) {
    this.id = id
  }
}

export default {
  state: {
    user: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    registerUser ({ commit }, { email, password }) {
      commit('clearError')
      commit('setLoading', true)

      const user = fb.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
          commit('setUser', new User(user.uid))
          commit('setLoading', false)
          router.push('/')
        })
        .catch(er => {
          commit('setLoading', false)
          commit('setError', er.message)
        })
    },
    loginUser ({ commit }, { email, password }) {
      commit('clearError')
      commit('setLoading', true)
      const user = fb.auth().signInWithEmailAndPassword(email, password)
        .then(v => {
          commit('setUser', new User(user.uid))
          commit('setLoading', false)
          router.push('/')
        })
        .catch(error => {
          commit('setLoading', false)
          commit('setError', error.message)
        })
    },
    autoLoginUser ({ commit }, payload) {
      commit('setUser', new User(payload.uid))
    },
    logOutUser ({ commit }) {
      fb.auth().signOut()
      commit('setUser', null)
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    isUserSignedIn (state) {
      return state.user !== null
    }
  }
}
