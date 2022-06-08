import axios from 'axios' 
import Swal from 'sweetalert2/dist/sweetalert2.all' 

import { url, messageInfo } from '../helpers/url'
import Base from '../models/base'  

const baseStore = {
    namespaced: true,
    state:()=>({
        method: 'CREATE',
        dialogo: false,
        base: new Base(), 
        allBases: [], 
    }),
    mutations:{
        openDialogo(state, {display, method}){
            state.dialogo = display;
            state.method= method;
        },
        closeDialogo(state){
            state.dialogo = false;
            state.base = new Base();
        },
        setAllBases(state, data){
            state.allBases = data
        },
        setBaseById(state, value){
            state.base = value;
        }
    },
    actions:{
        async addBase({commit, dispatch, state}, {data, toast}){
            try {
                const response = await axios.post(`${url}/base/post`, data);
                if(response.status === 201){
                    state.dialogo = false;
                    state.base= new Base();
                    Swal.fire({
                        title: 'Aviso!',
                        text: 'Se guardo correctamente',
                        icon: 'success',
                        confirmButtonText: 'Cerrar',
                        allowOutsideClick: false
                    });
                    dispatch('getAllBases');
                }
            } catch (error) {  
                console.log(error);
                if(error.response.status === 400){ 
                    toast.add({severity:'warn', summary: 'AVISO!', detail: error.response.data.msg, life: 3000});
                }
            }
        },
        async getAllBases({commit, dispatch}){
            try {
                const response = await axios.get(`${url}/base/getallbase`);
                if(response.status === 200){ 
                    commit('setAllBases', response.data.data);
                }
            } catch (error) {
                console.log(error);
            }
        },
        async getBaseById({commit, dispatch}, idBase){
            try {
                const response = await axios.get(`${url}/base/getbasebyid/${idBase}`);
                if(response.status === 200){
                    commit('setBaseById', response.data.data);
                }
            } catch (error) {
                console.log(error);
            }
        },
        async updateBase({commit, state,dispatch}, base){
            try {
                const response = await axios.get(`${url}/base/updatebasebyid/${base.id}/${base.nombre}`);
                if(response.status === 200){
                    state.dialogo = false;
                    state.base= new Base();
                    Swal.fire({
                        title: 'Aviso!',
                        text: 'Se actualizo correctamente',
                        icon: 'success',
                        confirmButtonText: 'Cerrar',
                        allowOutsideClick: false
                    });
                    dispatch('getAllBases');
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
}

export {
    baseStore
}