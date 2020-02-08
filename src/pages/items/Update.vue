<template>
  <item-form :value="itemEquip"></item-form>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapGetters } = createNamespacedHelpers('itemEquip')
import ItemForm from './Form'

export default {
  created() {
    this.load()
  },

  methods: {
    ...mapActions(['getItemEquip']),

    load() {
      this.getItemEquip(this.$route.params.id)
    }
  },

  computed: {
    ...mapGetters(['itemEquip'])
  },

  components: {
    ItemForm
  }
}
</script>
