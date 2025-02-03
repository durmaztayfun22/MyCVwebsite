<template>
  <section class="container">
    <div class="container-body">
      <div v-for="(text, index) in paragraphs" :key="index" class="container-block">
        <div class="container-block-1">
          <div class="container-block-1-body">
            <div class="container-block-1-body-description">
              <p>{{ text }}</p>
            </div>
          </div>
        </div>
        <div class="container-block-2">
          <div class="container-block-2-body">
            <div class="container-block-2-body-image">
              <div class="image-overlay"></div>
              <img :src="images[index]" :alt="`Image ${index + 1}`" @contextmenu.prevent />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Container",
  props: {
    selectedLanguage: {
      type: String,
      default: "en",
    },
  },
  data() {
    return {
      paragraphs: [],
      images: [
        "https://strapi.tayfundurmaz.net/uploads/Basliksiz_2_3978e72a47.png",
      ],
    };
  },
  watch: {
    selectedLanguage: {
      immediate: true,
      handler(newLocale) {
        this.fetchData(newLocale);
      },
    },
  },
  methods: {
    async fetchData(locale) {
      const url =
        locale === "tr"
          ? "https://strapi.tayfundurmaz.net/api/nuxt-container?locale=tr"
          : "https://strapi.tayfundurmaz.net/api/nuxt-container";
      try {
        const response = await fetch(url);
        const data = await response.json();

        // API'den gelen metinleri bir diziye dönüştür
        this.paragraphs = [
          data.data.attributes.p,
        ];
      } catch (error) {
        console.error("Veri alınırken hata oluştu:", error);
      }
    },
  },
};
</script>

<style scoped>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh; /* Tam ekran yüksekliği */
    background-color: rgb(104, 104, 104); /* Arka plan rengi */
    font-family: 'Arial', sans-serif; /* Modern bir yazı tipi */
    padding: 20px;
  }

  .container-body {
    display: flex;
    max-width: 1200px;
    width: 100%;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1); /* Hafif gölge */
    border-radius: 10px; /* Yuvarlatılmış köşeler */
    overflow: hidden; /* Taşmaları gizle */
    background-color: white;
    transition: transform 0.3s ease; /* Geçiş animasyonu */
  }

  .container-body:hover {
    transform: scale(1.1); /* %10 büyütme */
  }

  .container-block {
    display: flex;
    width: 100%;
  }

  .container-block-1,
  .container-block-2 {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .container-block-1-body-description {
    font-family: 'Courier New', Courier, monospace;
    padding: 20px;
    text-align: left;
  }

  .container-block-1-body-description p {
    font-size: 18px;
    line-height: 1.6;
    color: #333;
  }

  .container-block-2-body-image {
    position: relative; /* Set to relative to allow positioning of the overlay within it */
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .image-overlay {
    position: absolute; /* Ensure it positions over the image */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: transparent; /* Şeffaf bırakılıyor */
    z-index: 1; /* Place on top of the image */
  }

  .container-block-2-body-image img {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-left: 5px solid #ddd; /* Separation between image and text */
  }


</style>