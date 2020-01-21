import API from '../api'

export default {
  getFirefighters ({ commit }) {
    API.get('/firefighters').then(firefighters => {
      commit('setFirefighters', firefighters)
    })
  }
}
