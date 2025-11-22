<template>
  <div>
    <div class="row mb-4">
      <div class="col">
        <h1>Reviews</h1>
        <SearchBar @search="handleSearch" />
      </div>
    </div>
    
    <div class="row">
      <div class="col-md-4 mb-4" v-for="review in filteredReviews" :key="review.id">
        <ReviewCard :review="review" />
      </div>
    </div>
  </div>
</template>

<script>
import ReviewCard from '@/components/ReviewCard.vue';
import SearchBar from '@/components/SearchBar.vue';
import api from '@/services/api';

export default {
  name: 'HomeView',
  components: {
    ReviewCard,
    SearchBar
  },
  data() {
    return {
      reviews: [],
      searchQuery: ''
    }
  },
  computed: {
    filteredReviews() {
      if (!this.searchQuery) return this.reviews;
      return this.reviews.filter(review => 
        review.attributes.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  async mounted() {
    this.reviews = await api.getReviews();
  },
  methods: {
    handleSearch(query) {
      this.searchQuery = query;
    }
  }
}
</script>