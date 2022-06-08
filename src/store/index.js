import { createStore } from 'vuex'

import authStore from '../modules/auth';
import { baseStore } from '../modules/base';
import { incidenciaStore } from '../modules/incidencia';
import { lugarVerificarStore } from '../modules/lugarverificacion';
import rondinStore from '../modules/rondin';
import { ReportesStore } from '../modules/reportes';

export default createStore({
    modules:{
        authStore,
        baseStore,
        lugarVerificarStore,
        rondinStore,
        incidenciaStore,
        ReportesStore
    }
});