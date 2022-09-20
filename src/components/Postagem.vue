<script lang="ts">
    import { defineComponent } from 'vue';
    import Avatar from './Avatar.vue';

    import imgCurtir from '../assets/imagens/curtir.svg';
    import imgCurtiu from '../assets/imagens/curtido.svg';
    import imgComentario from '../assets/imagens/comentarioCinza.svg';

    

    export default defineComponent({
    setup(){
        return {
            loggedUserId : localStorage.getItem('_id')
        }
    },
    props: {
        post: null
    },
    methods: {
        navegarParaPerfil() {
        }
    },
    components: { Avatar },
    computed: {
        obterIconeCurtir(){
            if(this.post?.likes && this.post?.likes.findIndex((e : String) => e === this.loggedUserId) != -1){
                return imgCurtiu
            }
            return imgCurtir
        }
    }
});
</script>


<template>
    <div class="container-postagem">
        <div @click="navegarParaPerfil">
            <section class="cabecalho">
                <Avatar :imagem="post?.usuario?.avatar" />
                <strong>{{post?.usuario?.nome}}</strong>
            </section>
        </div>

        <div class="foto">
            <img :src="post?.foto" alt="Imagem da publicação">
        </div>

        <div class="rodape">
            <div class="acoes">
                <img :src="obterIconeCurtir" alt="Icone curtir">
                <img src="../assets/imagens/comentarioCinza.svg" alt="Icone comentar">
                <span class="curtidas">
                    Curtido por <strong>{{post?.likes?.lenght}}</strong> pessoa{{post?.likes?.lenght > 1 ? 's' : ''}}
                </span>
            </div>

            <div class="descricao">
                <strong>{{post?.usuario?.nome}}</strong>
                <p>
                    {{post?.descricao}}
                </p>
            </div>

            <div class="comentarios">
                <div v-for="(comentario, index) in post?.comentarios" :key="index">
                    <strong>{{comentario.nome}}</strong>
                    <p>{{comentario.comentario}}</p>
                </div>
            </div>
        </div>

        <div class="container-comentario">

        </div>
    </div>
</template>


<!-- <style lang="scss" src="@/assets/styles/feed.scss" /> -->