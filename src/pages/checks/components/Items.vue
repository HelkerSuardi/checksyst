<template>
    <div>
        <q-page :padding="true">
            <q-table
                :data="selectedItemsEquips"
                :columns="columns"
                row-key="id"
                class="q-mb-md"
                title="Itens Selecionados"
            >
                <q-tr slot="body" slot-scope="props" :props="props">
                  <q-td key="name" :props="props">
                    {{ props.row.item.name ? props.row.item.name : props.row.label }}
                  </q-td>

                  <q-td key="quantity" :props="props">
                    {{ props.row.quantity }}
                  </q-td>

                  <q-td key="unity" :props="props">
                    {{ props.row.item.measure ? props.row.item.measure : props.row.measure }}
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
                label="Salvar"
                :disable="disableSaveButton()"
                style="width: 9rem"
                icon="save"
                color="green-13"
                class="float-right"
                @click="save"
            />

        </q-page>
    </div>
</template>
<script>
export default {
    props: {
      selectedItemsEquips: Array,
      check: Object
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
      disableSaveButton() {
        if (!this.check.date || !this.check.firefighter || !this.check.vehicle || this.selectedItemsEquips.length < 1) {
          return true
        }
        return false
      },
      removeItemEquip(index) {
        this.$emit('removeItemEquip', index)
      },
      save() {
        this.$emit('save')
      }
    }
}
</script>
