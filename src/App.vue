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
    
    <!-- Show selected review details -->
    <div v-else-if="selectedReview" class="row">
      <div class="col-12">
        <div class="card mb-4">
          <div class="card-body">
            <button class="btn btn-secondary btn-sm mb-3" @click="selectedReview = null">
              ← Back to All Reviews
            </button>
            <h2>{{ selectedReview.attributes.title }}</h2>
            <p class="text-muted">By {{ selectedReview.attributes.author }} • {{ formatDate(selectedReview.attributes.publishDate) }}</p>
            <span class="badge bg-success fs-6 mb-3">Rating: {{ selectedReview.attributes.rating }}/10</span>
            
            <!-- Fixed image display -->
            <div v-if="selectedReview.attributes.coverImage?.length" class="mb-3">
              <img 
                :src="getImageUrl(selectedReview.attributes.coverImage[0])" 
                class="img-fluid rounded"
                :alt="selectedReview.attributes.title"
                style="max-height: 300px;"
              >
            </div>
            
            <div class="review-content">
              <p><strong>Summary:</strong> {{ selectedReview.attributes.excerpt }}</p>
              <div v-html="formatContent(selectedReview.attributes.content)"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Show all reviews list -->
    <div v-else class="row">
      <div class="col-md-6 col-lg-4 mb-4" v-for="review in filteredReviews" :key="review.id">
        <div class="card h-100">
          <!-- Fixed image display -->
          <div v-if="review.attributes.coverImage?.length" class="card-img-container">
            <img 
              :src="getImageUrl(review.attributes.coverImage[0])" 
              class="card-img-top" 
              :alt="review.attributes.title"
              style="height: 200px; object-fit: cover;"
            >
          </div>
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ review.attributes.title }}</h5>
            <p class="card-text flex-grow-1">{{ review.attributes.excerpt }}</p>
            <div class="mt-auto">
              <div class="d-flex justify-content-between align-items-center">
                <span class="badge bg-primary">⭐ {{ review.attributes.rating }}/10</span>
                <span class="text-muted small">{{ review.attributes.author }}</span>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <button class="btn btn-primary btn-sm w-100" @click="showFullReview(review)">
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
      error: null,
      selectedReview: null
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
    try {
      const response = await axios.get('https://review-site-backend-va59.onrender.com/api/reviews?populate=*');
      this.reviews = response.data.data;
      this.loading = false;
    } catch (error) {
      console.error('Error loading reviews:', error);
      this.loading = false;
      this.error = `Failed to load reviews: ${error.message}.`;
    }
  },
  methods: {
    getImageUrl(coverImage) {
      if (!coverImage?.url) return '';
      const url = coverImage.url;
      // Handle both relative and absolute URLs
      if (url.startsWith('http')) {
        return url;
      } else {
        return `https://review-site-backend-va59.onrender.com${url}`;
      }
    },
    showFullReview(review) {
      this.selectedReview = review;
      // Scroll to top of page
      window.scrollTo(0, 0);
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },
    formatContent(content) {
      if (!content) return '<p>No content available.</p>';
      
      try {
        if (Array.isArray(content)) {
          return content.map(block => {
            if (block.type === 'paragraph' && block.children) {
              return `<p>${block.children.map(child => child.text).join('')}</p>`;
            }
            return '';
          }).join('');
        }
        return `<p>${content}</p>`;
      } catch (e) {
        return '<p>Error loading content.</p>';
      }
    }
  }
}
</script>

<style>
@import 'bootstrap/dist/css/bootstrap.css';

.review-content {
  line-height: 1.6;
}

.review-content p {
  margin-bottom: 1rem;
}

.card-img-container {
  overflow: hidden;
}
</style>