<template>
    <div class="container sombra">
        <div class="mt-5">
            <div class="mb-4">
                <Button
                    label="Nueva Incidencia"
                    class="p-button-success"
                    icon="pi pi-plus"
                    @click="openDialogo({display: true, method: 'CREATE'})"
                />
            </div>
            <TableIncidencias /> 
        </div> 
        <DialogoIncidencia v-if="dialogo" /> 
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

import DialogoIncidencia from '../components/incidencias/DialogoIncidencia.vue'
import TableIncidencias from  '../components/incidencias/TableIncidencias.vue'

export default {
    components:{
        DialogoIncidencia,
        TableIncidencias
    },
    computed:{
        ...mapState("incidenciaStore",["dialogo"])
    },
    methods:{
        ...mapMutations("incidenciaStore", ["openDialogo"]),
         
    }
}
</script>

<style>
    .sombra{
          box-shadow: 0px 15px 15px #4E878C;  
      }
</style>