<template>
    <div>
        <q-page :padding="true">
            <q-item-label style="font-size: 2rem" class="q-ml-md q-mb-md">
                Item / Equipamento
            </q-item-label>
            <form
                method="post"
                class="q-ml-md"
                @submit.prevent="save"
            >
                <div class="row q-my-form">
                    <div class="col-5 q-mb-md q-mr-md">
                        <q-input
                            label="Nome"
                            outlined
                            v-model="item.name"
                            required
                        />
                    </div>
                    <div class="col-5 q-mb-md">
                        <q-select
                            filled
                            v-model="item.type"
                            use-input
                            map-options
                            input-debounce="0"
                            emit-value
                            label="Tipo"
                            :options="typeOptions"
                        />
                    </div>
                </div>
                <div class="row q-my-form">
                    <div class="col-5 q-mb-md q-mr-md">
                        <q-input
                            label="Descrição"
                            outlined
                            v-model="item.description"
                            required
                        />
                    </div>
                    <div class="col-5 q-mb-md">
                        <q-input
                            label="Unidade de medida"
                            outlined
                            v-model="item.measure"
                            required
                        />
                    </div>
                </div>
                <div class="row">
                    <div class="col-10" style="margin-left: 1rem">
                        <q-btn
                            label="Salvar"
                            type="submit"
                            style="width: 9rem"
                            icon="save"
                            color="green-13"
                            class="float-right"
                        />
                    </div>
                </div>
            </form>
        </q-page>
    </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('itemEquip')

export default {
    props: {
      value: {
        type: Object,
        required: true
      }
    },

    data () {
        return {
            typeOptions: [
                {
                  label: 'Equipamento',
                  value: 'equipment'
                },
                {
                  label: 'Veículo',
                  value: 'vehicle'
                }
            ]
        }
    },

    methods: {
      ...mapActions(['createNewItem']),

      save() {
        this.createNewItem(this.item)
        .then(() => {
          this.$q.notify({
            message: this.item.id ? 'Item editado com sucesso!' : 'Item criado com sucesso!',
            color: 'green-13',
            position: 'top'
          })
          this.$router.push({name: 'items'})
        })
        .catch(e => {
          this.$q.notify({
            message: 'Houve uma falha, tente novamente mais tarde!',
            color: 'red',
            position: 'top'
          })
        })
      }
    },

    computed: {
      item () {
        return this.value
      }
    }
}
</script>
