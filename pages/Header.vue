<template>
  <div class="cv-container">
    <header class="cv-header">
      <div class="header-content">
        <div class="header-text">
          <h1 class="animated fadeIn">{{ h1 }}</h1>
          <p class="subtitle">{{ p }}</p>
        </div>
      </div>
    </header>
    <nav class="cv-nav">
      <ul>
        <li><nuxt-link to="/">{{ li1 }}</nuxt-link></li>
        <li><nuxt-link to="/Blogs/About">{{ li2 }}</nuxt-link></li>
        <li><a href="https://strapi.tayfundurmaz.net/uploads/My_C_Vin_English_a59018ca7f.pdf" target="_blank" rel="noopener noreferrer">{{ li3 }}</a></li>
        <li><a href="/Blogs/Contact">{{ li4 }}</a></li>
        <li class="language-dropdown">
          <span @click="toggleLanguageMenu" class="language-title">{{ languageLi }}</span>
          <ul v-show="isLanguageMenuOpen" class="language-options">
            <li @click="changeLanguage('en')" class="language-option">{{ languageLiE }}</li>
            <li @click="changeLanguage('tr')" class="language-option">{{ languageLiT }}</li>
          </ul>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  name: "Header",
  emits: ["languageChanged"],
  setup(_, { emit }) {
    const isLanguageMenuOpen = ref(false);
    const h1 = ref("");
    const p = ref("");
    const li1 = ref("");
    const li2 = ref("");
    const li3 = ref("");
    const li4 = ref("");
    const languageLi = ref("");
    const languageLiT = ref("");
    const languageLiE = ref("");

    const fetchData = async (locale) => {
      try {
        const url =
          locale === "tr"
            ? "https://strapi.tayfundurmaz.net/api/nuxt-head?locale=tr"
            : "https://strapi.tayfundurmaz.net/api/nuxt-head?locale=en";
        const response = await fetch(url);
        const data = await response.json();
        h1.value = data.data.attributes.h1;
        p.value = data.data.attributes.p;
        li1.value = data.data.attributes.li1;
        li2.value = data.data.attributes.li2;
        li3.value = data.data.attributes.li3;
        li4.value = data.data.attributes.li4;
        languageLi.value = data.data.attributes.languageLi;
        languageLiT.value = data.data.attributes.languageLiT;
        languageLiE.value = data.data.attributes.languageLiE;
      } catch (error) {
        console.error("Veri alınırken hata oluştu:", error);
      }
    };

    const changeLanguage = (locale) => {
      localStorage.setItem("selectedLanguage", locale); // Dili kaydet
      fetchData(locale);
      emit("languageChanged", locale);
    };

    const toggleLanguageMenu = () => {
      isLanguageMenuOpen.value = !isLanguageMenuOpen.value;
    };

    onMounted(() => {
      const savedLang = localStorage.getItem("selectedLanguage") || "en"; 
      fetchData(savedLang);
      emit("languageChanged", savedLang); // Header'dan dili ana bileşene ilet
    });

    return {
      isLanguageMenuOpen,
      h1,
      p,
      li1,
      li2,
      li3,
      li4,
      languageLi,
      languageLiT,
      languageLiE,
      toggleLanguageMenu,
      changeLanguage,
    };
  },
};
</script>

<style scoped>
    /* Container */
    .cv-container {
        font-family: 'Courier New', Courier, monospace;
        width: 100%;
        margin: 0 auto;
        background-color:rgb(87, 87, 87);
    }

    /* Header Section */
    .cv-header {
        position: relative;
        height: 500px; /* Sabit yükseklik */
        background-image: url('https://images.pexels.com/photos/2653362/pexels-photo-2653362.jpeg');
        background-size: 80%; /* Genişliği %80 yapar */
        background-repeat: no-repeat; /* Resmin tekrar etmesini engeller */
        background-position: center; /* Resmi ortalar */
    }

    .header-content {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
    }

    .header-text {
        color: white;
        text-align: center;
        position: absolute; /* Konumlandırmayı sağlar */
        top: 65%; /* Dikeyde %65 aşağıya hizalar */
        left: 50%; /* Yatayda tam ortalar */
        transform: translate(-50%, -50%); /* Ortalamayı kesinleştirir */
        z-index: 1; /* Diğer öğelerin altında kalmaması için */
    }

    .header-text h1 {
        font-size: 3rem;
        color: #fff; /* Beyaz */
        animation: slideIn 1.5s ease-in-out; /* Animasyonu uygular */
    }

    .subtitle {
        font-size: 1.5rem;
        font-weight: 300;
        color: #fff; /* Beyaz */
        animation: slideIn 1.5s ease-in-out 0.5s; /* Animasyonu uygular ve gecikme ekler */
    }

    /* @keyframes ile animasyonu tanımlama */
    @keyframes slideIn {
        0% {
            opacity: 0; /* Görünmez */
            transform: translateY(-50px); /* Yukarıdan başlar */
        }
        100% {
            opacity: 1; /* Görünür */
            transform: translateY(0); /* Yerine gelir */
        }
    }

    /* Navigation Menu */
    .cv-nav {
        background-color: rgba(0, 0, 0, 0.6); /* Transparent black background */
        padding: 15px 0;
        position: absolute;
        top: 0;
        width: 100%;
        z-index: 10;
    }

    .cv-nav ul {
        display: flex;
        justify-content: center;
        list-style-type: none;
    }

    .cv-nav ul li {
        margin: 0 20px;
    }

    .cv-nav ul li a {
        color: white;
        text-decoration: none;
        font-size: 18px;
        font-weight: bold;
        transition: color 0.3s ease;
    }

    .cv-nav ul li a:hover {
        color: peachpuff;
    }

    /* Dropdown animation */
    .language-dropdown {
        position: relative;
    }

    .language-title {
        cursor: pointer;
        font-size: 18px;
        font-weight: bold;
        color: #fff;
        transition: color 0.3s ease;
    }

    .language-options {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        background-color: #f9f9f9;
        list-style: none;
        padding: 10px;
        margin: 0;
        border: 1px solid #ddd;
        border-radius: 4px;
        animation: slideIn 0.3s ease-out;
    }

    .language-options .language-option {
        padding: 8px;
        cursor: pointer;
    }

    .language-options .language-option:hover {
        background-color: #ddd;
    }

    .language-dropdown .language-options {
        display: block;
    }

    /* Slide-in animation */
    @keyframes slideIn {
        0% {
            opacity: 0;
            transform: translateY(-20px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>
