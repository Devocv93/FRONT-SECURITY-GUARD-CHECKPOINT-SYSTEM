<template>
    <DataTable
        :rowHover="true" 
        :value="allBases"
        responsiveLayout="scroll" 
        class="p-datatable-sm" 
        :rows="10"
        :paginator="true"
    > 
        <Column field="nombre" header="BASE"></Column>
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
export default {
    computed:{
        ...mapState("baseStore", ["allBases"])
    },
    methods:{
        ...mapActions("baseStore", ['getAllBases',"getBaseById"]),
        ...mapMutations("baseStore", ['setDetailBase', 'openDialogo']),
        editar(data){
            this.getBaseById(data.id);
            this.openDialogo({display:true, method:'UPDATE'})   
        }
    },
    mounted(){
        this.getAllBases();
    }
}
</script>

<style>

</style>