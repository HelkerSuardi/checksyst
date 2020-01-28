<template>
  <item-form :value="firefighter"></item-form>
</template>
<script>
import ItemForm from './Form'

export default {
  data () {
    return {
      firefighter: {
        name: '',
        email: '',
        password: '',
        rg: '',
        role: ''
      }
    }
  },

  components: {
    ItemForm
  }
}
</script>
