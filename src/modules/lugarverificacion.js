import axios from 'axios' 
import Swal from 'sweetalert2/dist/sweetalert2.all' 

import { url, messageInfo } from '../helpers/url'
import LugarVerificacion from '../models/lugarverificacion'

const lugarVerificarStore = {
    namespaced: true,
    state: ()=>({
        method: 'CREATE',
        dialogo: false,
        lugarVerificacion: new LugarVerificacion(),
        allLugaresVerificacion: [],
        dialogoQR: false,
        codigoQR: "",
        lugaresVerificacionByBase:[],
    }),
    mutations:{
        openDialogo(state, {display, method}){
            state.dialogo = display;
            state.method= method;
        },
        closeDialogo(state){
            state.dialogo = false;
            state.lugarVerificacion = new LugarVerificacion();
        },
        setAllLugaresVerificacion(state, data){
            state.allLugaresVerificacion = data
        },
        setCodigoQR(state, value){
            state.codigoQR = value;
        },
        openDialogoQR(state){
            state.dialogoQR = true;
        },
        closeDialogoQR(state){
            state.dialogoQR = false;
        },
        setLugarVerificacion(state, data){
            state.lugarVerificacion = data;
        },
        setLugaresVerificacionByBase(state, data){
            state.lugaresVerificacionByBase = data
        },
        resetLugaresVerificacionByBase(state){
            state.lugaresVerificacionByBase = []
        }
    },
    actions:{
        async getAllLugaresVerificacion({commit, dispatch}){
            try {
                const response = await axios.get(`${url}/lugarverificacion`);
                if(response.status === 200){ 
                    commit('setAllLugaresVerificacion', response.data);
                }
            } catch (error) {
                console.log(error);
            }
        },
        async getLugaresVerificacionByBase({commit, dispatch}, idBase){
            try {
                const response = await axios.get(`${url}/lugarverificacion/bybase/${idBase}`);
                if(response.status === 200){ 
                    commit('setLugaresVerificacionByBase', response.data);
                }
            } catch (error) {
                console.log(error);
            }
        },
        async getLugaresVerificacionById({commit, dispatch, state}, idLugarVerificacion){
            try {
                const response = await axios.get(`${url}/lugarverificacion/${idLugarVerificacion}`);
                if(response.status === 200){
                    commit('setLugarVerificacion', response.data.data);
                }
            } catch (error) {
                console.log(error);
            }
        },
        async postLugarVerificacion({commit, state, dispatch}, {lugar, toast}){
            try { 
                const response = await axios.post(`${url}/lugarverificacion`, lugar);
                if(response.status === 201){
                    state.dialogo = false;
                    state.lugarVerificacion = new LugarVerificacion();
                    Swal.fire({
                        title: 'Aviso!',
                        text: response.data.msg,
                        icon: 'success',
                        confirmButtonText: 'Cerrar',
                        allowOutsideClick: false
                    });
                    dispatch('getAllLugaresVerificacion');
                }
            } catch (error) {
                console.log(error)
                if(error.response.status === 400){
                    toast.add({severity:'warn', summary: 'AVISO!', detail: error.response.data.msg, life: 3000});
                }
            }
        },
        async getCodigoQR({commit, dispatch, state}, idLugarVerificacion){
            try {
                const response = await axios.get(`${url}/lugarverificacion/codigoqr/${idLugarVerificacion}`);
                if(response.status === 200){
                    commit('setCodigoQR', response.data.codigoqr);
                }
            } catch (error) {
                console.log(error);
            }
        },
        async putLugarVerificacion({commit, state, dispatch}, {lugar, toast}){
            try { 
                const response = await axios.put(`${url}/lugarverificacion/${lugar.id}`, lugar);
                if(response.status === 200){
                    state.dialogo = false;
                    state.lugarVerificacion = new LugarVerificacion();
                    Swal.fire({
                        title: 'Aviso!',
                        text: response.data.msg,
                        icon: 'success',
                        confirmButtonText: 'Cerrar',
                        allowOutsideClick: false
                    });
                    dispatch('getAllLugaresVerificacion');
                }
            } catch (error) {
                console.log(error)
                if(error.response.status === 404){
                    toast.add({severity:'warn', summary: 'AVISO!', detail: error.response.data.msg, life: 3000});
                }
            }
        },
        async deleteLugarVerificacion({commit, state, dispatch}, {id, toast}){
            try { 
                const result = await Swal.fire({
                    title: '¿Estas seguro de eliminar?',
                    text: "¡No podrás revertir esto!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#29A22E',
                    cancelButtonColor: '#d33',
                    confirmButtonText: '!Sí, elimínar!'
                });
                if (result.isConfirmed) {
                    const response = await axios.delete(`${url}/lugarverificacion/${id}`);
                    if(response.status === 200){ 
                        state.lugarVerificacion = new LugarVerificacion();
                        Swal.fire({
                            title: 'Aviso!',
                            text: response.data.msg,
                            icon: 'success',
                            confirmButtonText: 'Cerrar',
                            allowOutsideClick: false
                        });
                        dispatch('getAllLugaresVerificacion');
                    }
                }
            } catch (error) {
                console.log(error)
                if(error.response.status === 400){
                    toast.add({severity:'warn', summary: 'AVISO!', detail: error.response.data.msg, life: 3000});
                }
            }
        },
    }
}

export {
    lugarVerificarStore,
}