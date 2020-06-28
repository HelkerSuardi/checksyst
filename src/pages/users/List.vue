<template>
    <div>
        <q-page :padding="true">
            <q-item-label style="font-size: 2rem" class="q-ml-md q-mb-md">
                Usuários
            </q-item-label>
            <q-table
                :data="role === 'superAdm' ? firefighters : [firefighter]"
                :columns="columns"
                row-key="name"
                hide-bottom
                :pagination="{ rowsPerPage: 10 }"
            >
                <q-td slot="body-cell-actions" slot-scope="props" :props="props">
                    <q-btn-group>
                        <q-btn
                            icon="edit"
                            color="standard"
                            text-color="primary"
                            :to="{ name: 'users_update', params: { id: props.row.id } }"
                        />
                        <q-btn
                            v-if="role === 'superAdm'"
                            icon="delete_forever"
                            text-color="red"
                            @click="remove(props.row.id)"
                        />
                    </q-btn-group>
                </q-td>
                <template v-if="role === 'superAdm'" slot= "top-right">
                    <q-input placeholder="Procurar" v-model="usersNameSearch">
                        <template v-slot:append>
                            <q-icon name="search" />
                        </template>
                    </q-input>
                </template>
                <div slot="top-left">
                    <q-btn
                      v-if="role === 'superAdm'"
                      label="Adicionar novo usuário"
                      icon="add" color="green-13"
                      :to="{ name: 'users_add' }"
                    />
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
const { mapActions, mapGetters } = createNamespacedHelpers('firefighter')
import authService from '../../service/auth-service'

export default {
    data () {
        return {
          usersNameSearch: '',
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
                  name: 'email',
                  required: true,
                  label: 'E-mail',
                  align: 'left',
                  field: row => row.email,
                  format: val => `${val}`,
                  sortable: true
              },
              {
                  name: 'permission',
                  required: true,
                  label: 'Permissões',
                  align: 'left',
                  field: row => row.role,
                  format: val => {
                    if (val === 'superAdm') {
                      return 'Super Adm'
                    }
                    if (val === 'adm') {
                      return 'Adm'
                    }
                    return 'Operador'
                  },
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
          role: ''
        }
    },

    async created() {
      await this.buildDataTable()
    },

    methods: {
      ...mapActions(['getFirefighters', 'getFirefighter', 'removeFirefighter']),

      async buildDataTable() {
        this.role = authService.getRole()
        if (this.role === 'superAdm') {
          await this.getFirefighters({ name: this.usersNameSearch, page: this.page })
          return
        }

        await this.getFirefighter(authService.getId())
      },

      remove(id) {
        this.$q.dialog({
          title: 'Remover Usuário',
          message: 'Você realmente gostaria de excluir esse usuário ?',
          cancel: true
        }).onOk(async () => {
          await this.removeFirefighter(id)
          .then(async () => {
            this.$q.notify({
              message: 'Usuário excluído com sucesso!',
              position: 'top',
              color: 'green-13'
            })
            await this.getFirefighters()
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
      ...mapGetters(['firefighters', 'firefighter', 'totalOfPages'])
    },

    watch: {
      usersNameSearch() {
        this.buildDataTable()
      },

      page() {
        this.buildDataTable()
      }
    }
}
</script>
