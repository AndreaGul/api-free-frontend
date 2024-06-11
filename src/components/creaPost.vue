<script>
import { store } from '../store';
export default{
    name: 'creaPost',

    data(){
        return{
            store,
            title:'',
            content:'',
            published: '',
            img:'',
            savedCategory:'',
            savedTags:[],
            categoryId: [{id:1, name: 'Technology' },{id:2, name: 'Health' }],
            tags:[{id:1, name: 'Programming' },{id:2, name: 'Wellness' }]
        }
    },

    methods :{
        async createPost(url) {
            try{
                
                const response = await fetch(url,{
                    method: 'POST',
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        title: this.title,
                        content: this.content,
                        published: this.published,
                        img: this.img,
                        categoryId: this.savedCategory,
                        tags: this.savedTags
                    })
                })
                if(!response.ok){
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data= await response.json();
                console.log('Post creato con successo:', data);
            }   
            catch(err){
                console.error('Errore durante la chiamata API', err);
            }
        },
    },
};

</script>

<template>
   <div>
    <!-- Button to open off-canvas -->
    <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasForm" aria-controls="offcanvasForm">
      Aggiungi un post
    </button>

    <!-- Off-canvas component -->
    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasForm" aria-labelledby="offcanvasFormLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasFormLabel">Crea Post</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <form @submit.prevent="createPost(store.url)" class="container">
          <div class="mb-3">
            <label for="title" class="form-label">Titolo:</label>
            <input type="text" id="title" v-model="title" class="form-control" required>
          </div>
          <div class="mb-3">
            <label for="content" class="form-label">Contenuto:</label>
            <textarea id="content" v-model="content" class="form-control" rows="5" required></textarea>
          </div>
          <div class="mb-3">
            <label for="published" class="form-label">Pubblicato:</label>
            <select id="published" v-model="published" class="form-select">
              <option value="true">Sì</option>
              <option value="false">No</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="img" class="form-label">Immagine:</label>
            <input type="text" id="img" v-model="img" class="form-control">
          </div>
          <div class="mb-3">
            <label for="categoryId" class="form-label">Categoria:</label>
            <select id="categoryId" v-model="savedCategory" class="form-select">
              <option :value="null">Seleziona una categoria</option>
              <option v-for="category in categoryId" :key="category.id" :value="category.id">{{ category.name }}</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="tags" class="form-label">Tag:</label>
            <div class="form-check" v-for="tag in tags" :key="tag.id">
              <input type="checkbox" :id="tag.id" :value="tag.id" v-model="savedTags" class="form-check-input">
              <label :for="tag.id" class="form-check-label">{{ tag.name }}</label>
            </div>
          </div>
          <button type="submit" class="btn btn-primary">Crea Post</button>
        </form>
      </div>
    </div>
  </div>
  </template>

<style scoped>
</style>