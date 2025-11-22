<template>
  <div v-if="review">
    <div class="row">
      <div class="col-md-4">
        <img 
          v-if="review.attributes.coverImage?.data" 
          :src="`http://localhost:1337${review.attributes.coverImage.data.attributes.url}`" 
          class="img-fluid rounded"
          :alt="review.attributes.title"
        >
      </div>
      <div class="col-md-8">
        <h1>{{ review.attributes.title }}</h1>
        <p class="text-muted">By {{ review.attributes.author }} • {{ formatDate(review.attributes.publishDate) }}</p>
        <span class="badge bg-success fs-6">Rating: {{ review.attributes.rating }}/10</span>
        <div class="mt-4" v-html="review.attributes.content"></div>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script>
import api from '@/services/api';

export default {
  name: 'ReviewDetail',
  data() {
    return {
      review: null
    }
  },
  async mounted() {
    const slug = this.$route.params.slug;
    this.review = await api.getReviewBySlug(slug);
  },
  methods: {
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString();
    }
  }
}
</script>