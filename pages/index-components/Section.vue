<template>
  <section class="section">
    <div  v-for="(text, index) in paragraphs" :key="index" class="layer">
      <div class="image">
        <img :src="images[index]" :alt="`Image ${index + 1}`">
      </div>
      <div class="line-vertical"></div>
      <div class="text">
        <p>{{ text }}</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Section",
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
        "https://strapi.tayfundurmaz.net/uploads/java_Script_e27b16d476.png",
        "https://strapi.tayfundurmaz.net/uploads/node_JS_9b0d3724cb.jpg",
        "https://strapi.tayfundurmaz.net/uploads/reactjs7_d3941e0343.jpg",
        "https://strapi.tayfundurmaz.net/uploads/react_Native_de0cd31d41.png",
        "https://strapi.tayfundurmaz.net/uploads/next_JS_1348bc3310.jpeg",
        "https://strapi.tayfundurmaz.net/uploads/php_aa1eafebb8.jpg",
        "https://strapi.tayfundurmaz.net/uploads/python_9477997afe.jpg",
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
          ? "https://strapi.tayfundurmaz.net/api/nuxt-section?locale=tr"
          : "https://strapi.tayfundurmaz.net/api/nuxt-section?locale=en";
      const response = await fetch(url);
      const data = await response.json();

      this.paragraphs = [
        data.data.attributes.p1,
        data.data.attributes.p2,
        data.data.attributes.p3,
        data.data.attributes.p4,
        data.data.attributes.p5,
        data.data.attributes.p6,
        data.data.attributes.p7,
      ];
    },
  },
};
</script>

<style scoped>
    /* Section Genel Yapı */
  .section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 40px;
    background-color: rgb(175, 175, 175); /* Arka plan rengi */
  }

    /* Katman Genel Yapı */
  .layer {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90%;
    margin-bottom: 40px;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    padding: 30px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    overflow: hidden; /* Resimlerin kenarlarının yuvarlanmasını engeller */
  }

    /* Katman Hover Efekti */
  .layer:hover {
    transform: translateY(-10px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }

    /* Resim Ayarları */
  .image {
    margin-right: 30px;
    flex-shrink: 0;
    position: relative;
    z-index: 2; /* Resimlerin diğer öğelere öncelikli olarak görünmesini sağlar */
  }

  .image img {
    width: 200px;
    height: auto;
    border-radius: 12px;
    transition: transform 0.3s ease;
  }

    /* Resim Hover Efekti */
  .image img:hover {
    transform: scale(1.1); /* Resmi biraz büyütür */
  }

    /* Metin Ayarları */
  .text {
    max-width: 500px;
    color: #333;
    text-align: left;
    z-index: 1; /* Metinlerin alt kısımda olmasını sağlar */
  }

  .text p {
    margin: 0;
    font-size: 17px;
    line-height: 1.7;
    font-weight: 400;
    color: #444;
    transition: color 0.3s ease;
  }

    /* Metin Hover Efekti */
  .text p:hover {
    color: #007BFF;
  }

    /* Dikey Çizgi Ayarları */
  .line-vertical {
    width: 2px;
    height: 100%;
    background-color: #e0e5ec;
    margin: 0 40px;
    border-radius: 2px;
  }

    /* Alternatif Katman Düzeni: Tek Taraf Resim, Diğer Taraf Metin */
  .layer:nth-child(odd) .image {
    order: 1;
  }

  .layer:nth-child(odd) .text {
    order: 2;
  }

  .layer:nth-child(even) .image {
    order: 2;
  }

  .layer:nth-child(even) .text {
    order: 1;
  }

    /* Responsive Tasarım: Mobil Uyumluluk */
  @media (max-width: 768px) {
  .layer {
    flex-direction: column;
    text-align: center;
    padding: 20px;
  }

  .line-vertical {
    display: none;
  }

  .image {
    margin-bottom: 20px;
  }

  .text {
    max-width: 90%;
    padding: 10px;
  }
}
</style>
