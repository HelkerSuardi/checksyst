<template>
  <item-form :value="vehicle"></item-form>
</template>
<script>
import ItemForm from './Form'

export default {
  data () {
    return {
      vehicle: {
        name: '',
        plaque: '',
      }
    }
  },

  components: {
    ItemForm
  }
}
</script>
