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
<creaPost/>
<div class="container mt-5">
    <div class="row g-3">
      <div v-for="post in store.posts" :key="post.id" class="col-3">
        <div class="card">
          <div class="img-container bg-light d-flex align-items-center justify-content-center">
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
</template>

<style scoped>
.img-container {
  height: 100px;

  img {
    max-height: 100%;
    max-width: 100%;
  }
}

</style>