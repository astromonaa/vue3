import { computed, ref } from "vue";

export default function (posts) {
  const selectedSort = ref('')

  const sortedPosts = computed(() => {
    return [...posts.value].sort((a, b) => {
      return a[selectedSort.value]?.localeCompare(b[selectedSort.value])
    })
  })
  return {
    selectedSort, sortedPosts
  }
}