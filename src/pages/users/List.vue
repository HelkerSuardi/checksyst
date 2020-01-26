<template>
    <div>
        <q-page :padding="true">
            <q-item-label style="font-size: 2rem" class="q-ml-md q-mb-md">
                Usuários
            </q-item-label>
            <q-table
                :data="firefighters"
                :columns="columns"
                row-key="name"
            >
                <q-td slot="body-cell-actions">
                    <q-btn-group>
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
                    <q-input placeholder="Procurar">
                        <template v-slot:append>
                            <q-icon name="search" />
                        </template>
                    </q-input>
                </template>
                <div slot="top-left">
                    <q-btn label="Adicionar novo usuário" icon="add" color="green-13" :to="{ name: 'users_add' }" />
                </div>
            </q-table>
        </q-page>
    </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapGetters } = createNamespacedHelpers('firefighter')

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
                    name: 'permission',
                    required: true,
                    label: 'Permissões',
                    align: 'left',
                    field: row => row.role,
                    format: val => `${val}`,
                    sortable: true
                },
                {
                    name: 'document',
                    required: true,
                    label: 'RG',
                    align: 'left',
                    field: row => row.rg,
                    format: val => `${val}`,
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
      await this.getFirefighters()
    },

    methods: {
      ...mapActions(['getFirefighters']),
    },

    computed: {
      ...mapGetters(['firefighters'])
    }
}
</script>
