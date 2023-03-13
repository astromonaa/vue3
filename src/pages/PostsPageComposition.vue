<template>
  <div>
    <h1>Posts page</h1>
    <my-input
      v-model="searchValue"
      :placeholder="`Search...`"
      v-focus
    />

    <div class="app__btns">
      <my-button>
        Create post
      </my-button>
      <my-select
        v-model="selectedSort"
        :options="sortOptions"
      />
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form
      />
    </my-dialog>
    <post-list
      :posts="sortedAndSearchedPosts"
      v-if="!isPostsLoading"
    />
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import PostForm from '@/components/PostForm.vue'
import PostList from '@/components/PostList.vue'
import usePosts from '@/hooks/usePosts'
import useSortedPosts from '@/hooks/useSortedPosts'
import useSortedAndSearchedPosts from '@/hooks/useSortedAndSearchedPosts'

export default {
  name: 'App',
  data: () => ({
    dialogVisible: false,
    sortOptions: [
      {value: 'title', name: 'Title'},
      {value: 'body', name: 'Body'}
    ],
  }),
  components: {
    PostForm,
    PostList
  },
  setup() {
    const { posts, isPostsLoading, totalPages } = usePosts(10)
    const { selectedSort, sortedPosts } = useSortedPosts(posts)
    const { searchValue, sortedAndSearchedPosts } = useSortedAndSearchedPosts(sortedPosts)

    return {
      posts,
      isPostsLoading,
      totalPages,
      selectedSort,
      sortedPosts,
      searchValue,
      sortedAndSearchedPosts
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