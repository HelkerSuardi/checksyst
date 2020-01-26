import API from '../api'

export default {
  getVehicles ({ commit }) {
    API.get('/vehicles').then(vehicles => {
      commit('setVehicles', vehicles.items)
    })
  }
}
