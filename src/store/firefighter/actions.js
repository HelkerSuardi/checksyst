import API from '../api'

export default {
  async getFirefighters ({ commit }) {
    API.get('/firefighters').then(firefighters => {
      commit('setFirefighters', firefighters.items)
    })
  },

  getFirefighter ({ commit }, firefighterId) {
    API.get(`/firefighters/${firefighterId}`).then(firefighter => {
      commit('setFirefighter', firefighter)
    })
  },

  removeFirefighter ({ commit }, firefighterId) {
    API.delete(`/firefighters/${firefighterId}`)
  },

  async createNewFirefighter ({ commit }, newFirefighter ){
    if (newFirefighter.id) {
      try {
        API.put(`/firefighters/${newFirefighter.id.toString()}`, newFirefighter)
        return
      } catch (e) {
        console.log(e)
        return
      }
    }

    try {
      await API.post('/firefighters', newFirefighter)
    } catch (e) {
      console.log(e)
    }
  }
}
