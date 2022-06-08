import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2.all' 

import Rondin from '../models/rondin'
import { url } from '../helpers/url'

const rondinStore = {
    namespaced: true,
    state:()=>({
        method: 'CREATE',
        dialogo: false,
        rondin: new Rondin(),
        rutasRondin: [],
        allRondines: [],
        rondinByBase: []
        
    }),
    mutations:{
        openDialogo(state, {display, method}){
            state.dialogo = display;
            state.method= method;
        },
        closeDialogo(state){
            state.dialogo = false;
            state.rondin = new Rondin();
            state.rutasRondin = [];
        },
        addRutaRondin(state, data){
            state.rutasRondin.push(data)
        },
        setNewValueRutasRondin(state, {index, value}){
            state.rutasRondin[index].orden = value; 
        },
        ordenarRutasRondin(state){
            state.rutasRondin.sort((a, b) => {
                if (a.orden > b.orden) return 1;
                if (a.orden < b.orden) return -1;
                return 0;
            });
        },
        deleteRutaRondin(state, id){
            let filters = state.rutasRondin.filter(ruta => ruta.id !== id);
            
            for (let index = 0; index < filters.length; index++) {
                filters[index].orden = index +1;
            }

            filters.sort((a, b) => {
                if (a.orden > b.orden) return 1;
                if (a.orden < b.orden) return -1;
                return 0;
            });

            state.rutasRondin = filters;
        },
        setAllRondines(state, data){
            state.allRondines = data;
        },
        setRondin(state, data){
            state.rondin = data
        },
        setRutasRondin(state, data){
            state.rutasRondin = data
        },
        setRondinesByBase(state, data){
            state.rondinByBase = data;
        }
    },
    actions:{
        async getAllRutasRondinesByRondin({commit, dispatch, state}, idRondin){
            try {
                const response = await axios.get(`${url}/rondin/${idRondin}/rutasrondin`);
                if(response.status === 200){ 
                    commit('setRutasRondin', response.data);
                    commit('ordenarRutasRondin'); 
                }
            } catch (error) {
                console.log(error);
            }
        },
        async getAllRondines({commit, dispatch, state}){
            try {
                const response = await axios.get(`${url}/rondin`);
                if(response.status === 200){
                    commit('setAllRondines', response.data.rondins) 
                }
            } catch (error) {
                console.log(error);
            }
        },
        async postNewRondin({commit, dispatch, state}, data){
            try {
                const response = await axios.post(`${url}/rondin`, data);
                if(response.status === 201){
                    const rondinId = response.data.idRondin;

                    for (const ruta of state.rutasRondin) {
                        const dataRuta = { rondinId, orden: ruta.orden, lugarverificacionId: ruta.id };
                        await axios.post(`${url}/rutasrondin`, dataRuta);
                    }
                    state.dialogo = false;
                    state.rondin = new Rondin();
                    state.rutasRondin =[];
                    state.method = 'CREATE'
                    Swal.fire({
                        title: 'Aviso!',
                        text: 'Se creo correctamente!',
                        icon: 'success',
                        confirmButtonText: 'Cerrar',
                        allowOutsideClick: false
                    });
                    dispatch('getAllRondines');
                } 
            } catch (error) {
                console.log(error);
            }
        },
        async getRondinById({commit, dispatch, state}, idRondin){
            try {
                const response = await axios.get(`${url}/rondin/byid/${idRondin}`);
                if(response.status === 200){
                    commit('setRondin', response.data.data) 
                } 
            } catch (error) {
                console.log(error);
            }
        },
        async putRondin({commit, dispatch, state}, data){
            try {
                const response = await axios.put(`${url}/rondin/${data.id}`, data);
                if(response.status === 200){ 
                    //DETECTA SI HAY NUEVOS ITEMS AGREGADOS
                    for (const ruta of state.rutasRondin) {
                        if(ruta.idLugarVe){
                            const dataRuta = { id: ruta.idLugarVe, orden: ruta.orden };
                            await axios.put(`${url}/rutasrondin`, dataRuta);
                        }else{
                            const dataRuta = { rondinId: data.id, orden: ruta.orden, lugarverificacionId: ruta.id };
                            await axios.post(`${url}/rutasrondin`, dataRuta);
                        }
                    }

                    state.dialogo = false;
                    state.rondin = new Rondin();
                    state.rutasRondin =[];
                    state.method = 'CREATE'
                    Swal.fire({
                        title: 'Aviso!',
                        text: 'Se actualizo correctamente!',
                        icon: 'success',
                        confirmButtonText: 'Cerrar',
                        allowOutsideClick: false
                    });
                    dispatch('getAllRondines');
                }
            } catch (error) {
                console.log(error);
            }
        },
        async deleteRutaRondinById({commit}, {id, toast}){
            try {
                const response = await axios.delete(`${url}/rutasrondin/${id}`);
                if(response.status === 200){
                    toast.add({severity:'success', summary: 'Eliminado!', detail:' ', life: 3000});
                }
            } catch (error) {
                console.log(error);
            }
        },
        async deleteRondinById({commit, dispatch, state}, idRondin){
            try {
                const response = await Swal.fire({
                    title: '¿Estas seguro?',
                    text: "¡No podrás revertir esto!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#29A22E',
                    cancelButtonColor: '#d33',
                    confirmButtonText: '!Sí, elimínar!'
                });
                if (response.isConfirmed) { 
                    const result = await axios.delete(`${url}/rondin/${idRondin}`);
                    if(result.status === 200){
                        await axios.delete(`${url}/rutasrondin/byrondin/${idRondin}`);

                        state.dialogo = false;
                        state.rondin = new Rondin();
                        state.rutasRondin =[];
                        state.method = 'CREATE'
                        Swal.fire({
                            title: 'Aviso!',
                            text: 'Se elimino correctamente!',
                            icon: 'success',
                            confirmButtonText: 'Cerrar',
                            allowOutsideClick: false
                        });
                        dispatch('getAllRondines');
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },
        async getAllRondinesByBase({commit, dispatch}, idBase){
            try {
                const response = await axios.get(`${url}/rondin/bybase/${idBase}`);
                if(response.status === 200){ 
                    commit('setRondinesByBase', response.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
}

export default rondinStore;