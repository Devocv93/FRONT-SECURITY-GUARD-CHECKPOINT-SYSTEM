<template>
    <Menubar class="menubar fuente" :model="itemsArbol">
        <template #start> 
            <h5></h5>
        </template>
        <template #items="{items}">
            <label >{{items.label}}</label> 
        </template>
        <template #end> 
            <label  class="form-label">{{user.email}}</label>
            <Button label="Salir" @click="cerrarSesion" icon="pi pi-fw pi-power-off" class="p-button-outlined p-button-warning p-button-text" type="text" />
        </template>
    </Menubar>
</template>
<script>
import axios from 'axios'
import { mapActions, mapMutations, mapState } from 'vuex';

export default {
    data() {
        return {
            itemsArbol: [], 
            user: null,
            arbolNavBar:[]
        };
    },
    methods:{
        ...mapMutations('authStore', ['setUserData']),
        cerrarSesion(){ 
            this.user = null;
            this.setUserData(null);
            localStorage.removeItem('dataUser')
            this.$router.push('/login');
        },
        arbol(){
            let itemadd = [];

            itemadd.push({label: "BASES", to: '/bases'}); 
            itemadd.push({label: "PUNTO A REVISAR", to: '/lugarverificacion'});
            itemadd.push({label: "RONDINES", to: '/rondin'}); 
            itemadd.push({label: "INCIDENCIAS", to: '/incidencias'}); 

            this.itemsArbol.push({label: "INICIO", icon:'pi pi-book', to: '/'} )
            this.itemsArbol.push({label: "CATALOGOS", icon:'pi pi-book', items: itemadd} )
        }
    },
    created(){
        var data = localStorage.getItem('dataUser')
        this.user = JSON.parse(data);

        this.arbol()
    }
}
</script>

<style>

</style>