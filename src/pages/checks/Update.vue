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

  async created() {
    await this.load()
    await this.getVehicles()
    await this.getItemsEquips()
    await this.getFirefighters()
  },

  computed: {
    ...mapGetters(['vehicles', 'itemsEquips', 'firefighters', 'check']),
  },

  methods: {
    ...mapActions(['getVehicles', 'getItemsEquips', 'getFirefighters', 'getCheck']),

    async load() {
      await this.getCheck(this.$route.params.id)
    }
  },

  components: {
    ItemForm
  }
}
</script>
