<script lang="ts">
    import { defineComponent } from 'vue';
    import InputPublico from '../components/InputPublico.vue';
    import envelope from '../assets/imagens/envelope.svg';
    import chave from '../assets/imagens/chave.svg';

    export default defineComponent({
        setup(){
            return {
                envelope,
                chave
            }
        },
        data() {
            return {
                login: "",
                senha: "",
                loading: false,
                erro: ""
            };
        },
        methods: {
            efetuarLogin() {
                if (!this.login && !this.senha) {
                    this.erro = "Favor preencher o formulários";
                    return;
                }
                alert("Login efetuado: " + this.login + ", " + this.senha);
            },
            setLogin(v: any){
                this.login = v;
            },
            setSenha(v: any){
                this.senha = v;
            }
        },
        components: { InputPublico }
});
</script>

<template>
    <div class="container-publico">
        <img src="../assets/imagens/logo.svg" alt="Logo Devagram" class="logo"/>
        <form action="">
            <p v-if="erro" class="error">{{erro}}</p>
            <InputPublico 
                :icone="envelope"
                alt="Insira o login"
                tipo="text"
                placeholder="Email"
                :modelValue="login" @setInput="setLogin"
            />
            <InputPublico 
                :icone="chave"
                alt="Insira a senha"
                tipo="password"
                placeholder="Senha"
                :modelValue="senha" @setInput="setSenha"
            />
            <button @click.enter.prevent="efetuarLogin">
                Login
            </button>
            <div class="link">
                <p>Não possui uma conta?</p>
                <a href="">Faça seu cadastro agora!</a>
            </div>
        </form>
    </div>
</template>

<style lang="scss" src="@/assets/styles/paginaPublica.scss" />