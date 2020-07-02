import API from '../api'

export default {
  async getItemEquips({ commit }, params) {
    await API.get('/item-equips', { params }).then(itemEquips => {
      commit('setItemEquips', itemEquips.items)
      commit('setTotalOfPages', itemEquips.lastPage)
    })
  },

  async getItemEquip ({ commit }, itemEquipId) {
    await API.get(`/item-equips/${itemEquipId}`).then(itemEquip => {
      commit('setItemEquip', itemEquip)
    })
  },

  async removeItemEquip ({ commit }, itemEquipId) {
    await API.delete(`/item-equips/${itemEquipId}`)
  },

  async createNewItem ({ commit }, newItem ){
    if (newItem.id) {
      try {
        await API.put(`/item-equips/${newItem.id}`, newItem)
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
