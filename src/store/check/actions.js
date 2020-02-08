import API from '../api'

export default {
  getChecks ({ commit }) {
    API.get('/checks').then(checks => {
      commit('setChecks', checks.items)
    })
  },

  removeCheck ({ commit }, checkId) {
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

  async saveCheckAndUpdateVehicle ({ commit }, items) {
    items.selectedItemsEquips.forEach(itemEquip => {
      items.check.itemsEquips.push({
        item: itemEquip.value,
        quantity: itemEquip.quantity
      })
    })

    const item = items.selectedItemsEquips.map(itemEquip => {
      return {
        item: itemEquip.value,
        quantity: itemEquip.quantity
      }
    })

    try {
      API.post('/checks', items.check)
      API.put(`/vehicles/${items.check.vehicle}`, {item})
    } catch (e) {
      console.log(e)
    }
  }
}
