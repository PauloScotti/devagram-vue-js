<script lang="ts">
import { defineComponent } from 'vue';
import InputPublico from '../components/InputPublico.vue';
import envelope from '../assets/imagens/envelope.svg';
import chave from '../assets/imagens/chave.svg';
import iconeUsuario from '../assets/imagens/usuarioAtivo.svg';
import avatar from '../assets/imagens/avatar.svg';
import InputImagem from '../components/InputImagem.vue';
import { CadastroServices } from '../services/CadastroServices';
import router from '../router';

const cadastroServices = new CadastroServices();

export default defineComponent({
    setup() {
        return {
            envelope,
            chave,
            iconeUsuario,
            avatar,
            cadastroServices
        }
    },
    data() {
        return {
            nome: "",
            email: "",
            senha: "",
            confirmacao: "",
            loading: false,
            erro: "",
            imagem: {} as any
        };
    },
    methods: {
        async cadastrar() {
            try {
                this.erro = "";
                if(!this.nome || !this.nome.trim() || 
                !this.email || !this.email.trim() ||
                !this.senha || !this.senha.trim() ||
                !this.confirmacao || !this.confirmacao.trim()) {
                    return this.erro = "Favor preencher todo o formulário";
                }

                if(this.senha !== this.confirmacao){
                    return this.erro = "Senha e confirmação não são iguais";
                }

                this.loading = true;

                const formDataRequisicao = new FormData();

                formDataRequisicao.append('nome', this.nome);
                formDataRequisicao.append('email', this.email);
                formDataRequisicao.append('senha', this.senha);
                if(this.imagem.arquivo){
                    formDataRequisicao.append('file', this.imagem.arquivo);
                }
                await cadastroServices.cadastrar(formDataRequisicao);
                router.push({name : 'login', query:{cadastroComSucesso: 'true'}});

            } catch (e : any) {
                console.log(e);
                if(e?.response?.data?.erro){
                    this.erro = e?.response?.data?.erro;
                }else{
                    this.erro = 'Não foi possível cadastrar o usuário, tente novamente!';
                }
            }
            this.loading = false;
        },
        setNome(v: any) {
            this.nome = v;
        },
        setEmail(v: any) {
            this.email = v;
        },
        setSenha(v: any) {
            this.senha = v;
        },
        setConfirmacao(v: any) {
            this.confirmacao = v;
        },
        setImagem(v: any) {
            this.imagem = v;
        }
    },
    computed: {
        buttonText() {
            return this.loading ? '... Carregando' : 'Cadastrar';
        }
    },
    components: { InputPublico, InputImagem }
});
</script>

<template>
    <div :class="['container-publico', 'cadastro']">
        <img src="../assets/imagens/logo.svg" alt="Logo Devagram" class="logo" />
        <form>
            <InputImagem 
            :imagem="imagem"
                alt="Imagem do Usuário"
                @setImagem="setImagem"
            />

            <p v-if="erro" class="error">{{erro}}</p>
            <InputPublico :icone="iconeUsuario" alt="Insira o nome do usuário" tipo="text" placeholder="Nome Completo" :modelValue="nome"
                @setInput="setNome" />
            <InputPublico :icone="envelope" alt="Insira o Email" tipo="text" placeholder="Email" :modelValue="email"
                @setInput="setEmail" />
            <InputPublico :icone="chave" alt="Insira a senha" tipo="password" placeholder="Senha" :modelValue="senha"
                @setInput="setSenha" />
            <InputPublico :icone="chave" alt="Confirme a senha" tipo="password" placeholder="Confirmar Senha" :modelValue="confirmacao"
                @setInput="setConfirmacao" />
            <button @click.enter.prevent="cadastrar"
                :disabled="loading">{{buttonText}}
            </button>
            <div class="link">
                <p>Já possui uma conta?</p>
                <RouterLink :to="{name : 'login'}">Faça seu login agora!</RouterLink>
            </div>
        </form>
    </div>
</template>



<style lang="scss" src="@/assets/styles/paginaPublica.scss" />