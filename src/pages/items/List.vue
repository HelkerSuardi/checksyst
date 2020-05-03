<template>
    <div>
        <q-page :padding="true">
            <q-item-label style="font-size: 2rem" class="q-ml-md q-mb-md">
                Itens/Equipamentos
            </q-item-label>
            <q-table
                :data="itemEquips"
                :columns="columns"
                row-key="name"
            >
                <q-td slot="body-cell-actions" slot-scope="props" :props="props">
                    <q-btn-group>
                        <q-btn
                            icon="edit"
                            color="standard"
                            text-color="primary"
                            :to="{ name: 'items_update', params: { id: props.row.id } }"
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
                    <q-btn label="Add novo item/equipamento" icon="add" color="green-13" :to="{ name: 'items_add' }" />
                </div>
            </q-table>
        </q-page>
    </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapGetters } = createNamespacedHelpers('itemEquip')

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
                    name: 'type',
                    required: true,
                    label: 'Tipo',
                    align: 'left',
                    field: row => row.type,
                    format: val => {
                      if (val === 'equipment'){
                        return 'Equipamento'
                      }
                      return 'Veículo'
                    },
                    sortable: true
                },
                {
                    name: 'measure',
                    required: true,
                    label: 'Unidade de medida',
                    align: 'left',
                    field: row => row.measure,
                    sortable: true
                },
                {
                    name: 'description',
                    required: true,
                    label: 'Descrição',
                    align: 'left',
                    field: row => row.description,
                    sortable: true
                },
                {
                    name: 'actions',
                    required: true,
                    label: 'Ações',
                    align: 'left',
                    field: row => row._id,
                    format: val => `${val}`,
                    sortable: true
                },
            ],
        }
    },

    async created() {
      this.getItemEquips()
    },

    methods: {
      ...mapActions(['getItemEquips', 'removeItemEquip']),

      remove(id) {
        this.$q.dialog({
          title: 'Remover Item/Equip',
          message: 'Você realmente gostaria de excluir esse Item/Equip ?',
          cancel: true
        }).onOk(() => {
          this.removeItemEquip(id)
          .then(() => {
            this.$q.notify({
              message: 'Item/Equip excluído com sucesso!',
              position: 'top',
              color: 'green-13'
            })
            this.getItemEquips()
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
      ...mapGetters(['itemEquips'])
    }
}
</script>
