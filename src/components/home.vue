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
    <div class="container">
        
        <h1 class="pt-3 fw-bolder title-text">Benvenuti nel mio blog</h1>
    
    <div class="crea-post text-end">
        <creaPost/>
    </div>

    <div class=" mt-5">
        <div class="row  gx-3 all-cards">
        <div v-for="post in store.posts" :key="post.id" class="col-3 my-2  ">
            <div class="card card-container">
            <div class="img-container d-flex align-items-center justify-content-center">
                <img v-if="post.img" :src="post.img" class="card-img-top " :alt="'Nessun immagine disponibile '+ post.title">
                <div v-else class="text-center text-muted">
                Nessun immagine disponibile
                </div>
            </div>
            <div class="card-body">
                <h5 class="card-title">{{ post.title }}</h5>
                <p class="card-text">{{ post.content }}</p>
            </div>
            </div>
        </div>
        </div>
    </div>
</div>
</template>

<style scoped>
.title-text{
    color: #FFFFFB;
}

.all-cards{
    border: #CAF7E2 solid 2px;
    border-radius: 1px;
    padding: 20px;
.card-container{
    border: #3D3522 solid 7px ;
    border-radius: 1px;
    .img-container {
  height: 100px;
    background-color: #CAF7E2 ;
    
  img {
    max-height: 100%;
    max-width: 100%;
  }
}
}

}



</style>