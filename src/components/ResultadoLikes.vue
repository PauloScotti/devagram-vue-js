<script lang="ts">
    import router from '@/router';
    import { defineComponent } from 'vue';
    import Avatar from './Avatar.vue';
    import {UsuarioServices} from '../services/UsuarioServices';

    const usuarioServices = new UsuarioServices();

    export default defineComponent({
        setup() {
            return {
                loggedId: localStorage.getItem('_id')
            }
        },
    props: {
        usuario: {} as any,
        nome: String,
        email: String,
        avatar: String,
        id: String,
    },
    computed: {
            obterTextoBotaoPrincipal() {
                if (!this.usuario?.segueEsseUsuario) {
                    return "Seguir";
                }
                return "Deixar de seguir";
            }
        },
    methods: {
        irParaUsuario() {
            router.push("/usuario/" + this.id);
        },
        async acaoBotao() {
                if (this.usuario?._id === this.loggedId) {
                    return router.push({ name: 'editar' });
                }
                try {
                    await usuarioServices.toggleFollow(this.usuario?._id);
                    this.usuario.segueEsseUsuario = !this.usuario.segueEsseUsuario;
                    if(this.usuario.segueEsseUsuario){
                        this.usuario.seguidores += 1;
                    }else{
                        this.usuario.seguidores -= 1;
                    }
                } catch (e) {
                    console.log(e)
                }
            }
    },
    components: { Avatar }
});
</script>


<template>
    <div class="container-resultado-likes" @click="irParaUsuario">
        <Avatar :imagem="avatar" />
        <div class="info">
            <strong>{{nome}}</strong>
            <button :class="{principal: usuario?.segueEsseUsuario ?? false}"
                        @click="acaoBotao">{{obterTextoBotaoPrincipal}}</button>
        </div>
    </div>
        
</template>


<style lang="scss" src="@/assets/styles/resultadoLikes.scss" />