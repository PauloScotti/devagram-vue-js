<script lang="ts">
    import { defineComponent } from 'vue';
    import Navegacao from './Navegacao.vue';
    import { UsuarioServices } from '@/services/UsuarioServices';
import ResultadoBusca from './ResultadoBusca.vue';

    const usuarioServices = new UsuarioServices();

    export default defineComponent({
    data() {
        return {
            resultado: [] as any,
            inputFocus: false,
            pesquisa : '',
        };
    },
    methods: {
        setFocus(v: boolean) {
            this.inputFocus = v;
        },
        async buscarUsuarios(e : any) {
            try{
                if(!e?.target?.value){
                    this.resultado = [];
                    this.pesquisa = '';
                    return;
                }

                this.pesquisa = e?.target?.value;
                if(!this.pesquisa || this.pesquisa.trim().length < 2){
                    return;
                }

                const resposta = await usuarioServices.pesquisar(this.pesquisa);
                if(resposta && resposta.data){
                    this.resultado = resposta.data;
                }

            } catch(e){
                console.log(e)
            }
        }
    },
    components: { Navegacao, ResultadoBusca }
    });
</script>


<template>
    <header class="container-header">
        <div class="principal">
            <img src="../assets/imagens/logoHorizontal.svg" alt="Logo Devagram" />
            <div class="group">
                <div class="pesquisa" :class="{focus:inputFocus}">
                    <img src="../assets/imagens/lupa.svg" alt="Pesquisa" layout="fill" class="icon" />
                    <input type="text" placeholder="Pesquisar" 
                    :value="pesquisa" @input="buscarUsuarios"
                        @focus="setFocus(true)" @blur="setFocus(false)" />
                </div>

                <Navegacao />
            </div>
        </div>
        <div class="resultado" v-if="resultado.length > 0">
            <ResultadoBusca v-for="user in resultado"
                :key="user._id"
                :id="user._id"
                :nome="user.nome"
                :email="user.email"
                :avatar="user.avatar"
            />
        </div>
    </header>
</template>


<style lang="scss" src="@/assets/styles/header.scss" />