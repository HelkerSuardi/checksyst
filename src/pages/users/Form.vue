<template>
    <div>
        <q-page :padding="true">
            <q-item-label style="font-size: 2rem" class="q-ml-md q-mb-md">
                Usuários
            </q-item-label>
            <form
                method="post"
                class="q-ml-md"
                @submit.prevent="save"
            >
                <div class="row q-my-form">
                    <div class="col-5 q-mb-md q-mr-md">
                        <q-input
                            label="Nome"
                            outlined
                            v-model="firefighter.name"
                            required
                        />
                    </div>
                    <div class="col-5 q-mb-md">
                        <q-select
                            filled
                            map-options
                            emit-value
                            v-model="firefighter.role"
                            use-input
                            input-debounce="0"
                            label="Permissão"
                            :options="roles"
                            :readonly="role !== 'superAdm'"
                        />
                    </div>
                </div>
                <div class="row q-my-form">
                    <div class="col-5 q-mb-md q-mr-md">
                        <q-input
                            label="E-mail"
                            type="email"
                            outlined
                            v-model="firefighter.email"
                            required
                        />
                    </div>
                    <div class="col-5 q-mb-md">
                        <q-input
                            label="R.G"
                            outlined
                            v-model="firefighter.rg"
                            required
                        />
                    </div>
                </div>
                <div class="row">
                    <div class="col-5 q-mb-md">
                        <q-input
                            v-if="userId === firefighter.id || !firefighter.id"
                            label="Senha"
                            type="password"
                            outlined
                            v-model="firefighter.password"
                            required
                        />
                    </div>
                </div>
                <div class="row">
                    <div class="col-10" style="margin-left: 1rem">
                        <q-btn
                            label="Salvar"
                            type="submit"
                            style="width: 9rem"
                            icon="save"
                            color="green-13"
                            class="float-right"
                        />
                    </div>
                </div>
            </form>
        </q-page>
    </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('firefighter')
import authService from '../../service/auth-service'

export default {
    props: {
      value: {
        type: Object,
        required: true
      }
    },

    data () {
        return {
            roles: [
              {
                label: 'Super Adm',
                value: 'superAdm'
              },
              {
                label: 'Adm',
                value: 'adm'
              },
              {
                label: 'Operador',
                value: 'operator'
              }
            ]
        }
    },

    methods: {
      ...mapActions(['createNewFirefighter']),

      save() {
        this.createNewFirefighter(this.firefighter)
        .then(() => {
          this.$q.notify({
            message: this.firefighter.id ? 'Usuário editado com sucesso!' : 'Usuário criado com sucesso!',
            color: 'green-13',
            position: 'top'
          })
          this.$router.push({name: 'users'})
        })
        .catch(e => {
          this.$q.notify({
            message: 'Houve uma falha, tente novamente mais tarde!',
            color: 'red',
            position: 'top'
          })
        })
      }
    },

    computed: {
      firefighter() {
        return this.value
      },

      userId() {
        return authService.getId()
      },

      role() {
        return authService.getRole()
      }
    }
}
</script>
