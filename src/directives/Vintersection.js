export default {
  mounted(el, binding) { // binding - объект в котором есть свойство value, значением которого является перед. значение в директиву
    let options = {
      rootMargin: '0px',
      threshold: 1.0
    }
    let callback = (entries) => {
      if (entries[0].isIntersecting) {
        binding.value() // В value попадает функция loadMorePosts
      }
    }
    let observer = new IntersectionObserver(callback, options)
    observer.observe(el);
  },
  name: 'intersection'
}