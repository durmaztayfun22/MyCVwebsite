<template>
  <div>
    <Header @languageChanged="updateLanguage" />
    <section class="contact">
      <div class="contact-container">
        <h1 class="contact-title">{{ h1 }}</h1>
        <p class="contact-description">{{ p }}</p>

        <form class="contact-form" @submit.prevent="submitForm">
          <div class="form-group">
            <label for="name">{{ label1 }}</label>
            <input type="text" id="name" v-model="form.name" :placeholder="input1" required />
          </div>
          <div class="form-group">
            <label for="email">{{ label2 }}</label>
            <input type="email" id="email" v-model="form.email" :placeholder="input2" required />
          </div>
          <div class="form-group">
            <label for="subject">{{ label4 }}</label>
            <input type="text" id="subject" v-model="form.subject" :placeholder="input3" required />
          </div>
          <div class="form-group">
            <label for="message">{{ label3 }}</label>
            <textarea id="message" v-model="form.message" :placeholder="textarea" rows="5" required></textarea>
          </div>
          <button type="submit" class="contact-button">{{ button }}</button>
        </form>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import Header from "../Header.vue";
import Footer from "../index-components/Footer.vue";
import Swal from "sweetalert2";

export default {
  name: "ContactPage",
  components: {
    Header,
    Footer,
  },
  setup() {
    const h1 = ref("");
    const p = ref("");
    const label1 = ref("");
    const label2 = ref("");
    const label3 = ref("");
    const label4 = ref("");
    const input1 = ref("");
    const input2 = ref("");
    const input3 = ref("");
    const textarea = ref("");
    const button = ref("");
    const form = ref({ name: "", email: "", subject: "", message: "" });

    const fetchData = async (locale) => {
      try {
        const url =
          locale === "tr"
            ? "https://strapi.tayfundurmaz.net/api/nuxt-contact?locale=tr"
            : "https://strapi.tayfundurmaz.net/api/nuxt-contact?locale=en";
        const response = await fetch(url);
        const data = await response.json();

        h1.value = data.data.attributes.h1;
        p.value = data.data.attributes.p;
        label1.value = data.data.attributes.label1;
        label2.value = data.data.attributes.label2;
        label3.value = data.data.attributes.label3;
        label4.value = data.data.attributes.label4;
        input1.value = data.data.attributes.input1;
        input2.value = data.data.attributes.input2;
        input3.value = data.data.attributes.input3;
        textarea.value = data.data.attributes.textarea;
        button.value = data.data.attributes.button;
      } catch (error) {
        console.error("Veri alınırken hata oluştu:", error);
      }
    };

    onMounted(() => {
      const savedLang = localStorage.getItem("selectedLanguage") || "en";
      fetchData(savedLang);
    });

    const submitForm = async () => {
      const formData = {
        name: form.value.name,
        email: form.value.email,
        subject: form.value.subject,
        message: form.value.message,
      };

      try {
        const response = await fetch('/api/sendMessage', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (data.success) {
          Swal.fire({
            title: 'Başarılı!',
            text: 'Mesajınız gönderildi!',
            icon: 'success',
            confirmButtonText: 'Tamam'
          });
          form.value = { name: '', email: '', subject: '', message: '' };
        } else {
          Swal.fire({
            title: 'Hata!',
            text: 'Mesaj gönderilemedi. Lütfen tekrar deneyin.',
            icon: 'error',
            confirmButtonText: 'Tamam'
          });
        }
      } catch (error) {
        console.error('Hata:', error);
        Swal.fire({
          title: 'Hata!',
          text: 'Bir hata oluştu. Daha sonra tekrar deneyin.',
          icon: 'error',
          confirmButtonText: 'Tamam'
        });
      }
    };

    return {
      h1,
      p,
      label1,
      label2,
      label3,
      label4,
      input1,
      input2,
      input3,
      textarea,
      button,
      form,
      submitForm,
    };
  },
};
</script>



<style scoped>
.contact {
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f3f4f6, #e8eaf6);
  padding: 40px 20px;
}

.contact-container {
  background: #ffffff;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
  text-align: center;
  animation: fadeIn 0.6s ease-out;
}

.contact-title {
  font-size: 2.5rem;
  color: #444;
  margin-bottom: 20px;
}

.contact-description {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 30px;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

label {
  font-size: 1rem;
  color: #444;
  margin-bottom: 5px;
}

input,
textarea {
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #f9f9f9;
  transition: border-color 0.3s ease, background 0.3s ease;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #3b8dff;
  background: #ffffff;
}

.contact-button {
  padding: 12px 25px;
  font-size: 1.2rem;
  color: #ffffff;
  background: linear-gradient(135deg, #3b8dff, #6a5acd);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease, box-shadow 0.3s ease;
}

.contact-button:hover {
  background: linear-gradient(135deg, #6a5acd, #3b8dff);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
