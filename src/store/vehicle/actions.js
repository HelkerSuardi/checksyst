import API from '../api'

export default {
  async getVehicles ({ commit }, params) {
    await API.get('/vehicles', { params } ).then(vehicles => {
      commit('setVehicles', vehicles.items)
      commit('setTotalOfPages', vehicles.lastPage)
    })
  },

  async getVehicle({ commit }, vehicleId) {
    await API.get(`/vehicles/${vehicleId}`).then(vehicle => {
      commit('setVehicle', vehicle)
    })
  },

  async removeVehicle ({ commit }, vehicleId) {
    await API.delete(`/vehicles/${vehicleId}`)
  },

  async createNewVehicle ({ commit }, newVehicle ){
    if (newVehicle.id) {
      try {
        await API.put(`/vehicles/${newVehicle.id.toString()}`, newVehicle)
        return
      } catch (e) {
        console.log(e)
        return
      }
    }

    try {
      await API.post('/vehicles', newVehicle)
    } catch (e) {
      console.log(e)
    }
  }
}
