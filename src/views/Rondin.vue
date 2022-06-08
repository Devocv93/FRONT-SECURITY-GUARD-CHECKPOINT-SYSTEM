<template>
    <div class="container sombra">
        <div class="mt-5">
            <div class="mb-4">
                <Button
                    label="Nuevo Rondin"
                    class="p-button-success"
                    icon="pi pi-plus"
                    @click="openDialogo({display: true, method: 'CREATE'})"
                />
            </div>
            <TableRondines /> 
        </div> 
        <DialogoRondin v-if="dialogo" /> 
    </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'

import DialogoRondin from '../components/rondin/DialogoRondin.vue'
import TableRondines from '../components/rondin/TableRondines.vue'

export default {
    components:{
        DialogoRondin,
        TableRondines
    },
    computed:{
        ...mapState("rondinStore",["dialogo"])
    },
    methods:{
        ...mapMutations("rondinStore",["openDialogo"]),
        ...mapActions("rondinStore",["getAllRondines"]),
    },
    mounted(){
        this.getAllRondines();
    }
}
</script>

<style>
    .sombra{
          box-shadow: 0px 15px 15px #4E878C;  
      }
</style>