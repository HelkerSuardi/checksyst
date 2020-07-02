import API from '../api'

export default {
  async getFirefighters ({ commit }, params) {
    await API.get('/firefighters', { params }).then(firefighters => {
      commit('setFirefighters', firefighters.items)
      commit('setTotalOfPages', firefighters.lastPage)
    })
  },

  async getFirefighter ({ commit }, firefighterId) {
    await API.get(`/firefighters/${firefighterId}`).then(firefighter => {
      commit('setFirefighter', firefighter)
    })
  },

  async removeFirefighter ({ commit }, firefighterId) {
    await API.delete(`/firefighters/${firefighterId}`)
  },

  async createNewFirefighter ({ commit }, newFirefighter ){
    if (newFirefighter.id) {
      try {
        await API.put(`/firefighters/${newFirefighter.id.toString()}`, newFirefighter)
        return
      } catch (e) {
        console.log(e)
        return
      }
    }

    try {
      await API.post('/firefighters', newFirefighter)
    } catch (e) {
      console.log(e)
    }
  }
}
