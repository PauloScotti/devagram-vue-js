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
        ehMeuPerfil(): boolean {
            return this.usuario?._id === this.loggedId;
        },
        // `seguidores` é a lista de ids de quem segue este usuário.
        seguindo(): boolean {
            return (this.usuario?.seguidores ?? []).some((id: unknown) => String(id) === this.loggedId);
        },
        obterTextoBotaoPrincipal(): string {
            if (this.ehMeuPerfil) {
                return "Editar Perfil";
            }
            return this.seguindo ? "Deixar de seguir" : "Seguir";
        }
    },
    methods: {
        async acaoBotao() {
            if (this.ehMeuPerfil) {
                return router.push({ name: 'editar' });
            }
            try {
                await usuarioServices.toggleFollow(this.usuario?._id);

                const seguidores = this.usuario?.seguidores ?? [];
                const index = seguidores.findIndex((id: unknown) => String(id) === this.loggedId);
                if (index !== -1) {
                    seguidores.splice(index, 1);
                } else {
                    seguidores.push(this.loggedId);
                }
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
                <button :class="{principal: !seguindo}"
                    @click="acaoBotao">{{obterTextoBotaoPrincipal}}</button>
            </div>
        </div>
    </div>
</template>
    
    

<style lang="scss" src="@/assets/styles/headerPerfil.scss" />