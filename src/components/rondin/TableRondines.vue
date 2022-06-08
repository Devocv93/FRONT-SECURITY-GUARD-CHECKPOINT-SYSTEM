<template>
    <DataTable
        :rowHover="true" 
        :value="allRondines"
        responsiveLayout="scroll" 
        class="p-datatable-sm" 
        :rows="15"
        :paginator="true"
        filterDisplay="menu"
        v-model:filters="filtroBases"
        :globalFilterFields="['base']"
    > 
        <Column field="nombre" header="NOMBRE"></Column>
        <Column field="base" header="BASE">
            <template #body="{data}">
                <span>{{data.base}}</span>
            </template>
            <template #filter="{filterModel}">
                <InputText type="text" v-model="filterModel.value"   class="p-column-filter" placeholder="Buscar por Base" />
            </template>
        </Column>
        <Column header="EDITAR" headerStyle="width: 8em" bodyStyle="text-align: center">
            <template #body="{data}">
                <div class="d-flex justify-content-center">
                    <Button type="button" icon="pi pi-pencil" class="p-button-warning " @click="editar(data)"></Button>
                </div>
            </template> 
        </Column> 
        <Column header="ELIMINAR" headerStyle="width: 8em;" headerClass=" text-align: center">
            <template #body="{data}">
                <div class="d-flex justify-content-center">
                    <Button type="button" icon="pi pi-trash" class="p-button-danger " @click="eliminar(data)"></Button>
                </div>
            </template> 
        </Column> 
    </DataTable> 
</template>

<script>
import {FilterMatchMode,FilterOperator} from 'primevue/api'; 
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
    created(){
        this.setLocalFilters();
    },
    data:()=>({
        filtroBases: null,
    }),
    computed:{
        ...mapState("rondinStore", ["allRondines"])
    },
    methods:{
        ...mapMutations("rondinStore", ["openDialogo"]),
        ...mapActions("rondinStore",["getRondinById","getAllRutasRondinesByRondin","deleteRondinById"]),
        ...mapActions("lugarVerificarStore",["getLugaresVerificacionByBase"]),
        
        setLocalFilters(){
            this.filtroBases = {
                'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
                'base': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},   
               } 
        },
        editar(data){ 
            this.getRondinById(data.id) 
            this.getLugaresVerificacionByBase(data.id_base); 
            this.getAllRutasRondinesByRondin(data.id);
            this.openDialogo({display: true, method: 'UPDATE'})
        },
        eliminar(data){ 
            this.deleteRondinById(data.id);
        }
    }
}
</script>

<style>

</style>