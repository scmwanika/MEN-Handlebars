<template>
  <div>
    <HeaderSection />
    <CoffeeProcessing />
    <ProcessingGuide />
    <FooterSection />
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderSection from '@/components/HeaderSection.vue';
import CoffeeProcessing from '@/components/BuyCoffee/CoffeeProcessing.vue';
import ProcessingGuide from '@/components/BuyCoffee/ProcessingGuide.vue';
import FooterSection from '@/components/FooterSection.vue';

export default {
  name: 'CoffeePage',
  components: {
    HeaderSection,
    CoffeeProcessing,
    ProcessingGuide,
    FooterSection,
  },
};
</script>
