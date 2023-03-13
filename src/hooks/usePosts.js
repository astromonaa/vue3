import { onMounted, ref } from "vue"
import axios from 'axios'

export default function usePosts(pageLimit) {
  const posts = ref([])
  const totalPages = ref(0)
  const isPostsLoading = ref(true)

  const fetching = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
        params: { 
          _limit: pageLimit,
          _page: 1
        }
      })
      totalPages.value = Math.ceil(response.headers['x-total-count'] / pageLimit)
      posts.value = response.data
    }catch(e) {
      console.log(e);
    }finally {
      isPostsLoading.value = false
    }
  }
  onMounted(fetching)
  return {
    posts, isPostsLoading, totalPages
  }
}