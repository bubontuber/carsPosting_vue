import * as fb from 'firebase'

class Ad {
  constructor (title, description, promo = false, imgSrc = '', ownerId, id = null) {
    this.title = title
    this.description = description
    this.promo = promo
    this.imgSrc = imgSrc
    this.ownerId = ownerId
    this.id = id
  }
}

export default {
  state: {
    ads: []
  },
  mutations: {
    updateAd (state, { title, description, id }) {
      const ad = state.ads.find(a => {
        return a.id === id
      })

      ad.title = title
      ad.description = description
    },
    createAd (state, payload) {
      state.ads.push(payload)
    },
    loadAds (state, payload) {
      state.ads = payload
    }
  },
  actions: {
    async updateAd ({ commit }, { title, description, id }) {
      commit('clearError')
      commit('setLoading', true)
      try {
        await fb.database().ref('ads').child(id).update({
          title, description
        })
        commit('updateAd', {
          title,
          description,
          id
        })
        commit('setLoading', false)
      } catch (e) {
        commit('setError', e.message)
        commit('setLoading', false)
        throw e
      }
    },
    async fetchAds ({ commit }) {
      commit('clearError')
      commit('setLoading', true)

      const result = []

      try {
        const fbVal = await fb.database().ref('ads').once('value')
        const ads = fbVal.val()

        Object.keys(ads).forEach(key => {
          const ad = ads[key]
          result.push(new Ad(
            ad.title,
            ad.description,
            ad.promo,
            ad.imgSrc,
            ad.ownerId,
            key
          ))
        })

        commit('loadAds', result)
        commit('setLoading', false)
      } catch (e) {
        commit('setError', e.message)
        commit('setLoading', false)
        throw e
      }
    },
    async createAd ({ commit, getters }, payload) {
      commit('clearError')
      commit('setLoading', true)
      const image = payload.imgSrc

      try {
        const newAd = new Ad(
          payload.title,
          payload.description,
          payload.promo,
          '',
          getters.user.id
        )

        const ad = await fb.database().ref('ads').push(newAd)
        const imageExt = image.name.slice(image.name.indexOf('.'))

        const path = 'ads/' + ad.key + imageExt
        await fb.storage().ref(path).put(image)
        const imgSrc = await fb.storage().ref(path).getDownloadURL()
        await fb.database().ref('ads').child(ad.key).update({ imgSrc })

        commit('setLoading', false)
        commit('createAd', {
          ...newAd,
          id: ad.key,
          imgSrc: imgSrc
        })
      } catch (e) {
        commit('setError', e.message)
        commit('setLoading', false)
        throw e
      }
    }
  },
  getters: {
    ads (state) {
      return state.ads
    },
    promoAds (state) {
      return state.ads.filter(ad => {
        return ad.promo === true
      })
    },
    myAds (state, getters) {
      return state.ads.filter(a => {
        return a.ownerId === getters.user.id
      })
    },
    adById (state) {
      return (adId) => {
        return state.ads.find(ad => ad.id === adId)
      }
    }
  }
}
