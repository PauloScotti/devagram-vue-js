<script lang="ts">
    import { defineComponent } from 'vue';
    import Header from '../components/Header.vue';
    import Footer from '../components/Footer.vue';
    import { FeedServices } from '../services/FeedServices';
    import Feed from '../components/Feed.vue';

    const feedServices = new FeedServices();

    export default defineComponent({
        components: { Header, Footer, Feed },
        data() {
            return {
                posts: []
            }
        },
        async mounted(){
            try{
                const resultado = await feedServices.getFeedPrincipal();
                if(resultado && resultado.data){
                    this.posts = resultado.data;
                }

            } catch(e){
                console.log(e);
            }
        }
    });
</script>


<template>
    <Header />
    <Feed :posts="posts" />
    <Footer />
</template>