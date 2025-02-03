<template>
  <div class="about-blogs">
    <h1 class="title">{{ data.h1 }}</h1>

    <div class="project-grid" v-if="projects.length">
      <div v-for="(project, index) in projects" :key="index" class="project-card">
        <img 
          :src="project.image" 
          :alt="project.title" 
          class="project-image" 
          @click="openModal(project.image)" 
        />
        <div class="project-info">
          <h2 class="project-title">{{ project.title }}</h2>
          <p class="project-desc">{{ project.description }}</p>
          <a :href="project.link" target="_blank" class="project-btn">{{ data.a }}</a>
        </div>
      </div>
    </div>
    
    <p v-else>Loading...</p>

    <div v-if="modalImage" class="modal" @click="closeModal">
      <img :src="modalImage" class="modal-content" />
    </div>
  </div>
</template>

<script>
    import { ref, watch, onMounted } from "vue";
    import axios from "axios";

    export default {
    name: "AboutBlogs",
    props: {
        currentLocale: {
        type: String,
        default: "en",
        },
    },
    setup(props) {
        const data = ref({ h1: "", a: "" });
        const projects = ref([]);
        const modalImage = ref(null);

        const fetchData = async (locale) => {
        try {
            const response = await axios.get(`https://strapi.tayfundurmaz.net/api/nuxtaboutblog?locale=${locale}`);
            const attributes = response.data.data.attributes;

            data.value = {
            h1: attributes.h1,
            a: attributes.a,
            };

            projects.value = [
            { title: attributes.title1, description: attributes.description1, image: attributes.image1, link: attributes.link1 },
            { title: attributes.title2, description: attributes.description2, image: attributes.image2, link: attributes.link2 },
            { title: attributes.title3, description: attributes.description3, image: attributes.image3, link: attributes.link3 },
            { title: attributes.title4, description: attributes.description4, image: attributes.image4, link: attributes.link4 },
            { title: attributes.title5, description: attributes.description5, image: attributes.image5, link: attributes.link5 },
            ];
        } catch (error) {
            console.error("API fetch error:", error);
        }
        };

        onMounted(() => {
        fetchData(props.currentLocale);
        });

        watch(() => props.currentLocale, (newLocale) => {
        fetchData(newLocale);
        });

        const openModal = (image) => {
        modalImage.value = image;
        };

        const closeModal = () => {
        modalImage.value = null;
        };

        return { data, projects, modalImage, openModal, closeModal };
    },
    };
</script>


<style scoped>
    .about-blogs {
    text-align: center;
    padding: 20px;
    }

    .project-grid {
    display: flex;
    flex-direction: column; 
    align-items: center; 
    gap: 20px;
    margin-top: 20px;
    }

    .project-card {
    width: 80%;
    max-width: 600px; 
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    padding: 20px;
    text-align: left;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
    }

    .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    }

    .modal-content {
    max-width: 90%;
    max-height: 90%;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.5);
    cursor: pointer;
    }

    .project-image {
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-radius: 5px;
    cursor: pointer;
    transition: transform 0.2s ease;
    }

    .project-image:hover {
    transform: scale(1.05);
    }

    .project-title {
    font-size: 1.5em;
    }

    .project-desc {
    font-size: 1.1em;
    }

    .project-btn {
    display: inline-block;
    margin-top: 10px;
    padding: 8px 12px;
    background-color: #007bff;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    }

    .project-btn:hover {
    background-color: #0056b3;
    }
</style>
