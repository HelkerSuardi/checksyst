<template>
    <div>        
        <q-page :padding="true">
            <q-item-label style="font-size: 1rem" class="q-ml-md q-mb-md"> 
                Itens selecionados 
            </q-item-label>                          
            <q-table
                :data="data"
                :columns="columns"
                row-key="name"
                class="q-mb-md"
            >
                <q-td slot="body-cell-actions">
                    <q-btn-group>
                        <q-btn
                            icon="delete_forever"
                            text-color="red"
                        />
                    </q-btn-group>
                </q-td>         
            </q-table>
            <q-btn
                label="Cancelar"
                icon="block"
                style="width: 9rem"
                color="red"
                class="float-right"
            />
            <q-btn
                label="Salvar"
                style="width: 9rem"
                icon="save"
                color="green-13"
                class="float-right q-mr-md"
            />
            
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
                    name: 'quantity',
                    required: true,
                    label: 'Quantidade',
                    align: 'left',
                    field: row => row.quantity,
                    format: val => `${val}`,
                    sortable: true
                },
                {
                    name: 'unity',
                    required: true,
                    label: 'Unidade',
                    align: 'left',
                    field: row => row.unity,
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
                    name: '10/10/20',
                    quantity: '17:53',
                    unity: 'Helker',                    
                }
            ]
        }
    }
}
</script>