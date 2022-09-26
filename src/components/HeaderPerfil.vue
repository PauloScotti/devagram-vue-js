<script lang="ts">
import { defineComponent } from 'vue';
import HeaderAcoes from './HeaderAcoes.vue';
import Avatar from './Avatar.vue';

export default defineComponent({
    props: {
        usuario: {} as any,
        title: String,
        showLeft: Boolean,
        isLeftIcon: Boolean,
        showRight: Boolean,
        isRightIcon: Boolean,
    },
    components: { HeaderAcoes, Avatar }
});
</script>


<template>
    <div class="container-header-perfil">
        <HeaderAcoes :title="title" :show-left="showLeft" :isLeftIcon="isLeftIcon" :showRight="showRight" />

        <div class="perfil">
            <Avatar :imagem="usuario?.avatar" />

            <div class="infos">
                <div class="dados">
                    <div class="status">
                        <strong>{{usuario?.publicacoes}}</strong>
                        <span>Publicações</span>
                    </div>
                    <div class="status">
                        <strong>{{usuario?.seguidores}}</strong>
                        <span>Seguidores</span>
                    </div>
                    <div class="status">
                        <strong>{{usuario?.seguindo}}</strong>
                        <span>Seguindo</span>
                    </div>
                </div>

                <button>Seguir</button>
            </div>
        </div>
    </div>
</template>




<style lang="scss" src="@/assets/styles/headerPerfil.scss" />