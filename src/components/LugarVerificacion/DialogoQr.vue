<template>
    <Dialog
        :style="{ width: '40vw' }"
        :modal="true"
        header="Codigo QR"
        :visible="showDialog"
        :closable="false"
    >
        <div class=" text-center mt-2">
            <Image :src="codigoQR" alt="Image" width="350" />
        </div>
        <div class="d-flex justify-content-end">
            <Button
                label="Cerrar"
                class="p-button-outlined p-button-danger me-2"
                iconPos="right"
                @click="cerrarDialogoQR"
            /> 
        </div>
    </Dialog>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
    data:()=>({

    }),
    computed:{
        ...mapState("lugarVerificarStore",["dialogoQR","codigoQR"]),
        showDialog(){
            return this.dialogoQR;
        }
    },
    methods:{
        ...mapMutations("lugarVerificarStore", ["closeDialogoQR"]),

        cerrarDialogoQR(){
            this.closeDialogoQR();
        }
    }
}
</script>

<style>

</style>