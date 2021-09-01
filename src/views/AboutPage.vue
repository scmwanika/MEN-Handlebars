<template>
  <div>
    <HeaderSection />
    <AboutSection />
    <OurFounder />
    <TeamSection />
    <FooterSection />
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderSection from '@/components/HeaderSection.vue';
import AboutSection from '@/components/About/AboutSection.vue';
import OurFounder from '@/components/About/OurFounder.vue';
import TeamSection from '@/components/About/TeamSection.vue';
import FooterSection from '@/components/FooterSection.vue';

export default {
  name: 'AboutPage',
  components: {
    HeaderSection,
    AboutSection,
    OurFounder,
    TeamSection,
    FooterSection,
  },
};
</script>
