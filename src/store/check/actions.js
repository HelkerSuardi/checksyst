import API from '../api'

export default {
  getChecks ({ commit }, params) {
    API.get('/checks', { params }).then(checks => {
      commit('setTotalOfPages', checks.lastPage)
      commit('setChecks', checks.items)
    })
  },

  getCheck ({ commit }, checkId) {
    API.get(`/checks/${checkId}`).then(check => {
      commit('setCheck', check)
    })
  },

  removeCheck ({ dispatch }, checkId) {
    API.delete(`/checks/${checkId}`)
  },

  getVehicles ({ commit }) {
    API.get('/vehicles').then(vehicles => {
      commit('setVehicles', vehicles.items)
    })
  },

  getItemsEquips ({ commit }) {
    API.get('/item-equips').then(itemsEquips => {
      commit('setItemsEquips', itemsEquips.items)
    })
  },

  getFirefighters ({ commit }) {
    API.get('/firefighters').then(firefighters => {
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
