<template>
  <item-form :value="vehicle"></item-form>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapGetters } = createNamespacedHelpers('vehicle')
import ItemForm from './Form'

export default {
  created() {
    this.load()
  },

  methods: {
    ...mapActions(['getVehicle']),

    load () {
      this.getVehicle(this.$route.params.id)
    }
  },

  computed: {
    ...mapGetters(['vehicle'])
  },

  components: {
    ItemForm
  }
}
</script>
