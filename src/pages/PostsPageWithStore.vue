<template>
  <div>
    <h1>Posts page</h1>
    <my-input
      :model-value="searchValue"
      @update:model-value="setSearchValue"
      :placeholder="`Search...`"
      v-focus
    />

    <div class="app__btns">
      <my-button @click="showDialog">
        Create post
      </my-button>
      <my-select
        :model-value="selectedSort"
        @update:model-value="setSelectedSort"
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
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
export default {
  name: 'App',
  data: () => ({
    dialogVisible: false,
  }),
  mounted() {
    this.fetchPosts()
  },
  methods: {
    ...mapMutations({
      setPage: 'post/setPage',
      setSearchValue: 'post/setSearchValue',
      setSelectedSort: 'post/setSelectedSort'
    }),
    ...mapActions({
      loadMorePosts: 'post/loadMorePosts',
      fetchPosts: 'post/fetchPosts'
    }),
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
    
  },
  components: {
    PostForm,
    PostList
  },
  computed: {
    ...mapState({
      posts: state => state.post.posts,
      isPostsLoading: state => state.post.isPostsLoading,
      selectedSort: state => state.post.selectedSort,
      sortOptions: state => state.post.sortOptions,
      searchValue: state => state.post.searchValue,
      page: state => state.post.page,
      pageLimit: state => state.post.pageLimit,
      totalPages: state => state.post.totalPages,
    }),
    ...mapGetters({
      sortedPosts: 'post/sortedPosts',
      sortedAndSearchedPosts: 'post/sortedAndSearchedPosts'
    })
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