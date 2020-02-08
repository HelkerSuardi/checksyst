<template>
    <div>
        <q-page :padding="true">
            <q-item-label style="font-size: 2rem" class="q-ml-md q-mb-md">
                Veículos
            </q-item-label>
            <q-table
                title="Veículos"
                :data="vehicles"
                :columns="columns"
                row-key="name"
            >
                <q-td slot="body-cell-actions" slot-scope="props" :props="props">
                    <q-btn-group>
                        <q-btn
                            icon="edit"
                            color="standard"
                            text-color="primary"
                            :to="{ name: 'vehicles_update', params: { id: props.row.id } }"
                        />
                        <q-btn
                            icon="delete_forever"
                            text-color="red"
                            @click="remove(props.row.id)"
                        />
                    </q-btn-group>
                </q-td>
                <template slot= "top-right">
                    <q-input v-model="filter" placeholder="Procurar">
                        <template v-slot:append>
                            <q-icon name="search" />
                        </template>
                    </q-input>
                </template>
                <div slot="top-left">
                    <q-btn label="Adicionar novo veículo" icon="add" color="green-13" :to="{ name: 'vehicles_add' }" />
                </div>
            </q-table>
        </q-page>
    </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapGetters } = createNamespacedHelpers('vehicle')

export default {
    data () {
        return {
             columns: [
                {
                    name: 'name',
                    required: true,
                    label: 'Nome',
                    align: 'left',
                    field: row => row.name,
                    format: val => `${val}`,
                    sortable: true
                },
                {
                    name: 'plaque',
                    required: true,
                    label: 'Placa',
                    align: 'left',
                    field: row => row.plaque,
                    format: val => `${val}`,
                    sortable: true
                },
                {
                    name: 'actions',
                    required: true,
                    label: 'Ações',
                    align: 'left',
                    field: row => row.id,
                    format: val => `${val}`,
                    sortable: true
                },
            ],
        }
    },

    async created() {
      this.getVehicles()
    },

    methods: {
      ...mapActions(['getVehicles', 'removeVehicle']),

      remove(id) {
        this.$q.dialog({
          title: 'Remover Veículo',
          message: 'Você realmente gostaria de excluir esse veículo ?',
          cancel: true
        }).onOk(() => {
          this.removeVehicle(id)
          .then(() => {
            this.$q.notify({
              message: 'Veículo excluído com sucesso!',
              position: 'top',
              color: 'green-13'
            })
            this.getVehicles()
          })
          .catch (e => {
            this.$q.notify({
              message: 'Houve um problema, tente novamente mais tarde!',
              position: 'top',
              color: 'red'
            })
          })
        })
      },
    },

    computed: {
      ...mapGetters(['vehicles'])
    }
}
</script>
