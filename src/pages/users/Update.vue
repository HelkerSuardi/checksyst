<template>
  <item-form :value="firefighter"></item-form>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapGetters } = createNamespacedHelpers('firefighter')
import ItemForm from './Form'

export default {
  created () {
    this.load()
  },

  methods: {
    ...mapActions(['getFirefighter']),

    load () {
      this.getFirefighter(this.$route.params.id)
    }
  },

  computed: {
    ...mapGetters(['firefighter'])
  },

  components: {
    ItemForm
  }
}
</script>
