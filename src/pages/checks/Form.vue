<template>
    <div>
        <q-page :padding="true">
            <q-item-label style="font-size: 2rem" class="q-ml-md q-mb-md"> 
                Checagem
            </q-item-label>  
            <form
                method="post"
                class="q-ml-md"
            >
                <div class="row q-my-form">
                    <div class="col-5 q-mb-md">
                        <q-select
                            filled
                            v-model="vehicle"
                            use-input
                            input-debounce="0"
                            label="Veículo"
                            :options="vehicleOptions"
                            @filter="filterFn"
                        />
                    </div>                   
                </div>
                <div class="row q-my-form">
                     <div class="col-5 q-mb-md q-mr-md">
                        <q-select
                            filled
                            v-model="vehicle"
                            use-input
                            input-debounce="0"
                            label="Item/Equip"
                            :options="vehicleOptions"
                            @filter="filterFn"
                        />
                    </div>                    
                    <div class="col-5 q-mb-md q-mr-md">
                        <q-select
                            filled
                            v-model="vehicle"
                            use-input
                            input-debounce="0"
                            label="Quantidade"
                            :options="vehicleOptions"
                            @filter="filterFn"
                        />
                    </div>
                    <div class="col-1 q-pt-md">
                        <q-btn
                            icon="add"
                            color="green-13"
                        />
                    </div>
                </div>
            </form>
            <list-of-items></list-of-items>
            
        </q-page>
    </div>
</template>
<script>
import ListOfItems from './components/Items'

export default {
    data () {
        return {
            vehicle: '',
            vehicleOptions: [
                'Ambulância',
                'Caminhão-pipa',
                'Jipe'
            ]
        }
    },

    components: {
        ListOfItems
    }
}
</script>