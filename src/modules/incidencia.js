import axios from 'axios'
import Swal from 'sweetalert2/dist/sweetalert2.all'

import Incidencia from "../models/incidencia";
import { url } from '../helpers/url'

const incidenciaStore = {
    namespaced: true,
    state: ()=>({
        method: 'CREATE',
        dialogo: false,
        incidencia:  new Incidencia(),
        allIncidencias: [], 
    }),
    mutations:{
        openDialogo(state, {display, method}){
            state.dialogo = display;
            state.method= method;
        },
        closeDialogo(state){
            state.dialogo = false; 
            state.incidencia=  new Incidencia();
            state.method= 'CREATE';
        },
        setAllIncidencias(state, data){
            state.allIncidencias = data;
        },
        setIncidenciaById(state, data){
            state.incidencia = data
        }
    },
    actions:{
        async getIncidenciaById({commit, dispatch, state}, idIncidencia){
            try {
                const response = await axios.get(`${url}/incidencia/${idIncidencia}`);
                if(response.status === 200){ 
                    console.log(response.data.data)
                    commit('setIncidenciaById', response.data.data) 
                }
            } catch (error) {
                console.log(error);
            }
        },
        async getAllIncidencias({commit, dispatch, state}){
            try {
                const response = await axios.get(`${url}/incidencia`);
                if(response.status === 200){
                    commit('setAllIncidencias', response.data) 
                }
            } catch (error) {
                console.log(error);
            }
        },
        async postIncidencia({commit, state, dispatch}, {incidencia, toast}){
            try { 
                const response = await axios.post(`${url}/incidencia`, incidencia);
                if(response.status === 201){
                    state.dialogo = false;
                    state.incidencia = new Incidencia();
                    Swal.fire({
                        title: 'Aviso!',
                        text: response.data.msg,
                        icon: 'success',
                        confirmButtonText: 'Cerrar',
                        allowOutsideClick: false
                    });
                    dispatch('getAllIncidencias');
                }
            } catch (error) {
                console.log(error)
                if(error.response.status === 400){
                    toast.add({severity:'warn', summary: 'AVISO!', detail: error.response.data.msg, life: 3000});
                }
            }
        },
        async putIncidencia({commit, state, dispatch}, {incidencia, toast}){
            try { 
                const response = await axios.put(`${url}/incidencia/${incidencia.id}`, incidencia);
                if(response.status === 200){
                    state.dialogo = false;
                    state.incidencia = new Incidencia();
                    Swal.fire({
                        title: 'Aviso!',
                        text: response.data.msg,
                        icon: 'success',
                        confirmButtonText: 'Cerrar',
                        allowOutsideClick: false
                    });
                    dispatch('getAllIncidencias');
                }
            } catch (error) {
                console.log(error)
                if(error.response.status === 404){
                    toast.add({severity:'warn', summary: 'AVISO!', detail: error.response.data.msg, life: 3000});
                }
            }
        },
    }
}

export {
    incidenciaStore,
}