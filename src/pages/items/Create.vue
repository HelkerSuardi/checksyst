<template>
  <item-form :value="item"></item-form>
</template>
<script>
import ItemForm from './Form'

export default {
  data () {
    return {
      item: {
        name: '',
        description: '',
        measure: '',
        type: ''
      }
    }
  },

  components: {
    ItemForm
  }
}
</script>
