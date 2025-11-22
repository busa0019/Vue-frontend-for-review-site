<template>
  <div class="search-bar">
    <input
      type="text"
      class="form-control"
      placeholder="Search reviews..."
      v-model="searchText"
      @input="onSearch"
    >
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  data() {
    return {
      searchText: ''
    }
  },
  methods: {
    onSearch() {
      this.$emit('search', this.searchText);
    }
  }
}
</script>