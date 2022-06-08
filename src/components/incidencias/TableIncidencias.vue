<template>
    <DataTable
        :rowHover="true" 
        :value="allIncidencias"
        responsiveLayout="scroll" 
        class="p-datatable-sm" 
        :rows="10"
        :paginator="true"
        filterDisplay="menu"
        v-model:filters="filtroIncidencias"
        :globalFilterFields="['base','estatus', 'nombre']"
    > 
        <Column field="nombre" header="NOMBRE" sortable>
            <template #body="{data}">
                <span>{{data.nombre}}</span>
            </template>
            <template #filter="{filterModel}">
                <InputText type="text" v-model="filterModel.value"   class="p-column-filter" placeholder="buscar por nombre" />
            </template>
        </Column>
        <Column field="descripcion" header="DESCRIPCION"></Column>
        <Column field="estatus" header="STATUS">
            <template #body="{data}">
                <span>{{data.estatus}}</span>
            </template>
            <template #filter="{filterModel}">
                <InputText type="text" v-model="filterModel.value"   class="p-column-filter" placeholder="filtrar por estatus" />
            </template>
        </Column>
        <Column field="base" header="BASE" sortable>
            <template #body="{data}">
                <span>{{data.base}}</span>
            </template>
            <template #filter="{filterModel}">
                <InputText type="text" v-model="filterModel.value"   class="p-column-filter" placeholder="Buscar por Base" />
            </template>
        </Column> 
        <Column header="EDITAR">
            <template #body="{data}">
                <div class="d-flex justify-content-center">
                    <Button type="button" icon="pi pi-pencil" class="p-button-warning " @click="editar(data)"></Button>
                </div>
            </template> 
        </Column>  
    </DataTable>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import {FilterMatchMode,FilterOperator} from 'primevue/api'; 

export default {
    mounted(){
        this.getAllIncidencias();
    },
    created(){
        this.setLocalFilters();
    },
    data:()=>({
        filtroIncidencias: null,
    }),
    computed:{
        ...mapState("incidenciaStore",["allIncidencias"]),
    },
    methods:{
        ...mapActions("incidenciaStore",["getAllIncidencias","getIncidenciaById"]),
        ...mapMutations("incidenciaStore",["openDialogo"]),
        editar(data){ 
            this.getIncidenciaById(data.id);
            this.openDialogo({display: true, method: 'UPDATE'})
        },
        setLocalFilters(){
            this.filtroIncidencias = {
                'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
                'base': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]}, 
                'estatus': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},   
                'nombre': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},   
               } 
        },
    }
}
</script>

<style>

</style>