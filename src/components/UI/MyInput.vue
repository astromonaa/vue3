<template>
  <input :value="modelValue" @input="updateInput" type="text" class="input" :placeholder="placeholder">
</template>

<script>
  export default {
    name: 'my-input',
    props: {
      modelValue: [String, Number],
      placeholder: {
        type: String
      }
    },
    methods: {
      updateInput(event) {
        this.$emit('update:modelValue', event.target.value)
      }
    }
  }
</script>

<style lang="scss" scoped>
 .input {
    width: 100%;
    border: 1px solid teal;
    padding: 10px;
    margin-top: 15px;
  }
</style>