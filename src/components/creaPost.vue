<script>

export default{
    name: 'creaPost',

    data(){
        return{
            title:'',
            content:'',
            published: ['true','false'],
            img:'',
            categoryId: [{id:1, name:technology },{id:2, name:Health }],
            tags:[{id:1, name:Programming },{id:2, name:Wellness }]
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
                        categoryId: this.categoryId,
                        tags: this.tags
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
    
</form>
</template>

<style>
</style>