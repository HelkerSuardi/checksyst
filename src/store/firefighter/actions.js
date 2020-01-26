import API from '../api'

export default {
  async getFirefighters ({ commit }) {
    API.get('/firefighters').then(firefighters => {
      commit('setFirefighters', firefighters.items)
    })
  },

  removeFirefighter ({ commit }, firefighterId) {
    API.delete(`/firefighters/${firefighterId}`)
  }
}
