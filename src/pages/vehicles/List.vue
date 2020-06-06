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
                hide-bottom
                :pagination="{ rowsPerPage: 10 }"
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
                    <q-input v-model="vehiclesNameFilter" placeholder="Procurar" debounce="500">
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
        <div class="row justify-center" v-if="totalOfPages > 1">
            <q-pagination
              v-model="page"
              color="grey-8"
              :max="totalOfPages"
              size="sm"
            />
        </div>
    </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapGetters } = createNamespacedHelpers('vehicle')

export default {
    data () {
        return {
          page: 1,
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
          vehiclesNameFilter: ''
        }
    },

    async created() {
      this.getVehicles({ name: this.vehiclesNameFilter, page: this.page })
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
      ...mapGetters(['vehicles', 'totalOfPages'])
    },

    watch: {
      vehiclesNameFilter() {
        this.getVehicles({ name: this.vehiclesNameFilter, page: this.page })
      },

      page() {
        this.getVehicles({ name: this.vehiclesNameFilter, page: this.page })
      }
    }
}
</script>
