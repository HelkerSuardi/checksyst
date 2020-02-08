<template>
    <div>
        <q-page :padding="true">
            <q-item-label style="font-size: 1rem" class="q-ml-md q-mb-md">
                Itens selecionados
            </q-item-label>
            <q-table
                :data="selectedItemsEquips"
                :columns="columns"
                row-key="id"
                class="q-mb-md"
            >
                <q-tr slot="body" slot-scope="props" :props="props">
                  <q-td key="name" :props="props">
                    {{ props.row.name }}
                  </q-td>

                  <q-td key="quantity" :props="props">
                    {{ props.row.quantity }}
                  </q-td>

                  <q-td key="unity" :props="props">
                    {{ props.row.measure }}
                  </q-td>

                  <q-td key="actions" :props="props">
                      <div>
                        <q-btn
                            icon="delete_forever"
                            text-color="red"
                            @click="removeItemEquip(selectedItemsEquips.indexOf(props.row))"
                        />
                      </div>
                  </q-td>
                </q-tr>
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
                :disable="selectedItemsEquips.length < 1"
                style="width: 9rem"
                icon="save"
                color="green-13"
                class="float-right q-mr-md"
                @click="save"
            />

        </q-page>
    </div>
</template>
<script>
export default {
    props: {
      selectedItemsEquips: Array,
    },

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
                    field: row => row.measure,
                    format: val => `${val}`,
                    sortable: true
                },
                {
                    name: 'actions',
                    required: false,
                    label: 'Ações',
                    align: 'left',
                },
            ],
        }
    },

    methods: {
      removeItemEquip(index) {
        this.$emit('removeItemEquip', index)
      },
      save() {
        this.$emit('save')
      }
    }
}
</script>
