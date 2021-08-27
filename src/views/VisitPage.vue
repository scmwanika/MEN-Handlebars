<template>
  <div>
    <HeaderSection />
    <OurOffers />
    <FooterSection />
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderSection from '@/components/HeaderSection.vue';
import OurOffers from '@/components/Visit/OffersCard.vue';
import FooterSection from '@/components/FooterSection.vue';

export default {
  components: {
    HeaderSection,
    OurOffers,
    FooterSection,
  },
};
</script>
