import API from '../api'

export default {
  async getChecks ({ commit }, params) {
    await API.get('/checks', { params }).then(checks => {
      commit('setChecks', checks.items)
      commit('setTotalOfPages', checks.lastPage)
    })
  },

  async getCheck ({ commit }, checkId) {
    await API.get(`/checks/${checkId}`).then(check => {
      commit('setCheck', check)
    })
  },

  async removeCheck ({ dispatch }, checkId) {
    await API.delete(`/checks/${checkId}`)
  },

  async getVehicles ({ commit }) {
    await API.get('/vehicles').then(vehicles => {
      commit('setVehicles', vehicles.items)
    })
  },

  async getItemsEquips ({ commit }) {
    await API.get('/item-equips').then(itemsEquips => {
      commit('setItemsEquips', itemsEquips.items)
    })
  },

  async getFirefighters ({ commit }) {
    await API.get('/firefighters').then(firefighters => {
      commit('setFirefighters', firefighters.items)
    })
  },

  async saveCheckAndUpdateVehicle ({ commit }, { check }) {
    if (check.id) {
      try {
        await API.put(`/checks/${check.id}`, check)
        await API.put(`/vehicles/${check.vehicle._id}`, {itemsEquips: check.itemsEquips})
        return
      } catch (e) {
        console.log(e)
        return
      }
    }

    try {
      await API.post('/checks', check)
      await API.put(`/vehicles/${check.vehicle}`, {itemsEquips: check.itemsEquips})
    } catch (e) {
      console.log(e)
    }
  }
}
