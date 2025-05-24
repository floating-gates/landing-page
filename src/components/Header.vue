<script setup>
  import { themeColor, auth_api_endpoint,
           logout_api_endpoint, JWT_TOKEN_NAME } from "../data/items.js";
import { ref, onMounted } from "vue";

// Assume you store a JWT when user logs in
const isAuthenticated = ref(false);


const checkAuth = async () => {
  try {
    const response = await fetch(auth_api_endpoint, {
      credentials: 'include',
    });
    isAuthenticated.value = response.ok;
  } catch (error) {
    console.error("Auth check failed", error);
    isAuthenticated.value = false;
  }
};

onMounted(checkAuth);

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
    await checkAuth(); // re-check auth after logout
    window.location.reload()
  }
};
</script>


<template>
  <nav class="site-nav dark js-site-navbar mb-5 site-navbar-target">
    <div class="container">
      <div class="site-navigation">
        <a href="#home-section" class="logo m-0 float-left">
            <img src="../assets/images/hero.png" alt="Logo" class="logo-img" />
        </a>
        <ul class="js-clone-nav d-none d-lg-inline-block site-menu float-left">

          <li><a href="#features-section" class="nav-link">How does it work</a></li>
          <li><a href="#pricing-section" class="nav-link">Pricing</a></li>
          <li><a href="/mission" class="nav-link">Mission</a></li>

          <!-- <li><a href="#about-section" class="nav-link">About</a></li> -->
          <!-- <li><a href="#contact-section" class="nav-link">Contact</a></li> -->
          <li class="has-children">
            <a href="#" class="nav-link">Projects</a>
            <ul class="dropdown">
              <!-- <li> -->
                <!--   <a href="#testimonials-section" class="nav-link"> -->
                  <!--     Testimonials -->
                  <!--   </a> -->
                <!-- </li> -->
              <li><a href="#" class="nav-link">MX-GP Motorbike Heat Sinks</a></li>
              <!-- <li><a href="#" class="nav-link">High Power Inverter Cooling system</a></li> -->
            </ul>
          </li>
        </ul>
        
        <ul class="js-clone-nav d-none mt-1 d-lg-inline-block site-menu float-right" v-if="!isAuthenticated">
          <li class="cta-button-outline" style="margin-right: 10px;">
            <a href="/login">Sign in</a>
          </li>
          <!-- <li class="cta-primary"> -->
          <!--   <a href="/login" :style="[{ backgroundColor: themeColor }]">Register</a> -->
          <!-- </li> -->
        </ul>
        <ul class="js-clone-nav d-none mt-1 d-lg-inline-block site-menu float-right" v-else>
          <li class="cta-button-outline" style="margin-right: 10px;">
            <a href="/dashboard">Dashboard</a>
          </li>
          <li class="cta-primary">
            <a href="#" @click.prevent="logout" :style="[{ backgroundColor: themeColor }]">Logout</a>
          </li>
        </ul>
        <a
          href="#"
          class="burger ml-auto float-right site-menu-toggle js-menu-toggle d-inline-block dark d-lg-none"
          data-toggle="collapse"
          data-target="#main-navbar"
          >
          <span></span>
        </a>
      </div>
    </div>
  </nav>
</template>
