<template>
    <div class="contenido" >
      <form class="formulario" @submit.prevent="login" autocomplete="off">
          <div class="d-flex align-items-center justify-content-center align-content-center mt-5 mb-5">
            <h3 for="usuario">Bienvenido:</h3> 
          </div>
          <div class="p-4 mt-5">
              <div class="row mb-3">
                  <label for="usuario">Usuario:</label> 
                      <span class= " p-fluid"> 
                          <InputText type="email" v-model="correo" />
                      </span> 
              </div>
              <div class="row mb-5">
                  <label>Contraseña:</label>
                  <span class= " p-fluid"> 
                      <InputText type="password" v-model="password" />
                  </span> 
              </div> 
              <div class="form-group w-100">
                  <button  type="submit"  class="btn btn-outline-success w-100 mb-5">
                      Iniciar Sesión
                  </button>
              </div>
          </div>
      </form>
    </div>
</template>

<script>
import axios from 'axios'
import { mapMutations} from 'vuex'

import { url } from '../helpers/url'

export default {
    data: ()=>({
        pathImage: '',
        correo:"",
        password:"",
    }),
    methods:{ 
        ...mapMutations('authStore', ['setUserData']),

        async login(){
            try {
                if(this.correo.trim()===""){
                    this.$toast.add({severity:'warn', summary: 'AVISO', detail:'Ingrese un email valido!', life: 3000});
                    return
                }
                if(this.password.trim()===""){
                    this.$toast.add({severity:'warn', summary: 'AVISO', detail:'Ingrese un password valido!', life: 3000});
                    return
                }

                const response = await axios.get(`${url}/usuario/login/${this.correo}/${this.password}`); 
                if(response.status === 200){
                  const acceso = response.data.data.usuario.permisos.find(p => p === "01" || p==="ALL_ACCESS");
                    if(acceso){
                        this.setUserData(response.data.data.usuario);
                        localStorage.setItem('dataUser', JSON.stringify(response.data.data.usuario));
                        this.$router.push('/')
                    }else{
                        this.$toast.add({severity:'warn', summary: 'AVISO', detail:'No tiene permiso para acceder al sistema!', life: 3000});
                    }
                }

            } catch (error) { 
                console.log(error);  
                if( error.response !== undefined){
                    if(error.response.status === 404){
                        this.$toast.add({severity:'warn', summary: 'AVISO', detail: error.response.data.error, life: 3000});
                    }
                }
            }
        }
    },
    mounted(){
        if (localStorage.getItem('dataUser')) {
            this.$router.push('/');
        }else{
            this.$router.push('/login');
        }
    }


}
</script>

<style scoped>
    .contenido{
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh; 
    }
    .formulario {
        width: 500px;
        font-family: 'Poppins', sans-serif;
        font-weight:600;
         box-shadow: 0px 15px 15px #4E878C;  
         
    }
    img{ 
        width: 100%;
        height: 50%;
        object-fit: contain;
    }
</style>
