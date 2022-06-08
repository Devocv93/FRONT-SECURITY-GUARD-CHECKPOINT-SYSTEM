<template> 
    <NavBar class="nav" v-if="userData != null " />
    <div class="pages">
        <router-view/>
    </div>
    <Toast />
</template>
<script>
import { mapActions, mapMutations, mapState } from 'vuex'

import NavBar from './components/navbar/index.vue'

export default {
    components:{
        NavBar
    },
     computed: {
    ...mapState('authStore', ['userData'])
    },
    methods:{
        ...mapMutations('authStore', ['setUserData']),
        ...mapActions('authStore', ['getData'])
    },
     created(){
        var data = localStorage.getItem('dataUser');
        this.setUserData(JSON.parse(data));
        this.getData()
    }
}
</script>
<style scoped>  
.nav{
    height: 7vh;
    background-color: #00241B;
    color: #65B891;
}
.pages{
    height: 93vh; 
}
</style>
