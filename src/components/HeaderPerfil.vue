<script lang="ts">
import { defineComponent } from 'vue'
import HeaderAcoes from './HeaderAcoes.vue'
import Avatar from './Avatar.vue'
import router from '@/router';
import { UsuarioServices } from '../services/UsuarioServices';
const usuarioServices = new UsuarioServices();
export default defineComponent({
    setup() {
        return {
            loggedId: localStorage.getItem('_id')
        }
    },
    data() {
        return {
            seguindo: false
        }
    },
    props: {
        usuario: {} as any,
        title: String,
        showLeft: Boolean,
        isLeftIcon: Boolean,
        showRight: Boolean,
        isRightIcon: Boolean,
    },
    components: { HeaderAcoes, Avatar },
    computed: {
        obterTextoBotaoPrincipal() {
            this.seguindo = this.usuario?.seguidores == this.loggedId;
            if (this.usuario?._id === this.loggedId) {
                return "Editar Perfil";
            } else if (!this.seguindo) {
                return "Seguir";
            }
            return "Deixar de seguir";
        }
    },
    methods: {
        async acaoBotao() {
            if (this.usuario?._id === this.loggedId) {
                return router.push({ name: 'editar' });
            }
            try {
                await usuarioServices.toggleFollow(this.usuario?._id);

                const index = this.usuario?.seguidores?.findIndex((e: String) => e === this.loggedId);
                if (index != -1) {
                    this.usuario?.seguidores?.splice(index, 1);
                } else {
                    this.usuario?.seguidores?.push(this.loggedId);
                }

                // this.seguindo = !this.seguindo;
                // console.log(this.seguindo); 
                // if(!this.seguindo){
                //     this.usuario.seguidores++;
                // }else{
                //     this.usuario.seguidores--;
                // }
            } catch (e) {
                console.log(e)
            }
        }
    }
});
</script>
<template>
    <div class="container-header-perfil">
        <HeaderAcoes :title="title" :showLeft="showLeft" :isLeftIcon="isLeftIcon" :showRight="showRight"
            :isRightIcon="isRightIcon" />

        <div class="perfil">
            <Avatar :imagem="usuario?.avatar" />
            <div class="infos">
                <div class="dados">
                    <div class="status">
                        <strong>{{usuario?.publicacoes}}</strong>
                        <span>Publicações</span>
                    </div>
                    <div class="status">
                        <strong>{{usuario?.seguidores?.length}}</strong>
                        <span>Seguidores</span>
                    </div>
                    <div class="status">
                        <strong>{{usuario?.seguindo?.length}}</strong>
                        <span>Seguindo</span>
                    </div>
                </div>
                <button :class="{principal: !seguindo ?? false}"
                    @click="acaoBotao">{{obterTextoBotaoPrincipal}}</button>
            </div>
        </div>
    </div>
</template>
    
    

<style lang="scss" src="@/assets/styles/headerPerfil.scss" />