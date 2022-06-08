<template>
    <Dialog 
        :style="{ width: '40vw' }" 
        :modal="true"  
        :header="method === 'CREATE' ? 'Crear nueva incidencia': 'Editar incidencia' " 
        :visible="showDialog" 
        :closable="false"
        >
        <div class="mt-2">
            <form 
                @submit.prevent="method === 'CREATE' ? addIncidencia(incidencia) : updateIncidencia(incidencia)" 
                id="form-incidencia"
            > 
                <div class="col-lg-12 col-md-12 mb-3">
                    <label class="form-label">Base</label>
                    <span class="p p-fluid">
                        <Dropdown   
                            :disabled="incidencia.id_base != 0"
                            v-model="incidencia.id_base"
                            :options="allBases"
                            optionLabel="nombre"
                            optionValue="id"
                            placeholder="Selecciona una base"
                        />
                    </span>
                </div> 
                <div class="col-lg-12 col-md-12 mb-3"> 
                    <label class="form-label">Nombre</label>
                    <span class="p p-fluid">
                        <InputText  type="text" v-model="incidencia.nombre " @input="incidencia.nombre = $event.target.value.toUpperCase()" />
                    </span>
                </div> 
                <div class="col-lg-12 col-md-12 mb-3">
                    <label class="form-label">Descripcion</label>
                    <span class="p p-fluid">
                        <Textarea 
                            v-model="incidencia.descripcion"
                            @input="incidencia.descripcion = $event.target.value.toUpperCase()"
                            :autoResize="true"
                            rows="5"
                            cols="120"
                        />
                    </span>
                </div>
                <div v-if="method === 'UPDATE'" class="d-flex justify-content-around mb-5"> 
                    <div> <RadioButton name="estatus" :value=0 v-model="incidencia.estatus" /><label>&nbsp;&nbsp;Inactivo</label></div>
                    <div><RadioButton name="estatus" :value=1 v-model="incidencia.estatus" /><label>&nbsp;&nbsp;Activo</label></div>
                </div>
            </form>
        </div>
        <div class="d-flex justify-content-end">
            <Button label="Cancelar" class="p-button-outlined p-button-danger me-2" iconPos="right" @click="cerrarDialogo"/>
            <Button type="submit" form="form-incidencia" :label="method ==='CREATE' ? 'Guardar': 'Editar'" class="p-button-success" icon="pi pi-check" iconPos="right"/>
        </div> 
    </Dialog> 
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex';
export default {
     
    computed:{
        ...mapState("incidenciaStore",["dialogo", "method", "incidencia"]),
        ...mapState("baseStore",["allBases"]), 
        showDialog(){
            return this.dialogo;
        }
    },
    methods:{
        ...mapMutations("incidenciaStore", ["closeDialogo"]),
        ...mapActions("incidenciaStore", ["postIncidencia", "putIncidencia"]),
        ...mapActions("baseStore",["getAllBases"]),
        cerrarDialogo(){
            this.closeDialogo();
        },
        addIncidencia(data){
            if(data.id_base === 0){
                this.$toast.add({severity:'warn', summary: 'AVISO!', detail:'Seleccione una base valida!', life: 3000});
                return;
            }
            if(data.nombre.trim() ===""){
                this.$toast.add({severity:'warn', summary: 'AVISO!', detail:'El nombre no puede ir vacio!', life: 3000});
                return;
            }
            if(data.descripcion.trim()===""){
                this.$toast.add({severity:'warn', summary: 'AVISO!', detail:'La descripcion no puede ir vacio!', life: 3000});
                return;
            }

            data.descripcion = data.descripcion.toUpperCase();
            this.postIncidencia({incidencia: data, toast: this.$toast});
        },
        updateIncidencia(data){
            if(data.id_base === 0){
                this.$toast.add({severity:'warn', summary: 'AVISO!', detail:'Seleccione una base valida!', life: 3000});
                return;
            }
            if(data.nombre.trim() ===""){
                this.$toast.add({severity:'warn', summary: 'AVISO!', detail:'El nombre no puede ir vacio!', life: 3000});
                return;
            }
            if(data.descripcion.trim()===""){
                this.$toast.add({severity:'warn', summary: 'AVISO!', detail:'La descripcion no puede ir vacio!', life: 3000});
                return;
            }

            data.descripcion = data.descripcion.toUpperCase();
            this.putIncidencia({incidencia: data, toast: this.$toast})
        }
    },
    mounted(){
        this.getAllBases(); 
    }
}
</script>

<style>

</style>