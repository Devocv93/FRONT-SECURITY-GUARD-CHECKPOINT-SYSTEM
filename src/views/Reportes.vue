<template>
    <div class="container sombra">
        <div class="row mt-5">
            <h6 class="text-center">REPORTE DE RONDINES</h6>
            <!-- <div class="col-lg-6 col-md-6 mb-3">
                <label class="form-label">Ruta</label>
                <span class="p p-fluid">
                    <Dropdown 
                      v-model="ruta"
                      :options="rondinByBase"
                      optionLabel="nombre"
                      optionValue="id"
                      placeholder="Selecciona una ruta"
                    />
                </span>
            </div>
            <div class="col-lg-6 col-md-6 mb-3">
                <label class="form-label">Usuario</label>
                <span class="p p-fluid">
                    <Dropdown 
                      v-model="user"
                      :options="users"
                      optionLabel="personal.nombre"
                      optionValue="id"
                      placeholder="Selecciona un usuario"
                    />
                </span>
            </div> -->
        </div> 
        <div class="row">
            <div class="col-lg-4 col-md-4 mb-3">
                <label class="form-label">Base</label>
                <select v-model="base" class="form-select" >
                    <option :value="0">TODOS</option>
                    <option v-for="item in allBases" :key="item.id" :value="item.id">{{item.nombre}}</option>
                </select> 
            </div>
            <div class="col-lg-4 col-md-4 mb-3">
                <label class="form-label">Fecha de Inicio</label>
                <span class="p p-fluid">
                    <Calendar v-model="fhInicio" dateFormat="dd/mm/yy" />
                </span>
            </div>
            <div class="col-lg-4 col-md-4 mb-3">
                <label class="form-label">Fecha Fin</label>
                <span class="p p-fluid">
                    <Calendar v-model="fhFin" dateFormat="dd/mm/yy" />
                </span>
            </div>
        </div>
         <div class="d-flex justify-content-center mb-5 mt-3">
             <Button 
                label="Generar Reporte"
                class="p-button-success mb-5"
                @click="generarReporte"
            />
        </div>
        <div>
            <TableRondinesHechos />
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import moment from 'moment'

import TableRondinesHechos from '../components/reportes/TableReporte.vue'

export default {
    components:{
        TableRondinesHechos,
    },
    mounted(){
        this.getInfoUser();
        this.getAllBases();
    },
    data:()=>({
        base: 0,
        ruta: 0, 
        user: 0, 
        fhInicio: '',
        fhFin: ''
    }),
    computed:{
        ...mapState("rondinStore",["rondinByBase"]),
        ...mapState("ReportesStore", ["users"]),
        ...mapState("baseStore", ["allBases"])
    },
    methods:{
        ...mapActions("rondinStore",["getAllRondinesByBase"]),
        ...mapActions("baseStore",["getAllBases"]),
        ...mapActions("ReportesStore", ["getAllUsuariosByBase","getAllRondinesHecho", "getAllRondinesHechoByRuta"]),
        generarReporte(){
            if(this.fhInicio.toString().trim()===""){
                this.$toast.add({severity:'warn', summary: 'AVISO!', detail:'Seleccione la fecha de inicio!', life: 3000});
                return;
            }
            if(this.fhFin.toString().trim()===""){
                this.$toast.add({severity:'warn', summary: 'AVISO!', detail:'Seleccione la fecha final!', life: 3000});
                return;
            }

            const horaFinal = ' 23:59:59';
            let fFinal = moment(this.fhFin).format();
            let fIn =  moment(this.fhInicio).format();           

            let data = {
                base: this.base,
                finicio: fIn.split("T")[0]+ ' 00:00:00', 
                ffin:  fFinal.split("T")[0]+horaFinal, 
            }

            if(this.base === 0){
                this.getAllRondinesHecho(data); 
            }else{
                this.getAllRondinesHechoByRuta(data);
            }
        },
        getInfoUser(){
            let data = JSON.parse(localStorage.getItem('dataUser'));
            this.base = data.idBase;
            this.getAllRondinesByBase(data.idBase);
            this.getAllUsuariosByBase(data.idBase)
        },

    }
}
</script>

<style>

</style>
