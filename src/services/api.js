import axios from 'axios';

const API_BASE = 'http://localhost:1337/api';

export default {
  async getReviews() {
    const response = await axios.get(`${API_BASE}/reviews?populate=*`);
    return response.data.data;
  },
  
  async getReviewBySlug(slug) {
    const response = await axios.get(
      `${API_BASE}/reviews?filters[slug][$eq]=${slug}&populate=*`
    );
    return response.data.data[0];
  },
  
  async searchReviews(query) {
    const response = await axios.get(
      `${API_BASE}/reviews?filters[title][$containsi]=${query}&populate=*`
    );
    return response.data.data;
  }
};