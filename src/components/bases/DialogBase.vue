<template>
    <Dialog 
        :style="{ width: '40vw' }" 
        :modal="true"  
        :header="method === 'CREATE' ? 'Crear nueva Base': 'Editar Base' " 
        :visible="showDialog" 
        :closable="false"
        >
        <div class="mt-2">
            <form 
                @submit.prevent="method === 'CREATE' ? postBase(base) : putBase(base)" 
                id="form-base"
            > 
                <div class="col-lg-12 col-md-12 mb-3"> 
                    <label class="form-label"  >Nombre</label>
                    <span class="p p-fluid">
                        <InputText v-if="method === 'CREATE'" id="username" type="text" v-model="base.nombre " @input="base.nombre = $event.target.value.toUpperCase()" />
                        <InputText v-if="method === 'UPDATE'" id="username" type="text" v-model="base.nombre " @input="base.nombre = $event.target.value.toUpperCase()" />
                    </span>
                </div>  
            </form>
        </div>
        <div class="d-flex justify-content-end">
            <Button label="Cancelar" class="p-button-outlined p-button-danger me-2" iconPos="right" @click="cerrarDialogo"/>
            <Button type="submit" form="form-base" :label="method ==='CREATE' ? 'Guardar': 'Editar'" class="p-button-success" icon="pi pi-check" iconPos="right"/>
        </div> 
    </Dialog> 
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
export default {
    computed:{
        ...mapState("baseStore", ['dialogo', 'method','base', 'detailBase']),
        showDialog(){
            return this.dialogo;
        }
    },
    methods:{ 
        ...mapMutations("baseStore",["closeDialogo"]),
        ...mapActions("baseStore",["addBase","updateBase"]),
        cerrarDialogo(){
            this.closeDialogo();
        },
        postBase(base){
            if(base.nombre.trim()===""){
                this.$toast.add({severity:'warn', summary: 'AVISO!', detail:'Escriba un nombre valido!', life: 3000});
                return;
            }
            this.addBase({data: base, toast: this.$toast})
        },
        putBase(base){
             if(base.nombre.trim()===""){
                this.$toast.add({severity:'warn', summary: 'AVISO!', detail:'Escriba un nombre valido!', life: 3000});
                return;
            }
            this.updateBase(base)
        }
    }
}
</script>

<style>

</style>