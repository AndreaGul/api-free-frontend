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
<form @submit.prevent="createPost(store.url)">
    <div>
            <label for="title">Titolo:</label>
            <input type="text" id="title" v-model="title" required>
        </div>
        <div>
            <label for="content">Contenuto:</label>
            <textarea id="content" v-model="content" required></textarea>
        </div>
        <div>
            <label for="published">Pubblicato:</label>
            <select id="published" v-model="published">
                <option value="true">Sì</option>
                <option value="false">No</option>
            </select>
        </div>
        <div>
            <label for="img">Immagine:</label>
            <input type="text" id="img" v-model="img">
        </div>
        <div>
            <label for="categoryId">Categoria:</label>
            <select id="categoryId" v-model="savedCategory">
                <option :value="null">Seleziona una categoria</option>
                <option v-for="category in categoryId" :key="category.id" :value="category.id">{{ category.name }}</option>
            </select>
        </div>
        <div>
            <label for="tags">Tag:</label>
            <div v-for="tag in tags">
                <input type="checkbox" :id="tag.id" :value="tag.id" v-model="savedTags">
                <label :for="tag.id">{{ tag.name }}</label>
            </div>
        </div>  
        <button type="submit">Crea Post</button>
</form>
</template>

<style>
</style>