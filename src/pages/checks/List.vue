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
                hide-bottom
                :pagination="{ rowsPerPage: 10 }"
            >
                <q-td slot="body-cell-actions" slot-scope="props" :props="props">
                    <q-btn-group>
                        <q-btn
                            icon="info"
                            :disable="props.row.status === 'NOTDONE'"
                            color="standard"
                            text-color="secondary"
                            @click="showPdf(props.row)"
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
                <div slot="top-left">
                    <q-btn label="adicionar nova checagem" icon="add" color="green-13" :to="{ name: 'checks_add' }" />
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
import moment from 'moment'
import { createNamespacedHelpers } from 'vuex'
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const { mapActions, mapGetters } = createNamespacedHelpers('check')

export default {
    data () {
        return {
            page: 1,
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
                    name: 'responsible',
                    required: true,
                    label: 'Responsável',
                    align: 'left',
                    field: row => row.firefighter.name,
                    format: val => `${val}`,
                    sortable: true
                },
                {
                    name: 'vehicle',
                    required: true,
                    label: 'Veículo',
                    align: 'left',
                    field: row => row.vehicle.name,
                    format: val => `${val}`,
                    sortable: true
                },
                {
                    name: 'status',
                    required: true,
                    label: 'Status',
                    align: 'left',
                    field: row => {
                      if (row.status === 'NOTDONE') {
                        return 'Aguardando checagem'
                      }
                      return 'Checagem feita'
                    },
                    format: val => `${val}`,
                    sortable: true
                },
                {
                    name: 'actions',
                    required: true,
                    label: 'Ações',
                    align: 'center',
                    field: row => row.name,
                    format: val => `${val}`,
                    sortable: true
                },
            ],
        }
    },

    async created() {
      await this.getChecks({ page: this.page })
    },

    methods: {
      ...mapActions(['getChecks', 'removeCheck']),

      remove(id) {
        this.$q.dialog({
          title: 'Remover Checagem',
          message: 'Você realmente gostaria de excluir essa checagem ?',
          cancel: true
        }).onOk(async () => {
          await this.removeCheck(id)
          .then(async () => {
            await this.getChecks({ page: this.page })
            this.$q.notify({
              message: 'Checagem excluída com sucesso!',
              position: 'top',
              color: 'green-13'
            })
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

      showPdf (check) {
        const formatedCheckDataForPdf = this.generatePdfContent(check.itemsEquips)

        const docDefinition = {
          info: {
            title: 'Checagem ' + moment(check.date).format('DD/MM/YYYY'),
            subject: 'Checagem'
          },
          header: function(currentPage, pageCount, pageSize) {
            return [
              { text: 'RELATÓRIO DE CHECAGEM', alignment: 'center', margin: 15, bold: true, fontSize: 15 },
            ]
          },
          content: [
            {
              columns: [
                { text: 'Responsável: ' + check.firefighter.name, bold: true, margin: 15, alignment: 'left' },
                { text: 'Veículo: ' + check.vehicle.name, bold: true, margin: 15 },
                { text: 'Data: ' + moment(check.date).format('DD/MM/YYYY'), bold: true, margin: 15 }
              ]
            },
            {
              layout: 'lightHorizontalLines',
              table: {
                headerRows: 1,
                widths: [ '*', '*', '*' ],

                body: [
                  [
                    { text: 'Nome', bold: true },
                    { text: 'Quantidade', bold: true },
                    { text: 'Status', bold: true },
                  ],
                  ...formatedCheckDataForPdf
                ]
              }
            }
          ]
        }
        pdfMake.createPdf(docDefinition).open();

      },

      generatePdfContent (checkItems) {
        let formatedItemsEquips = []

        for (const itemEquip of checkItems) {
          formatedItemsEquips.push([itemEquip.item.name, itemEquip.quantity, itemEquip.status ? 'Ok' : 'Pendente'])
        }

        return formatedItemsEquips
      }
    },

    computed: {
      ...mapGetters(['checks', 'totalOfPages'])
    },

    watch: {
      page() {
        this.getChecks({ page: this.page })
      }
    }
}
</script>
