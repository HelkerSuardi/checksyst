<template>
    <div>
        <q-page :padding="true">
            <q-item-label style="font-size: 2rem" class="q-ml-md q-mb-md">
                Veículo
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
                            v-model="vehicle.name"
                            required
                        />
                    </div>
                    <div class="col-5 q-mb-md q-mr-md">
                        <q-input
                            label="Placa"
                            outlined
                            v-model="vehicle.plaque"
                            required
                        />
                    </div>
                </div>
                <div class="row q-my-form">
                    <div class="col-5 q-mb-md q-mr-md">
                        <q-input
                            @input="val => { files = val }"
                            multiple
                            filled
                            type="file"
                        />
                    </div>
                </div>
                <div class="row">
                    <div class="col-10" style="margin-left: 1rem">
                        <q-btn
                            label="Cancelar"
                            icon="block"
                            style="width: 9rem"
                            color="red"
                            class="float-right"
                        />
                        <q-btn
                            label="Salvar"
                            type="submit"
                            style="width: 9rem"
                            icon="save"
                            color="green-13"
                            class="float-right q-mr-md"
                        />
                    </div>
                </div>
            </form>
        </q-page>
    </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('vehicle')

export default {
  props: {
    value: {
      type: Object,
      required: true
    }
  },

  methods: {
    ...mapActions(['createNewVehicle']),

    save() {
        this.createNewVehicle(this.vehicle)
        .then(() => {
          this.$q.notify({
            message: 'Veículo criado com sucesso!',
            color: 'green-13',
            position: 'top'
          })
          this.$router.push({name: 'vehicles'})
        })
        .catch(e => {
          this.$q.notify({
            message: 'Falha ao criar novo veículo, tente novamente mais tarde!',
            color: 'red',
            position: 'top'
          })
        })
    }
  },

  computed: {
    vehicle() {
      return this.value
    }
  },
}
</script>
