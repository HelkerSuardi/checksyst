import API from '../api'

export default {
  getItemEquips({ commit }) {
    API.get('/item-equips').then(itemEquips => {
      commit('setItemEquips', itemEquips.items)
    })
  },

  getItemEquip ({ commit }, itemEquipId) {
    API.get(`/item-equips/${itemEquipId}`).then(itemEquip => {
      commit('setItemEquip', itemEquip)
    })
  },

  removeItemEquip ({ commit }, itemEquipId) {
    API.delete(`/item-equips/${itemEquipId}`)
  },

  async createNewItem ({ commit }, newItem ){
    if (newItem.id) {
      try {
        API.put(`/item-equips/${newItem.id}`, newItem)
        return
      } catch (e) {
        console.log(e)
        return
      }
    }

    try {
      await API.post('/item-equips', newItem)
    } catch (e) {
      console.log(e)
    }
  }
}
