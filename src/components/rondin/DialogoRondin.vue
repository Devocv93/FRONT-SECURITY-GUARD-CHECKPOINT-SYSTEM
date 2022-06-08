<template>
    <Dialog 
        :style="{ width: '40vw' }" 
        :modal="true"  
        :header="method === 'CREATE' ? 'Crear nuevo rondin': 'Editar rondin' " 
        :visible="showDialog" 
        :closable="false"
        >
        <div class="mt-2">
            <form 
                @submit.prevent="method === 'CREATE' ? postRondin(rondin) : updateRondin(rondin)" 
                id="form-rondin"
            > 
                <div class="col-lg-12 col-md-12 mb-3">
                    <label class="form-label">Base</label>
                    <span class="p p-fluid">
                        <Dropdown  
                            @change="BaseSelected" 
                            :disabled="rondin.id_base != 0"
                            v-model="rondin.id_base"
                            :options="allBases"
                            optionLabel="nombre"
                            optionValue="id"
                            placeholder="Selecciona una base"
                        />
                    </span>
                </div> 
                <div class="col-lg-12 col-md-12 mb-3"> 
                    <label class="form-label">Nombre Ruta</label>
                    <span class="p p-fluid">
                        <InputText  type="text" v-model="rondin.nombre " @input="rondin.nombre = $event.target.value.toUpperCase()" />
                    </span>
                </div>
                <div class="col-lg-12 col-md-12 mb-3">
                    <label class="form-label">Agrega el punto a verificar</label>
                    <span class="p p-fluid">
                        <Dropdown
                            @change="lugarSelected"  
                            v-model="idLugarRevision"
                            :options="lugaresVerificacionByBase"
                            optionLabel="nombre"
                            optionValue="id"
                            placeholder="Selecciona un lugar"
                        />
                    </span>
                </div> 
                <div id="items" class="col-lg-12 col-md-12 ">
                    <div class="row m-0 p-0" v-for="item in rutasRondin" :key="item.id"  style="cursor:pointer;" >   
                        <div class="col-lg-11 col-md-11">
                            <Message severity="success" draggable icon="pi pi-arrows-v " :closable="false">
                                {{item.nombre}}
                            </Message>
                        </div>
                        <div class="col-lg-1 col-md-1"> 
                            <i class="pi pi-times mt-4 pt-2" style="color: red" @click="eliminar(item)"></i>
                        </div>
                    </div>
                </div> 
            </form>
        </div>
        <div class="d-flex justify-content-end">
            <Button label="Cancelar" class="p-button-outlined p-button-danger me-2" iconPos="right" @click="cerrarDialogo"/>
            <Button type="submit" form="form-rondin" :label="method ==='CREATE' ? 'Guardar': 'Editar'" class="p-button-success" icon="pi pi-check" iconPos="right"/>
        </div> 
    </Dialog> 
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import Sortable from 'sortablejs';

export default {
    data:()=>({
        idLugarRevision: 0
    }),
    computed:{
        ...mapState("rondinStore",["dialogo", "method", "rondin", "rutasRondin"]),
        ...mapState("baseStore",["allBases"]),
        ...mapState("lugarVerificarStore",["lugaresVerificacionByBase"]),
        showDialog(){
            return this.dialogo;
        },
        
    },
    methods:{
        ...mapMutations("rondinStore",["closeDialogo", "addRutaRondin", "setNewValueRutasRondin", "ordenarRutasRondin", 'deleteRutaRondin']),
        ...mapMutations("lugarVerificarStore",["resetLugaresVerificacionByBase"]),
        ...mapActions("lugarVerificarStore",["getLugaresVerificacionByBase"]),
        ...mapActions("baseStore",["getAllBases"]),
        ...mapActions("rondinStore",["postNewRondin", "putRondin", "deleteRutaRondinById"]),
        cerrarDialogo(){
            this.resetLugaresVerificacionByBase();  
            this.closeDialogo();
        },
        postRondin(data){ 
            if(data.id_base ===0){
                this.$toast.add({severity:'warn', summary: 'AVISO!', detail: 'Seleccione una base', life: 3000});
                return;
            }
            if(data.nombre.length ===0 || data.nombre.trim()===""){
                this.$toast.add({severity:'warn', summary: 'AVISO!', detail: 'Ingrese un nombre!', life: 3000});
                return;
            }
            if(this.rutasRondin.length < 1){
                this.$toast.add({severity:'warn', summary: 'AVISO!', detail: 'No se ha agregado ningun punto a verificar!', life: 3000});
                return;
            }
           this.postNewRondin(data) 
        },
        updateRondin(data){ 
            this.putRondin(data);
        },
        BaseSelected(event){
             
            this.getLugaresVerificacionByBase(event.value); 
        },
        lugarSelected(event){ 
            const exist = this.rutasRondin.find(ruta => ruta.id === event.value)
            const data = {id: event.value, nombre: event.originalEvent.path[0].innerText, orden: this.rutasRondin.length + 1}

            if(exist) {
                this.$toast.add({severity:'warn', summary: 'AVISO!', detail: 'Este lugar de revision ya esta agregado!', life: 3000});
                return;
            }
            else {
                this.addRutaRondin(data); 
            }
           
        },
        eliminar(data){
            this.deleteRutaRondin(data.id);
            if(this.method === "UPDATE"){
                this.deleteRutaRondinById({id: data.idLugarVe, toast: this.$toast})
            }
        },
        sortable(){
            var el = document.getElementById('items');
            Sortable.create(el,{
                animation: 350,   
                onChange:(event)=>{
                    let firstValue = this.rutasRondin[event.oldIndex].orden;
                    let secondValue = this.rutasRondin[event.newIndex].orden;

                    this.setNewValueRutasRondin({index: event.newIndex, value: firstValue});
                    this.setNewValueRutasRondin({index: event.oldIndex, value: secondValue});
                },
                onEnd: (event)=>{
                    this.ordenarRutasRondin();
                },
            });
        }
    },
    mounted(){
        this.getAllBases();
        this.sortable();
    }
    
}
</script>

<style scoped>
     
     
</style>