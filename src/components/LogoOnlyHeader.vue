<script setup>
import { ref, onMounted } from "vue";
import { verify_jwt } from "../user_handler/login.js";
import {
  themeColor,
  logout_api_endpoint,
  JWT_TOKEN_NAME
} from "../data/items.js";

const isAuthenticated = ref(false);

onMounted(async () => {
  isAuthenticated.value = await verify_jwt();
});

const logout = async () => {
  try {
    await fetch(logout_api_endpoint, {
      method: 'POST',
      credentials: 'include',
    });
  } catch (error) {
    console.error("Logout failed", error);
  } finally {
    localStorage.removeItem(JWT_TOKEN_NAME);
    isAuthenticated.value = await verify_jwt();
  }
};
</script>

<template>
  <nav class="site-nav dark js-site-navbar mb-5 site-navbar-target">
    <div class="container">
      <div class="site-navigation">
        <a href="/" class="logo m-0 float-left">
          <img src="../assets/images/logo.webp" alt="Logo" class="logo-img" />
        </a>


        <ul class="js-clone-nav d-none mt-1 d-lg-inline-block site-menu float-right" v-if="isAuthenticated">
          <li class="cta-button-outline" style="margin-right: 10px;">
            <a href="/profile">Profile</a>
          </li>
        </ul>
        <ul  v-else>
        </ul>
        
      </div>
    </div>
  </nav>
</template>

