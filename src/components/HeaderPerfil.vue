<script lang="ts">
    import { defineComponent } from 'vue';
    import HeaderAcoes from './HeaderAcoes.vue';

    export default defineComponent({
        props:{
            usuario: {} as any,
            title: String,
            showLeft: Boolean,
            isLeftIcon: Boolean,
            showRight: Boolean,
            isRightIcon: Boolean,
        },
        components: { HeaderAcoes }
    });
</script>


<template>
    <div class="container-header-perfil">
        <HeaderAcoes 
            :title="title"
            :show-left="showLeft"
            :isLeftIcon="isLeftIcon"
            :showRight="showRight"
        />
    </div>
        
</template>


<style lang="scss" src="@/assets/styles/headerPerfil.scss" />