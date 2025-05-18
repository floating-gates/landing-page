<script setup>
import { themeColor, siteName } from "../data/items";
</script>


<template>
  <nav class="site-nav dark js-site-navbar mb-5 site-navbar-target">
    <div class="container">
      <div class="site-navigation">
        <a href="" class="logo m-0 float-left">
            <img src="../assets/images/hero.png" alt="Logo" class="logo-img" />
        </a>
        <ul class="js-clone-nav d-none d-lg-inline-block site-menu float-left">
          <li class="active">
            <a href="#home-section" class="nav-link">Home</a>
          </li>

          <li><a href="#features-section" class="nav-link">How does it work</a></li>
          <li><a href="#pricing-section" class="nav-link">Pricing</a></li>
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
        <ul class="js-clone-nav d-none mt-1 d-lg-inline-block site-menu float-right">
          <li class="cta-button-outline" style="margin-right: 10px;">
            <a href="/login">
              Sign in</a>
          </li>
          <li class="cta-primary">
            <a href="/login" :style="[{ backgroundColor: themeColor }]">
              Register</a>
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
