import API from '../api'

export default {
  getVehicles ({ commit }, params) {
    API.get('/vehicles', { params } ).then(vehicles => {
      commit('setTotalOfPages', vehicles.lastPage)
      commit('setVehicles', vehicles.items)
    })
  },

  getVehicle({ commit }, vehicleId) {
    API.get(`/vehicles/${vehicleId}`).then(vehicle => {
      commit('setVehicle', vehicle)
    })
  },

  removeVehicle ({ commit }, vehicleId) {
    API.delete(`/vehicles/${vehicleId}`)
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
