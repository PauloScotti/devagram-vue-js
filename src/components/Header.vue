<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        data(){
            return {
                resultado : [],
                inputFocus: false
            }
        },
        methods : {
            setFocus(v : boolean){
                this.inputFocus = v;
            }
        }
    });
</script>


<template>
    <header class="container-header">
        <div class="principal">
            <img src="../assets/imagens/logoHorizontal.svg" alt="Logo Devagram" />
            <div class="group">
                <div class="pesquisa" :class="{focus:inputFocus}">
                    <img src="../assets/imagens/lupa.svg" alt="Pesquisa" layout="fill" class="icon" />
                    <input type="text" placeholder="Pesquisar" @focus="setFocus(true)" @blur="setFocus(false)" />
                </div>

            </div>
        </div>
        <div class="resultado" v-if="resultado.length > 0">
            
        </div>
    </header>
</template>


<style lang="scss" src="@/assets/styles/header.scss" />