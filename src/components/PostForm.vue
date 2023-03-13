<template>
   <form @submit.prevent>
    <h1>Create post</h1>
    <my-input
      v-model="post.title"
      :placeholder="`Title`"
      v-focus
    />
    <my-input
      v-model="post.body"
      :placeholder="`description`"
    />
    <my-button
      @click="createPost"
      style="align-self: flex-end; margin-top: 15px"
    >
    Create
    </my-button>
  </form>
</template>

<script>
  export default {
    data: () => ({
      post: {
        title: '',
        body: ''
      }
    }),
    methods: {
      createPost() {
        this.post.id = Date.now()
        this.$emit('create', this.post)
        this.post = {
          title: '',
          body: ''
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  form {
    display: flex;
    flex-direction: column;
  }

</style>