<template>
    <div>
        <q-page :padding="true">
            <q-item-label style="font-size: 2rem" class="q-ml-md q-mb-md">
                Checagem
            </q-item-label>
            <div class="row q-my-form">
                <div class="col-5 q-mb-md q-mr-md">
                    <q-select
                        filled
                        use-input
                        :value="check.vehicle._id ? check.vehicle._id : check.vehicle"
                        input-debounce="0"
                        map-options
                        emit-value
                        label="Veículo"
                        :options="vehicleOptions()"
                        @input="value => {
                          check.vehicle._id ? check.vehicle._id = value : check.vehicle = value
                          loadVehicleItems(value)
                        }"
                    />
                </div>
                <div class="col-5 q-mb-md">
                    <q-select
                        filled
                        use-input
                        :value="check.firefighter._id ? check.firefighter._id : check.firefighter"
                        input-debounce="0"
                        map-options
                        emit-value
                        label="Bombeiro responsável"
                        :options="firefighterOptions()"
                        @input="value => {
                          check.firefighter = value
                        }"
                    />
                </div>
            </div>
            <div class="row q-my-form">
                <div class="col-5 q-mb-md q-mr-md">
                    <base-date
                      v-model="check.date"
                      @date-changed="date => check.date = date"
                    />
                </div>
            </div>
            <div class="row q-my-form">
                  <div class="col-5 q-mb-md q-mr-md">
                    <q-select
                        filled
                        use-input
                        map-options
                        v-model="itemEquipUnity"
                        input-debounce="0"
                        label="Item/Equip"
                        :options="itemEquipOptions()"
                    />
                </div>
                <div class="col-5 q-mb-md q-mr-md">
                    <q-input
                        v-if="itemEquipUnity !== ''"
                        v-model="itemEquipQuantity"
                        :label="itemEquipUnity.measure.charAt(0).toUpperCase() + itemEquipUnity.measure.slice(1)"
                        type="number"
                    />
                </div>
                <div class="col-1 q-pt-md">
                    <q-btn
                        icon="add"
                        color="green-13"
                        :disable="itemEquipQuantity < 1 || check.vehicle === '' || itemEquipUnity === '' || check.date === '' "
                        @click="addItemToList"
                    />
                </div>
            </div>
            <list-of-items
              v-if="check.itemsEquips.length > 0"
              @save="save"
              @removeItemEquip="removeItemEquip"
              :selectedItemsEquips="check.itemsEquips"
              :check="check"
            />

        </q-page>
    </div>
</template>
<script>
import moment from 'moment'
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapGetters } = createNamespacedHelpers('check')
import ListOfItems from './components/Items'
import BaseDate from '../../components/BaseDate'

export default {
  props: {
    value: {
      type: Object,
      required: true
    },
    vehicles: {
      type: Array
    },
    itemsEquips: {
      type: Array
    },
    firefighters: {
      type: Array
    }
  },

  data() {
    return {
      itemEquipUnity: '',
      itemEquipQuantity: 0,
      selectedItemsEquips: [],
      time: '',
      date: ''
    }
  },

  methods: {
    ...mapActions(['saveCheckAndUpdateVehicle', 'getVehicle']),

    async loadVehicleItems(vehicleId) {
      const vehicle = this.vehicles.find(vehicle => {
        return vehicle.id.toString() === vehicleId.toString()
      })

      this.check.itemsEquips = vehicle.itemsEquips
    },

    removeItemEquip(index) {
      this.check.itemsEquips.splice(index, 1)
    },

    vehicleOptions() {
      return this.vehicles.map(v => {
        return {
          label: v.name,
          value: v.id
        }
      })
    },

    itemEquipOptions() {
      return this.itemsEquips.map(ie => {
        return {
          label: ie.name,
          value: ie.id,
          measure: ie.measure,
          name: ie.name
        }
      })
    },

    firefighterOptions() {
      return this.firefighters.map(f => {
        return {
          label: f.name,
          value: f.id,
        }
      })
    },

    addItemToList() {
      this.check.itemsEquips.push({ item: this.itemEquipUnity.value, measure: this.itemEquipUnity.measure, label: this.itemEquipUnity.name,  quantity: this.itemEquipQuantity})
    },

    async save() {
      await this.saveCheckAndUpdateVehicle({
        check: this.check
      })
      .then(() => {
        this.$q.notify({
            message: 'Checagem criada com sucesso!',
            color: 'green-13',
            position: 'top'
          })
          this.$router.push({name: 'checks'})
      })
      .catch (e => {
        this.$q.notify({
            message: 'Falha ao criar nova checagem, tente novamente mais tarde!',
            color: 'red',
            position: 'top'
          })
      })
    }
  },

  computed: {
    ...mapGetters(['vehicle']),

    check () {
      return this.value
    }
  },

  components: {
      ListOfItems,
      BaseDate
  }
}
</script>
