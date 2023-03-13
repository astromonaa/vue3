<template>
  <div>
    <h1>Posts page</h1>
    <my-input
      v-model="searchValue"
      :placeholder="`Search...`"
      v-focus
    />

    <div class="app__btns">
      <my-button @click="showDialog">
        Create post
      </my-button>
      <my-select
        v-model="selectedSort"
        :options="sortOptions"
      />
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form
        @create="createPost"
      />
    </my-dialog>
    <post-list
      :posts="sortedAndSearchedPosts"
      @remove="removePost"
      v-if="!isPostsLoading"
    />
    <div v-else>Loading...</div>
    <div v-intersection="loadMorePosts" class="observer"></div>
  </div>
</template>

<script>
import PostForm from '@/components/PostForm.vue'
import PostList from '@/components/PostList.vue'
import axios from 'axios'

export default {
  name: 'App',
  data: () => ({
    posts: [],
    dialogVisible: false,
    isPostsLoading: false,
    selectedSort: '',
    sortOptions: [
      {value: 'title', name: 'Title'},
      {value: 'body', name: 'Body'}
    ],
    searchValue: '',
    page: 1,
    pageLimit: 10,
    totalPages: 0,
  }),
  mounted() {
    this.fetchPosts()
  },
  methods: {
    createPost(post) {
      this.posts.push(post)
      this.dialogVisible = false
    },
    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id)
    },
    showDialog() {
      this.dialogVisible = true
    },
    async fetchPosts() {
      try {
        this.isPostsLoading = true
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: { 
            _limit: this.pageLimit,
            _page: this.page
          }
        })
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.pageLimit)
        this.posts = response.data
      }catch(e) {
        console.log(e);
      }finally {
        this.isPostsLoading = false
      }
    },
    async loadMorePosts() {
      try {
        this.page += 1
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: { 
            _limit: this.pageLimit,
            _page: this.page
          }
        })
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.pageLimit)
        this.posts = [...this.posts, ...response.data]
      }catch(e) {
        console.log(e);
      }
    },
  },
  components: {
    PostForm,
    PostList
  },
  watch: {
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((a, b) => {
        return a[this.selectedSort]?.localeCompare(b[this.selectedSort])
      })
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter(el => el.title.toLowerCase().includes(this.searchValue.toLowerCase()))
    }
  }
}
</script>


<style>
  .app__btns {
    display: flex;
    justify-content: space-between;
    margin: 15px 0;
  }
  .page__wrapper {
    display: flex;
    margin-top: 15px;
  }
  .page {
    border: 1px solid #000;
    padding: 10px;
  }
  .current {
    border: 2px solid green;
  }
  .observer {
    height: 30px;
    background: green;
  }
</style>