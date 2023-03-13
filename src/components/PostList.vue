<template>
  <div v-if="posts.length">
    <h3>Posts list</h3>
    <transition-group name="post-list">
      <post-item
        v-for="post in posts"
        :key="post.id"
        :post="post"
        @remove="$emit('remove', post)"
      />
    </transition-group>
  </div>
  <h2 v-else class="red">There is not any posts</h2>
</template>

<script>
import PostItem from './PostItem.vue';
  export default {
    components: {
      PostItem
    },
    props: {
      posts: {
        type: Array,
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .red {
    color: red;
  }
  .post-list-move,
  .post-list-enter-active,
  .post-list-leave-active {
    transition: all 0.4s ease;
  }
  .post-list-enter-from,
  .post-list-leave-to {
    opacity: 0;
    transform: translateX(130px);
  }
</style>