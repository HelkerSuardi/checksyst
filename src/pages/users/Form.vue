<template>
    <div>
        <q-page :padding="true">
            <q-item-label style="font-size: 2rem" class="q-ml-md q-mb-md"> 
                Usuários
            </q-item-label>  
            <form
                method="post"
                class="q-ml-md"
            >
                <div class="row q-my-form">
                    <div class="col-5 q-mb-md q-mr-md">
                        <q-input
                            label="Nome"
                            outlined
                        />
                    </div>
                    <div class="col-5 q-mb-md">
                        <q-select
                            filled
                            v-model="vehicle"
                            use-input
                            input-debounce="0"
                            label="Permissão"
                            :options="vehicleOptions"
                            @filter="filterFn"
                        />
                    </div>                     
                </div>
                <div class="row q-my-form">
                    <div class="col-5 q-mb-md q-mr-md">
                        <q-input
                            label="E-mail"
                            type="email"
                            outlined
                        />
                    </div>             
                    <div class="col-5 q-mb-md">
                        <q-input
                            label="R.G"
                            outlined
                        />
                    </div>                    
                </div>
                <div class="row">
                    <div class="col-5 q-mb-md">
                        <q-input
                            label="Senha"
                            type="password"
                            outlined
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
}
</script>