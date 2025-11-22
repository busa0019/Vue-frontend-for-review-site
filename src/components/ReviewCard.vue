<template>
  <div class="card h-100">
    <img 
      v-if="review.attributes.coverImage?.data" 
      :src="`http://localhost:1337${review.attributes.coverImage.data.attributes.url}`" 
      class="card-img-top" 
      :alt="review.attributes.title"
      style="height: 200px; object-fit: cover;"
    >
    <div class="card-body d-flex flex-column">
      <h5 class="card-title">{{ review.attributes.title }}</h5>
      <p class="card-text flex-grow-1">{{ review.attributes.excerpt }}</p>
      <div class="mt-auto">
        <span class="badge bg-primary">Rating: {{ review.attributes.rating }}/10</span>
        <router-link 
          :to="`/review/${review.attributes.slug}`" 
          class="btn btn-primary btn-sm mt-2 d-block"
        >
          Read Review
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReviewCard',
  props: {
    review: {
      type: Object,
      required: true
    }
  }
}
</script>