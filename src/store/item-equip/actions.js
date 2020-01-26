import API from '../api'

export default {
  getItemEquips({ commit }) {
    API.get('/item-equips').then(itemEquips => {
      commit('setItemEquips', itemEquips.items)
    })
  },

  removeItemEquip ({ commit }, itemEquipId) {
    API.delete(`/item-equips/${itemEquipId}`)
  }
}
