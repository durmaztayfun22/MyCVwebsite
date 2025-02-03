<template>
  <div>
    <Header @languageChanged="updateLanguage" />
    <Container :selectedLanguage="selectedLanguage" />
    <Section :selectedLanguage="selectedLanguage" />
    <Footer />
  </div>
</template>

<script>
  import Header from "./Header.vue";
  import Container from "./index-components/Container.vue";
  import Section from "./index-components/Section.vue";
  import Footer from "./index-components/Footer.vue";

  export default {
    name: "index",
    components: {
      Header,
      Container,
      Section,
      Footer,
    },
    data() {
      return {
        selectedLanguage: localStorage.getItem("selectedLanguage") || "en",
      };
    },
    methods: {
      updateLanguage(locale) {
        this.selectedLanguage = locale; 
      },
    },
  };
</script>


<style scoped>
  * {
    font-family: 'Courier New', Courier, monospace;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color:rgb(109, 109, 109);
    color: #333;
    line-height: 1.6;
  }
</style>

