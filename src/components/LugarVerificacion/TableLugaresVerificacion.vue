<template>
    <DataTable
        :rowHover="true" 
        :value="allLugaresVerificacion"
        responsiveLayout="scroll" 
        class="p-datatable-sm" 
        :rows="10"
        :paginator="true"
        filterDisplay="menu"
        v-model:filters="filtroLugaresVerificacion"
        :globalFilterFields="['base']"
    > 
        <Column field="lugar" header="NOMBRE" sortable></Column>
        <Column field="descripcion" header="DESCRIPCION"></Column>
        <Column field="base" header="BASE" sortable>
            <template #body="{data}">
                <span>{{data.base}}</span>
            </template>
            <template #filter="{filterModel}">
                <InputText type="text" v-model="filterModel.value"   class="p-column-filter" placeholder="Buscar por Base" />
            </template>
        </Column>
        <Column header="QR">
            <template #body="{data}">
                <div class="d-flex justify-content-center">
                    <Button type="button" icon="pi pi-qrcode" class="p-button-info " @click="verQR(data)"></Button>
                </div>
            </template> 
        </Column>
        <Column header="EDITAR">
            <template #body="{data}">
                <div class="d-flex justify-content-center">
                    <Button type="button" icon="pi pi-pencil" class="p-button-warning " @click="editar(data)"></Button>
                </div>
            </template> 
        </Column> 
        <Column header="ELIMINAR">
            <template #body="{data}">
                <div class="d-flex justify-content-center">
                    <Button type="button" icon="pi pi-trash" class="p-button-danger " @click="eliminar(data.id)"></Button>
                </div>
            </template> 
        </Column> 
    </DataTable> 
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import {FilterMatchMode,FilterOperator} from 'primevue/api'; 

export default {
    created(){
        this.setLocalFilters();
    },
    data:()=>({
        filtroLugaresVerificacion: null,
    }),
    computed:{
        ...mapState("lugarVerificarStore",["allLugaresVerificacion"]),
    },
    methods:{
        ...mapMutations("lugarVerificarStore",["openDialogo","openDialogoQR","closeDialogoQR"]),
        ...mapActions("lugarVerificarStore",["getAllLugaresVerificacion","getCodigoQR", "getLugaresVerificacionById","deleteLugarVerificacion"]),

        editar(data){
            this.getLugaresVerificacionById(data.id);
            this.openDialogo({display: true, method: 'UPDATE'})
        },
        verQR(data){
            this.getCodigoQR(data.id);
            this.openDialogoQR();
        },
        eliminar(id){
            this.deleteLugarVerificacion({id: id, toast: this.$toast})
        },
        setLocalFilters(){
            this.filtroLugaresVerificacion = {
                'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
                'base': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},   
               } 
        },
    },
    mounted(){
        this.getAllLugaresVerificacion();
    }
}
</script>

<style>

</style>