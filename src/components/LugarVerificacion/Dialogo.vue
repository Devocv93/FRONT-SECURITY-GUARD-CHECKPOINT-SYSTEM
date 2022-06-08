<template>
  <Dialog
    :style="{ width: '40vw' }"
    :modal="true"
    :header="
      method === 'CREATE'
        ? 'Crear nuevo punto de Inspeccion'
        : 'Editar punto de Inspeccion'
    "
    :visible="showDialog"
    :closable="false"
  >
    <div class="mt-2">
        <form
            @submit.prevent="
            method === 'CREATE'
                ? nuevoLugarVerificacion(lugarVerificacion)
                : editarLugarVerificacion(lugarVerificacion)
            "
            id="form-lugarverificacion"
        >
            <div class="col-lg-12 col-md-12 mb-3">
                <label class="form-label">Base</label>
                <span class="p p-fluid">
                    <Dropdown
                      :disabled="method === 'UPDATE'"
                      v-model="lugarVerificacion.id_base"
                      :options="allBases"
                      optionLabel="nombre"
                      optionValue="id"
                      placeholder="Selecciona una base"
                    />
                </span>
            </div>
            <div class="col-lg-12 col-md-12 mb-3">
                <label class="form-label">Nombre</label>
                <span class="p p-fluid">
                    <InputText 
                      id="username"
                      type="text"
                      v-model="lugarVerificacion.nombre"
                      @input="lugarVerificacion.nombre = $event.target.value.toUpperCase()"
                    />
                </span>
            </div>
            <div class="col-lg-12 col-md-12 mb-3">
                <label class="form-label">Descripcion</label>
                <span class="p p-fluid">
                    <Textarea 
                        v-model="lugarVerificacion.descripcion"
                        @input="lugarVerificacion.descripcion = $event.target.value.toUpperCase()"
                        :autoResize="true"
                        rows="5"
                        cols="120"
                    />
                </span>
            </div>
        </form>
    </div>
    <div class="d-flex justify-content-end">
        <Button
            label="Cancelar"
            class="p-button-outlined p-button-danger me-2"
            iconPos="right"
            @click="cerrarDialogo"
        />
        <Button
            type="submit"
            form="form-lugarverificacion"
            :label="method === 'CREATE' ? 'Guardar' : 'Editar'"
            class="p-button-success"
            icon="pi pi-check"
            iconPos="right"
        />
    </div>
  </Dialog>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState("lugarVerificarStore", [
      "method",
      "dialogo",
      "lugarVerificacion",
    ]),
    ...mapState("baseStore", ["allBases"]),
    showDialog() {
      return this.dialogo;
    },
  },
  methods: {
    ...mapActions("baseStore", ["getAllBases"]),
    ...mapMutations("lugarVerificarStore", ["closeDialogo"]),
    ...mapActions("lugarVerificarStore",["postLugarVerificacion", "putLugarVerificacion"]),

    cerrarDialogo() {
      this.closeDialogo();
    },
    nuevoLugarVerificacion(data) { 
        if(data.id_base === 0){
            this.$toast.add({severity:'warn', summary: 'AVISO!', detail:'Seleccione una base valida!', life: 3000});
            return;
        }
        if(data.nombre.trim() ===""){
            this.$toast.add({severity:'warn', summary: 'AVISO!', detail:'El nombre no puede ir vacio!', life: 3000});
            return;
        } 
        if(data.descripcion.trim()===""){
            this.$toast.add({severity:'warn', summary: 'AVISO!', detail:'La descripcion no puede ir vacio!', life: 3000});
            return;
        }

        data.descripcion = data.descripcion.toUpperCase();
        this.postLugarVerificacion({lugar: data, toast: this.$toast});
    },
    editarLugarVerificacion(data){
        if(data.nombre.trim() ===""){
            this.$toast.add({severity:'warn', summary: 'AVISO!', detail:'El nombre no puede ir vacio!', life: 3000});
            return;
        } 
        if(data.descripcion.trim()===""){
            this.$toast.add({severity:'warn', summary: 'AVISO!', detail:'La descripcion no puede ir vacio!', life: 3000});
            return;
        }

        data.descripcion = data.descripcion.toUpperCase();
        this.putLugarVerificacion({lugar: data, toast: this.$toast}); 
    }
  },
  mounted() {
    this.getAllBases();
  },
};
</script>

<style>
</style>