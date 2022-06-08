<template>
    <DataTable
        :rowHover="true" 
        :value="rondinesHechos"
        responsiveLayout="scroll" 
        class="p-datatable-sm" 
        :rows="15"
        :paginator="true"
        filterDisplay="menu"
        v-model:filters="filtroUsuarios"
        :globalFilterFields="['createdAt','rondin.nombre','usuario.personal.nombre', 'lugarverificacion.nombre','incidencium.nombre']"
    > 
        <Column field="createdAt" header="FECHA">
            <template #body="{data}">
                <span>{{ data.createdAt}}</span>
            </template> 
            <template #filter="{filterModel}">
                <InputText type="text" v-model="filterModel.value"   class="p-column-filter" placeholder="Buscar por fecha" />
            </template>
        </Column>
        <Column field="rondin.nombre" header="RUTA">
            <template #body="{data}">
                <span>{{data.rondin.nombre}}</span>
            </template>
            <template #filter="{filterModel}">
                <InputText type="text" v-model="filterModel.value"   class="p-column-filter" placeholder="Buscar por ruta" />
            </template>
        </Column>
        <Column field="lugarverificacion.nombre" header="PUNTO">
            <template #body="{data}">
                <span>{{data.lugarverificacion.nombre}}</span>
            </template>
            <template #filter="{filterModel}">
                <InputText type="text" v-model="filterModel.value"   class="p-column-filter" placeholder="Buscar por punto" />
            </template>
        </Column>
        <Column field="incidencium.nombre" header="INCIDENTE">
            <template #body="{data}">
                <span>{{data.incidencium.nombre}}</span>
            </template>
            <template #filter="{filterModel}">
                <InputText type="text" v-model="filterModel.value"   class="p-column-filter" placeholder="Buscar por incidencia" />
            </template>
        </Column>
        <Column field="observacion" header="OBS"></Column> 
        <Column field="usuario.personal.nombre" header="USUARIO">
            <template #body="{data}">
                <span>{{data.usuario.personal.nombre}}</span>
            </template>
            <template #filter="{filterModel}">
                <InputText type="text" v-model="filterModel.value"   class="p-column-filter" placeholder="Buscar por usuario" />
            </template>
        </Column>       
    </DataTable>

</template>

<script>
import moment from 'moment'
import {FilterMatchMode,FilterOperator} from 'primevue/api'; 
import { mapState } from 'vuex'

export default {
    mounted(){
        this.initial();
    },
    data:()=>({
        filtroUsuarios: null
    }),
    computed:{
        ...mapState("ReportesStore",["rondinesHechos"])
    },
    methods:{
        getDate(date){
            return moment(date).format("DD-MM-YYYY");
        },
        initial(){
            this.filtroUsuarios = {
                'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
                'createdAt': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
                'rondin.nombre': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
                'lugarverificacion.nombre': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
                'incidencium.nombre': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
                'usuario.personal.nombre': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},  
                 
            } 
        },
    }

}
</script>

<style>

</style>