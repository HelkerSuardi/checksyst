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
                <q-td slot="body-cell-actions">
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
                        />
                        <q-btn
                            icon="delete_forever"
                            text-color="red"
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
                    <q-btn label="adicionar nova checagem" icon="add" color="green-13" :to="{ name: 'checks_add' }" />
                </div>
            </q-table>
        </q-page>
    </div>
</template>
<script>
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
                    format: val => `${val}`,
                    sortable: true
                },
                {
                    name: 'hour',
                    required: true,
                    label: 'Hora',
                    align: 'left',
                    field: row => row.hour,
                    format: val => `${val}`,
                    sortable: true
                },
                {
                    name: 'responsible',
                    required: true,
                    label: 'Responsável',
                    align: 'left',
                    field: row => row.responsible,
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
      ...mapActions(['getChecks'])
    },

    computed: {
      ...mapGetters(['checks'])
    }
}
</script>
