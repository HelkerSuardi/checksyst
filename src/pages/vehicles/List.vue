<template>
    <div>        
        <q-page :padding="true">
            <q-item-label style="font-size: 2rem" class="q-ml-md q-mb-md"> 
                Veículos 
            </q-item-label>                       
            <q-table
                title="Veículos"
                :data="data"
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
                    field: row => row.name,
                    format: val => `${val}`,
                    sortable: true
                },
            ],
            data: [
                {
                    name: 'Ambulância',
                    plaque: 'ADM-1234',                 
                }
            ]
        }
    }
}
</script>