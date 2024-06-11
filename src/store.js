import { reactive } from "vue";

export const store = reactive({
    url: 'http://localhost:3000/posts',
    posts: [],
})