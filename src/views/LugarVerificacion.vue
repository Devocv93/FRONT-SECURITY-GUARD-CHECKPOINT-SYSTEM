<template>
    <div class="container sombra">
        <div class="mt-5">
            <div class="mb-4">
                <Button
                    label="Punto Verificar"
                    class="p-button-success"
                    icon="pi pi-plus"
                    @click="openDialogo({display: true, method: 'CREATE'})"
                />
            </div>
            <TableLugaresVerificaciones /> 
        </div> 
        <DialogLugarVerificacion />
        <DialogoQR />
    </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

import DialogLugarVerificacion from  '../components/LugarVerificacion/Dialogo.vue'
import TableLugaresVerificaciones from '../components/LugarVerificacion/TableLugaresVerificacion.vue'
import DialogoQR from '../components/LugarVerificacion/DialogoQr.vue'

export default {
    components:{
        DialogLugarVerificacion,
        TableLugaresVerificaciones,
        DialogoQR
    },
    methods:{ 
        ...mapMutations("lugarVerificarStore",["openDialogo"]),
         
    }

}
</script>

<style>
    .sombra{
          box-shadow: 0px 15px 15px #4E878C;  
      }
</style>