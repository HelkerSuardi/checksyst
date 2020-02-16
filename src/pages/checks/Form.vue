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
                          check.firefighter._id ? check.firefighter._id = value : check.firefighter = value
                        }"
                    />
                </div>
            </div>
            <div class="row q-my-form">
                <div class="col-5 q-mb-md q-mr-md">
                    <q-input label="Hora" filled v-model="time" mask="time" :rules="['time']">
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy transition-show="scale" transition-hide="scale">
                            <q-time v-model="time" />
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                </div>
                <div class="col-5 q-mb-md q-mr-md">
                    <q-input label="Data" filled v-model="date">
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                            <q-date v-model="date" mask="DD/MM/YYYY"  @input="() => $refs.qDateProxy.hide()" />
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
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
                        :disable="itemEquipQuantity < 1 || check.vehicle === '' || itemEquipUnity === '' || date === '' || time === '' "
                        @click="addItemToList"
                    />
                </div>
            </div>
            <list-of-items
              @save="save"
              @removeItemEquip="removeItemEquip"
              :selectedItemsEquips="selectedItemsEquips"
            />

        </q-page>
    </div>
</template>
<script>
import moment from 'moment'
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapGetters } = createNamespacedHelpers('check')
import ListOfItems from './components/Items'

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

  async created() {
    await this.load()
  },

  methods: {
    ...mapActions(['saveCheckAndUpdateVehicle', 'getVehicle']),

    load() {
      if (!this.check.id) {
        return
      }

      const dateToUtc = moment(this.check.date).subtract(3, 'hours').toISOString()

      const date = moment(dateToUtc.split('T', 1)[0]).format('DD/MM/YYYY')
      const time = dateToUtc.split('T')[1].split('.', 1)[0]
      this.time = time
      this.date = date

      this.selectedItemsEquips = this.check.itemsEquips

    },

    async loadVehicleItems(vehicleId) {
      this.selectedItemsEquips = []

      const vehicle = this.vehicles.find(vehicle => {
        return vehicle.id.toString() === vehicleId.toString()
      })

      const vehicleItems = vehicle.item

      vehicleItems.forEach(vi => {
        this.selectedItemsEquips.push({...vi.item, quantity: vi.quantity})
      })

    },

    removeItemEquip(index) {
      this.selectedItemsEquips.splice(index, 1)
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
      this.selectedItemsEquips.push({...this.itemEquipUnity, quantity: this.itemEquipQuantity})
    },

    save() {
      const date = this.date.split('/')
      const formatedDate = date[2] + '/' + date[1] + '/' + date[0]

      const timeAndDate = `${formatedDate} ${this.time}`
      this.check.date = moment(timeAndDate)

      this.saveCheckAndUpdateVehicle({
        check: this.check,
        selectedItemsEquips: this.selectedItemsEquips
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
      ListOfItems
  }
}
</script>
