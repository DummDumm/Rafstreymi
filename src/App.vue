<script setup>
import NavBar from './components/NavBar.vue'
import Hero from './components/Hero.vue'
import WhyUs from './components/WhyUs.vue'
import Services from './components/Services.vue'
import ProjectSpotlight from './components/ProjectSpotlight.vue'
import Stats from './components/Stats.vue'
import CtaBanner from './components/CtaBanner.vue'
import FooterSection from './components/FooterSection.vue'
</script>

<template>
  <NavBar />
  <main>
    <Hero />
    <WhyUs />
    <Services />
    <ProjectSpotlight />
    <Stats />
    <CtaBanner />
  </main>
  <FooterSection />
</template>
