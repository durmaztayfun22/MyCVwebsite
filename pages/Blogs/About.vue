<template>
  <div>
    <Header @languageChanged="updateLanguage" />
    <section class="about">
      <div class="about-container">
        <div class="about-text">
          <h1>{{ h1 }}</h1>
          <p>{{ p1 }}</p>
          <p>{{ p2 }}</p>
        </div>
        <div class="about-image">
          <img
            src="https://strapi.tayfundurmaz.net/uploads/214033_tayfun_durmaz_c8784b304e.jpg"
            alt="About Me"
            @contextmenu.prevent
          />
          <div class="image-overlay"></div>
        </div>
      </div>
    </section>
    <AboutBlogsVue :currentLocale="currentLocale" />
    <Footer />
  </div>
</template>

<script>
  import { ref, onMounted } from "vue";
  import Header from "../Header.vue";
  import AboutBlogsVue from './About-Blogs/AboutBlogs.vue';
  import Footer from "../index-components/Footer.vue";

  export default {
    name: "AboutPage",
    components: {
      Header,
      AboutBlogsVue,
      Footer,
    },
    setup() {
      const h1 = ref("");
      const p1 = ref("");
      const p2 = ref("");
      const currentLocale = ref("en"); 

      const fetchData = async (locale) => {
        try {
          const url = `https://strapi.tayfundurmaz.net/api/nuxt-about?locale=${locale}`;
          const response = await fetch(url);
          const data = await response.json();

          if (data?.data?.attributes) {
            h1.value = data.data.attributes.h1 || "Başlık bulunamadı";
            p1.value = data.data.attributes.p1 || "Açıklama bulunamadı";
            p2.value = data.data.attributes.p2 || "";
          } else {
            console.warn("Geçersiz veri formatı:", data);
          }
        } catch (error) {
          console.error("Veri alınırken hata oluştu:", error);
        }
      };

      const updateLanguage = (locale) => {
        if (locale !== currentLocale.value) {
          currentLocale.value = locale;
          fetchData(locale);
        }
      };

      onMounted(() => {
        fetchData(currentLocale.value);
      });

      return {
        h1,
        p1,
        p2,
        updateLanguage,
        currentLocale,
      };
    },
  };
</script>



<style scoped>
  .about {
    font-family: 'Courier New', Courier, monospace;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f9f9f9;
    padding: 20px;
  }

  .about-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    max-width: 1200px;
    width: 100%;
    background: white;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    overflow: hidden;
  }

  .about-text {
    flex: 1;
    padding: 30px;
    text-align: left;
  }

  .about-text h1 {
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 20px;
  }

  .about-text p {
    font-size: 1.1rem;
    line-height: 1.8;
    color: #555;
    margin-bottom: 15px;
  }

  .about-image {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #eaf2f8;
    position: relative; 
  }

  .about-image img {
    width: 100%;
    max-width: 500px;
    height: auto;
    border-radius: 10px;
    object-fit: cover;
  }

  .about-image .image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: transparent;
    z-index: 1;
  }
</style>
