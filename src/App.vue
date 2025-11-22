<template>
  <div class="container mt-4">
    <nav class="navbar navbar-dark bg-dark mb-4">
      <div class="container">
        <span class="navbar-brand">Book Reviews</span>
      </div>
    </nav>
    
    <div class="mb-4">
      <input 
        type="text" 
        class="form-control" 
        placeholder="Search book titles..." 
        v-model="searchQuery"
      >
    </div>
    
    <div v-if="loading" class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-2">Loading reviews from backend...</p>
    </div>
    
    <div v-else-if="error" class="alert alert-danger">
      {{ error }}
    </div>
    
    <div v-else class="row">
      <div class="col-md-6 col-lg-4 mb-4" v-for="review in filteredReviews" :key="review.id">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">{{ review.title }}</h5>
            <p class="card-text">{{ review.excerpt }}</p>
            <div class="d-flex justify-content-between align-items-center">
              <span class="badge bg-primary">⭐ {{ review.rating }}/10</span>
              <span class="text-muted small">{{ review.author }}</span>
            </div>
          </div>
          <div class="card-footer">
            <button class="btn btn-primary btn-sm" @click="showFullReview(review)">
              Read Full Review
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      reviews: [],
      loading: true,
      searchQuery: '',
      error: null
    }
  },
  computed: {
    filteredReviews() {
      if (!this.searchQuery) return this.reviews;
      return this.reviews.filter(review => 
        review.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  async mounted() {
    try {
      console.log('Fetching reviews from API...');
     const response = await axios.get('https://review-site-backend-va59.onrender.com/api/reviews?populate=*');
      console.log('API Response:', response.data);
      this.reviews = response.data.data;
      this.loading = false;
      console.log('Successfully loaded', this.reviews.length, 'reviews');
    } catch (error) {
      console.error('Error loading reviews:', error);
      this.loading = false;
      this.error = `Failed to load reviews: ${error.message}. Make sure Strapi is running on http://localhost:1337`;
    }
  },
  methods: {
    showFullReview(review) {
      // The content is an array of blocks, we try to extract text from the first paragraph
      const firstBlock = review.content?.[0];
      let fullContent = 'No content available';
      if (firstBlock && firstBlock.type === 'paragraph' && firstBlock.children) {
        fullContent = firstBlock.children.map(child => child.text).join('');
      }
      alert(`BOOK REVIEW: ${review.title}\n\n${fullContent}`);
    }
  }
}
</script>

<style>
@import 'bootstrap/dist/css/bootstrap.css';
</style>