<template>
  <div>
    <HeaderSection />
    <h4>Testimonial</h4>
    <md-tabs class="md-transparent" md-alignment="centered">
      <md-tab id="tab-capacity" md-label="Our Capacity"><OurCapacity /></md-tab>
      <md-tab id="tab-partners" md-label="Our Partners"><OurPartners /></md-tab>
      <md-tab id="tab-reviews" md-label="Guests Comment"><ReviewList /></md-tab>
    </md-tabs>
    <FooterSection />
  </div>
</template>

<script>
import HeaderSection from '@/components/HeaderSection.vue';
import OurCapacity from '@/components/Testimonial/OurCapacity.vue';
import OurPartners from '@/components/Testimonial/OurPartners.vue';
import ReviewList from '@/components/Testimonial/ReviewList.vue';
import FooterSection from '@/components/FooterSection.vue';

export default {
  name: 'TestimonialPage',
  components: {
    HeaderSection,
    OurCapacity,
    OurPartners,
    ReviewList,
    FooterSection,
  },
};
</script>
