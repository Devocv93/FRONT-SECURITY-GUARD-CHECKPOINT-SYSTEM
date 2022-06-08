import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';

import App from './App.vue'
import router from './router'
import store from './store';

//import bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'

import "primevue/resources/themes/saga-green/theme.css"      //theme
import "primevue/resources/primevue.min.css"                //core css
import "primeicons/primeicons.css"
 

//Components PrimeVue
import Menubar from 'primevue/menubar';
import Dialog from 'primevue/dialog';
import Panel from 'primevue/panel';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import MultiSelect from 'primevue/multiselect';
import FileUpload from 'primevue/fileupload';
import InputSwitch from 'primevue/inputswitch';
import Textarea from 'primevue/textarea';
import CascadeSelect from 'primevue/cascadeselect';
import ProgressSpinner from 'primevue/progressspinner';
import RadioButton from 'primevue/radiobutton';
import InputText from 'primevue/inputtext'
import AutoComplete from 'primevue/autocomplete';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Card from 'primevue/card';
import Tree from 'primevue/tree';
import InputMask from 'primevue/inputmask';
import Row from 'primevue/row'; 
import InputNumber from 'primevue/inputnumber';
import Calendar from 'primevue/calendar';
import ProgressBar from 'primevue/progressbar';
import Message from 'primevue/message';  
import Dropdown from 'primevue/dropdown';
import Toast from 'primevue/toast';
import Image from 'primevue/image'; 

const app = createApp(App)

// use component of primeVue
app.component('Calendar', Calendar);
app.component('Menubar', Menubar);
app.component('Tree', Tree);
app.component('Dialog', Dialog);
app.component('Panel', Panel);
app.component('Button', Button);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('Row', Row);
app.component('ColumnGroup', ColumnGroup);
app.component('MultiSelect', MultiSelect);
app.component('FileUpload', FileUpload);
app.component('InputSwitch', InputSwitch);
app.component('Textarea', Textarea);
app.component('CascadeSelect', CascadeSelect)
app.component('ProgressSpinner', ProgressSpinner)
app.component('InputText',InputText)
app.component('InputNumber',InputNumber)
app.component('RadioButton',RadioButton)
app.component('AutoComplete',AutoComplete)
app.component('TabView',TabView)
app.component('TabPanel',TabPanel)
app.component('Card', Card)
app.component('InputMask', InputMask)
app.component('ProgressBar', ProgressBar)
app.component('Message', Message)
app.component('Dropdown', Dropdown)
app.component('Toast', Toast)
app.component('Image', Image)


app.use(ToastService);
app.use(router)
app.use(PrimeVue);
app.use(store)
app.mount('#app')
