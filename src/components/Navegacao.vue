<script lang="ts">
import router from '@/router';
import { defineComponent } from 'vue';
import imagemHomeAtivo from '../assets/imagens/homeAtivo.svg';
import imagemHomeCinza from '../assets/imagens/homeCinza.svg';
import imagemPublicacaoAtivo from '../assets/imagens/publicacaoAtivo.svg';
import imagemPublicacaoCinza from '../assets/imagens/publicacaoCinza.svg';
import imagemUsusarioAtivo from '../assets/imagens/usuarioAtivo.svg';
import imagemUsusarioCinza from '../assets/imagens/usuarioCinza.svg';

export default defineComponent({

    methods: {
        efetuarNavegacao(name: string) {
            router.push({ name });
        },
        getIcone(name: string) {
            switch (name) {
                case 'home':
                    if (router.currentRoute.value.name === 'home') {
                        return imagemHomeAtivo;
                    }
                    return imagemHomeCinza;
                case 'publicacao':
                    if (router.currentRoute.value.name === 'publicacao') {
                        return imagemPublicacaoAtivo;
                    }
                    return imagemPublicacaoCinza;
                case 'perfil':
                    if (router.currentRoute.value.name === 'perfil') {
                        return imagemUsusarioAtivo;
                    }
                    return imagemUsusarioCinza;
                default:
                    return '';
            }
        }
    }
});
</script>


<template>
    <nav class="container-navegacao">
        <ul>
            <li @click="efetuarNavegacao('home')">
                <img :src="getIcone('home')" alt="Home" class="iconeNav" />
            </li>
            <li @click="efetuarNavegacao('publicacao')">
                <img :src="getIcone('publicacao')" alt="Pubicação" class="iconeNav" />
            </li>
            <li @click="efetuarNavegacao('perfil')">
                <img :src="getIcone('perfil')" alt="Perfil" class="iconeNav" />
            </li>
        </ul>
    </nav>
</template>