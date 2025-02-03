<template>
    <!-- Footer -->
  <footer class="cv-footer">
    <p>{{ p }}</p>
  </footer>
</template>

<script>
  export default {
    name: "Footer",
    data() {
      return {
        p:''
      };
    },
    async created() {
      const response = await fetch('https://strapi.tayfundurmaz.net/api/nuxt-foot');
      const data = await response.json();

      this.p = data.data.attributes.p;
    }
  };
</script>

<style scoped>
    /* Footer Section */
  .cv-footer {
    font-family: 'Courier New', Courier, monospace;
    margin-top: 50px;
    background-color: rgba(0, 0, 0, 0.8); /* Transparent black background */
    color: white;
    text-align: center;
    padding: 20px;
  }
</style>
