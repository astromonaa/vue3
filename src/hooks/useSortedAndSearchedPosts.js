import { computed, ref } from "vue";

export default function (sortedPosts) {
  const searchValue = ref('')

  const sortedAndSearchedPosts = computed(() => {
    return sortedPosts.value.filter(el => el.title.toLowerCase().includes(searchValue.value.toLowerCase()))
  })
  return {
    searchValue, sortedAndSearchedPosts
  }
}