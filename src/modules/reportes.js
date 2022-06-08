import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2.all' 
import moment from 'moment';
 
import { url } from '../helpers/url'

const ReportesStore = {
    namespaced: true,
    state:()=>({
        rondinesHechos: [],
        users: []
    }),
    mutations:{
        setRondinesHechos(state, data){
            state.rondinesHechos = data
        },
        setUsers(state, data){
            state.users = data;
        }
    },
    actions:{
        async getAllRondinesHecho({commit, dispatch}, data){
            try {
                const response = await axios.get(`${url}/rondinhecho/all/${data.finicio}/${data.ffin}`);
                if(response.status === 200){ 
                    const rondines = response.data.map(r => {
                        let rondin = {...r};
                        rondin.createdAt = moment(rondin.createdAt).format("DD-MM-YYYY");
                        return rondin;
                    })
                    commit('setRondinesHechos', rondines); 
                }
            } catch (error) {
                console.log(error);
            }
        },
        async getAllRondinesHechoByRuta({commit, dispatch}, data){
            try {
                const response = await axios.get(`${url}/rondinhecho/bybase/${data.finicio}/${data.ffin}/${data.base}`);
                if(response.status === 200){ 
                    const rondines = response.data.map(r => {
                        let rondin = {...r};
                        rondin.createdAt = moment(rondin.createdAt).format("DD-MM-YYYY");
                        return rondin;
                    })
                    commit('setRondinesHechos', rondines);  
                }
            } catch (error) {
                console.log(error);
            }
        },
        async getAllUsuariosByBase({commit, dispatch}, idBase){
            try {
                const response = await axios.get(`${url}/usuario/all/bybase/${idBase}`);
                if(response.status === 200){  
                    commit('setUsers', response.data); 
                }
            } catch (error) {
                console.log(error);
            }
        },
        
    }

}

export {
    ReportesStore
}