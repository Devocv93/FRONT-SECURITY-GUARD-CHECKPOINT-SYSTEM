<template>
    <div class="container sombra">
        <div class="mt-5">
            <div class="mb-4">
                <Button
                    label="Agregar nueva base"
                    class="p-button-success"
                    icon="pi pi-plus"
                    @click="openDialogo({display: true, method: 'CREATE'})"
                />
            </div>
            <TableBases /> 
        </div> 
        <DialogBase />
    </div>
</template>

<script>
import { mapMutations } from 'vuex'

import DialogBase from '../components/bases/DialogBase.vue'
import TableBases from '../components/bases/TableBases.vue'

export default {
    components:{
        DialogBase,
        TableBases
    },
    methods:{
        ...mapMutations("baseStore", ['openDialogo']) 
    }

}
</script>

<style scoped>
    .sombra{
          box-shadow: 0px 15px 15px #4E878C;  
      }
</style>