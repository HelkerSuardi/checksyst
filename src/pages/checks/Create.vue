<template>
  <item-form
    :value="this.check"
    :vehicles="this.vehicles"
    :itemsEquips="this.itemsEquips"
    :firefighters="this.firefighters"
  />
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapGetters } = createNamespacedHelpers('check')
import ItemForm from './Form'

export default {
  data () {
    return {
      check: {
        vehicle: '',
        firefighter: '',
        itemsEquips: [],
        date: ''
      }
    }
  },

  async created() {
    await this.getVehicles()
    await this.getItemsEquips()
    await this.getFirefighters()
  },

  computed: {
    ...mapGetters(['vehicles', 'itemsEquips', 'firefighters']),
  },

  methods: {
    ...mapActions(['getVehicles', 'getItemsEquips', 'getFirefighters']),
  },

  components: {
    ItemForm
  }
}
</script>
