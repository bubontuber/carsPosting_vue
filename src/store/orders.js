import * as fb from 'firebase'

class Order {
  constructor (name, phone, adId, done = false, id = null) {
    this.name = name
    this.phone = phone
    this.adId = adId
    this.done = done
    this.id = id
  }
}

export default {
  state: {
    orders: []
  },
  mutations: {
    loadOrders (state, payload) {
      state.orders = payload
    }
  },
  actions: {
    async createOrder ({ commit }, { name, phone, adId, ownerId }) {
      const order = new Order(name, phone, adId)
      commit('clearError')

      try {
        await fb.database().ref(`/users/${ownerId}/orders`).push(order)
      } catch (e) {
        commit('setError', e.message)
        throw e
      }
    },
    async fetchOrders ({ commit, getters }) {
      commit('setLoading', true)
      commit('clearError')

      const resultOrders = []
      try {
        const fbVal = await fb.database().ref(`/users/${getters.user.id}/orders`).once('value')
        if (fbVal !== null) {
          const orders = fbVal.val()

          Object.keys(orders).forEach(key => {
            const o = orders[key]
            resultOrders.push(new Order(o.name, o.phone, o.adId, o.done, key))
          })

          commit('loadOrders', resultOrders)
          commit('setLoading', false)
        }
      } catch (e) {
        commit('setLoading', false)
        throw e
      }
    },
    async markDoneOrder ({ commit, getters }, payload) {
      const done2 = getters.allOrders(payload)

      try {
        await fb.database().ref(`/users/${getters.user.id}/orders`).child(payload).update({ done: done2.done })
      } catch (e) {
        commit('setError', e.message)
        throw e
      }
    }
  },
  getters: {
    doneOrders (state) {
      return state.orders.filter(o => o.done)
    },
    undoneOrders (state) {
      return state.orders.filter(o => !o.done)
    },
    orders (state, getters) {
      return getters.undoneOrders.concat(getters.doneOrders)
    },
    allOrders (state) {
      return (oId) => {
        return state.orders.find(o => o.id === oId)
      }
    }
  }
}
