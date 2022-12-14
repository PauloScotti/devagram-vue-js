<script lang="ts">
    import { defineComponent } from 'vue';
    import Avatar from './Avatar.vue';

    import imgCurtir from '../assets/imagens/curtir.svg';
    import imgCurtiu from '../assets/imagens/curtido.svg';
    import imgComentarioCinza from '../assets/imagens/comentarioCinza.svg';
    import imgComentarioAtivo from '../assets/imagens/comentarioAtivo.svg';
    import { FeedServices } from '@/services/FeedServices';
    import router from '@/router';
    import { UsuarioServices } from '@/services/UsuarioServices';
    import ResultadoLikes from './ResultadoLikes.vue';

    const usuarioServices = new UsuarioServices();

    const feedServices = new FeedServices();
    const MAX_DESCRICAO = 90;

    export default defineComponent({
    setup(){
        return {
            loggedUserId : localStorage.getItem('_id'),
            loggedAvatar : localStorage.getItem('avatar') ?? "",
            loggedName : localStorage.getItem('nome') ?? "",
            MAX_DESCRICAO
        }
    },
    props: {
        post: null
    },
    data(){
        return {
            showComentario : false,
            comentarioMsg : '',
            showDescricaoFull : false,
            pesquisa : '',
            resultado: [] as any,
        }
    },
    methods: {
        navegarParaPerfil() {
            router.push("/usuario/" + this.post?.idUsuario);
        },
        async toggleCurtir(){
            try{
                await feedServices.toggleCurtir(this.post._id);
                const index = this.post?.likes?.findIndex((e:String) => e === this.loggedUserId);
                if(index != -1){
                    this.post?.likes?.splice(index, 1);
                } else {
                    this.post?.likes?.push(this.loggedUserId);
                }
            } catch(e){
                console.log(e);
            }
        },
        toggleComentario(){
            this.showComentario = !this.showComentario;
        },
        async enviarComentario(){
            try{
                if(!this.comentarioMsg || !this.comentarioMsg.trim()){
                    return;
                }

                await feedServices.enviarComentario(this.post?._id, this.comentarioMsg);

                this.post?.comentarios?.push({
                    usuarioId : this.loggedUserId,
                    nome : this.loggedName,
                    comentario : this.comentarioMsg
                });

                this.comentarioMsg = '';
                this.showComentario = false;

            }catch(e){
                console.log(e);
            }
        },
        toggleDescricaoFull(){
            this.showDescricaoFull = !this.showDescricaoFull;
        },
        async buscarUsuarios(e : any) {
            try{
                for(let i = 0; i < this.post?.likes?.length; i++){
                    const resposta = await usuarioServices.buscarDadosPorId(this.post.likes[i]);
                    if(resposta && resposta.data){
                        this.resultado.push(resposta.data);
                    }
                }
            } catch(e){
                console.log(e)
            }
        }
    },
    components: { Avatar, ResultadoLikes },
    computed: {
        obterIconeCurtir(){
            if(this.post?.likes && this.post?.likes.findIndex((e : String) => e === this.loggedUserId) != -1){
                return imgCurtiu
            }
            return imgCurtir
        },
        obterIconeComentario(){
            return this.showComentario ? imgComentarioAtivo : imgComentarioCinza;
        },
        exibirDescricao(){
            if(this.showDescricaoFull){
                return this.post?.descricao
            }
            return this.post?.descricao?.length > MAX_DESCRICAO ? this.post?.descricao?.substring(0, MAX_DESCRICAO) + '...' : this.post?.descricao;
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
            <img :src="post?.foto" alt="Imagem da publica????o">
        </div>

        <div class="rodape">
            <div class="acoes">
                <img :src="obterIconeCurtir" alt="Icone curtir" class="feedIcone" @click="toggleCurtir" />
                <img :src="obterIconeComentario" alt="Icone comentar" class="feedIcone" @click="toggleComentario" />
                <span class="curtidas" @click="buscarUsuarios">
                    Curtido por <strong>{{post?.likes?.length}}</strong> pessoa{{post?.likes?.length != 1 ? 's' : ''}}
                </span>
            </div>

            <div class="descricao">
                <strong>{{post?.usuario?.nome}}</strong>
                <p>
                    {{exibirDescricao}}
                    <span v-if="post?.descricao.length > MAX_DESCRICAO && !showDescricaoFull"
                        @click="toggleDescricaoFull" class="mais">
                        mais
                    </span>
                </p>
            </div>
            <div class="resultado" v-if="resultado.length > 0">
            <ResultadoLikes v-for="user in resultado"
                :key="user._id"
                :id="user._id"
                :nome="user.nome"
                :avatar="user.avatar"
            />
        </div>

            <div class="comentarios">
                <div v-for="(comentario, index) in post?.comentarios" :key="index">
                    <strong>{{comentario.nome}}</strong>
                    <p>{{comentario.comentario}}</p>
                </div>
            </div>
        </div>

        <div class="container-comentario" v-if="showComentario">
            <Avatar alt="Imagem do usu??rio logado" :imagem="loggedAvatar" />
            <input type="text" v-model="comentarioMsg" placeholder="Adicione um coment??rio..." @keyup.enter="enviarComentario" />
            <button type="button" @click="enviarComentario">
                Publicar
            </button>
        </div>
    </div>
</template>


<style lang="scss" src="@/assets/styles/postagem.scss" />