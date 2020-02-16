<template>
    <div>
        <q-page :padding="true">
            <q-item-label style="font-size: 2rem" class="q-ml-md q-mb-md">
                Checagens
            </q-item-label>
            <q-table
                :data="checks"
                :columns="columns"
                row-key="name"
            >
                <q-td slot="body-cell-actions" slot-scope="props" :props="props">
                    <q-btn-group>
                        <q-btn
                            icon="info"
                            color="standard"
                            text-color="secondary"
                        />
                        <q-btn
                            icon="edit"
                            color="standard"
                            text-color="primary"
                            :to="{ name: 'checks_update', params: { id: props.row.id } }"
                        />
                        <q-btn
                            icon="delete_forever"
                            text-color="red"
                            @click="remove(props.row.id)"
                        />
                    </q-btn-group>
                </q-td>
                <template slot= "top-right">
                    <q-input placeholder="Procurar">
                        <template v-slot:append>
                            <q-icon name="search" />
                        </template>
                    </q-input>
                </template>
                <div slot="top-left">
                    <q-btn label="adicionar nova checagem" icon="add" color="green-13" :to="{ name: 'checks_add' }" />
                </div>
            </q-table>
        </q-page>
    </div>
</template>
<script>
import moment from 'moment'
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapGetters } = createNamespacedHelpers('check')

export default {
    data () {
        return {
             columns: [
                {
                    name: 'date',
                    required: true,
                    label: 'Data',
                    align: 'left',
                    field: row => row.date,
                    format: val => {
                      return moment(val).format('DD/MM/YYYY')
                    },
                    sortable: true
                },
                {
                    name: 'hour',
                    required: true,
                    label: 'Hora',
                    align: 'left',
                    field: row => row.date,
                    format: val => {
                      const date = moment(val)
                      return date.format('HH:mm')
                    },
                    sortable: true
                },
                {
                    name: 'responsible',
                    required: true,
                    label: 'Responsável',
                    align: 'left',
                    field: row => row.firefighter.name,
                    format: val => `${val}`,
                    sortable: true
                },
                {
                    name: 'actions',
                    required: true,
                    label: 'Ações',
                    align: 'left',
                    field: row => row.name,
                    format: val => `${val}`,
                    sortable: true
                },
            ],
        }
    },

    async created() {
      this.getChecks()
    },

    methods: {
      ...mapActions(['getChecks', 'removeCheck']),

      remove(id) {
        this.$q.dialog({
          title: 'Remover Checagem',
          message: 'Você realmente gostaria de excluir essa checagem ?',
          cancel: true
        }).onOk(() => {
          this.removeCheck(id)
          .then(() => {
            this.$q.notify({
              message: 'Checagem excluída com sucesso!',
              position: 'top',
              color: 'green-13'
            })
            this.getChecks()
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
      ...mapGetters(['checks'])
    }
}
</script>
