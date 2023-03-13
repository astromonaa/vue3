import axios from 'axios'

export const postModule = {
  state: () => ({
    posts: [],
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
  getters: {
    sortedPosts(state) {
      return [...state.posts].sort((a, b) => {
        return a[state.selectedSort]?.localeCompare(b[state.selectedSort])
      })
    },
    sortedAndSearchedPosts(state, getters) {
      return getters.sortedPosts.filter(el => el.title.toLowerCase().includes(state.searchValue.toLowerCase()))
    }
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts
    },
    setLoading(state, bool) {
      state.isPostsLoading = bool
    },
    setPage(state, page) {
      state.page = page
    },
    setTotalPages(state, pages) {
      state.totalPages = pages
    },
    setSelectedSort(state, type) {
      state.selectedSort = type
    },
    setSearchValue(state, value) {
      state.searchValue = value
    }
  },
  actions: {
    async fetchPosts({state, commit}) {
      try {
        commit('setLoading', true)
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: { 
            _limit: state.pageLimit,
            _page: state.page
          }
        })
        commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.pageLimit))
        commit('setPosts', response.data)
      }catch(e) {
        console.log(e);
      }finally {
        commit('setLoading', false)
      }
    },
    async loadMorePosts({state, commit}) {
      try {
        commit('setPage', state.page + 1)
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: { 
            _limit: state.pageLimit,
            _page: state.page
          }
        })
        commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.pageLimit))
        commit('setPosts', [...state.posts, ...response.data])
      }catch(e) {
        console.log(e);
      }
    },
  },
  namespaced: true
}