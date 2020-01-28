import API from '../api'

export default {
  getVehicles ({ commit }) {
    API.get('/vehicles').then(vehicles => {
      commit('setVehicles', vehicles.items)
    })
  },

  removeVehicle ({ commit }, vehicleId) {
    API.delete(`/vehicles/${vehicleId}`)
  },

  async createNewVehicle ({ commit }, newVehicle ){
    try {
      await API.post('/vehicles', newVehicle)
    } catch (e) {
      console.log(e)
    }
  }
}
