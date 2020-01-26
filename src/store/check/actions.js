import API from '../api'

export default {
  getChecks ({ commit }) {
    API.get('/checks').then(checks => {
      commit('setChecks', checks.items)
    })
  }
}