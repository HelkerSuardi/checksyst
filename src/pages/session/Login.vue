<template>
    <q-layout class="loginScreen">
      <div class="column items-center">
        <h3 class="text-white">CheckSyst</h3>
      </div>
      <div class="absolute-center" style="heigth: 30%; width: 30%">
        <div class="q-pa-xl bg-white" style="border-radius: 5px">
          <q-form class="q-gutter-md" @submit.prevent="login">
            <q-input
              outlined
              class="bg-white full-width"
              label="E-mail"
              v-model="email"
              required
            />
            <q-input
              class="bg-white full-width"
              outlined
              label="Senha"
              type="password"
              v-model="password"
              required
            />
            <q-btn class="full-width" label="Entrar" type="submit" color="primary" />
          </q-form>
          <div class="column items-center q-pt-lg">
            <q-chip
              clickable
              @click="resetPassword"
              color="teal"
              text-color="white"
              icon="vpn_key"
            >
              Esqueceu a senha ? Clique aqui!
            </q-chip>
          </div>
        </div>
      </div>
      <q-footer class="row transparent">
        <img class="" src="../../assets/bombgp.png" style="width: 10%">
        <img class="absolute-right" src="../../assets/bombpr.png" style="width: 10%">
      </q-footer>
    </q-layout>
</template>

<script>
import authService from '../../service/auth-service'

export default {
  data () {
    return {
      email: 'admin@admin.com',
      password: '123'
    }
  },

  methods: {
    login () {
      this.$axios.post('/auth/authenticate', { email: this.email, password: this.password }).then(response => {
        const { token, data } = response.data

        if (data.role === 'operator') {
          this.$q.notify({
            message: 'Você não tem as permissões necessárias!',
            position: 'top',
            color: 'red'
          })
          return
        }

        authService.login({
          token,
          name: data.name,
          id: data._id,
          role: data.role
        })

        this.$router.push({
          name: 'checks'
        })

        this.$q.notify({
          message: 'Login efetuado com sucesso!',
          position: 'top',
          color: 'green-13'
        })
      }).catch(({ response }) => {
        const { message } = response.data
        this.$q.notify({
          message,
          position: 'top',
          color: 'negative'
        })
      })
    },

    resetPassword () {
     this.$q.dialog({
        dark: true,
        title: 'Resetar senha',
        message: 'Digite o seu e-mail',
        prompt: {
          model: '',
          type: 'text'
        },
        cancel: true
      }).onOk(async data => {
          await this.$axios.put(`/firefighters/reset-password/${data}`).then(data => {
            this.$q.notify({
              message: data.data.message,
              position: 'top',
              color: 'green-13'
            })
          }).catch(e => {
            this.$q.notify({
              message: e.response.data.message,
              position: 'top',
              color: 'red'
            })
          })

      })
    }
  }

}
</script>

<style>
 .loginScreen {
   background-image: url("../../assets/14710.jpg");
   background-repeat: no-repeat;
   background-size: cover;
 }
</style>
