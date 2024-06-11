<script>
import { store } from '../store';
import creaPost from '../components/creaPost.vue';
export default {
    name: 'home',

    data () {
        return {
            store,
            
        }
    },

    components: {
        creaPost,
    },
  
    methods: {
        async searchPosts(url) {
            try {
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                this.store.posts = data.posts;
               
                console.log(this.store.posts);
            } catch (err) {
                console.error('Errore durante la chiamata API', err);
                throw err;
            }
        },
    },
    created(){
        this.searchPosts(store.url);
    },
};


</script>


<template>
ciao
<creaPost/>
<div v-for="post in store.posts">
    {{ post.title }}
</div>
<!-- {{ this.posts }} -->
<div></div>
</template>

<style></style>