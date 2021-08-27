<template>
  <div>
    <h4>We Offer</h4>
    <md-tabs class="md-transparent" md-alignment="centered">
      <md-tab id="tab-activities" md-label="Activities"
        ><PopularActivities
      /></md-tab>
      <md-tab id="tab-accommodation" md-label="Accommodation"
        ><AccommodationSection
      /></md-tab>
      <md-tab id="tab-packages" md-label="Packages"><PackagesCard /></md-tab>
    </md-tabs>
  </div>
</template>

<script>
import PopularActivities from '@/components/Visit/PopularActivities.vue';
import AccommodationSection from '@/components/Visit/AccommodationSection.vue';
import PackagesCard from '@/components/Visit/PackagesCard.vue';

export default {
  components: {
    PopularActivities,
    AccommodationSection,
    PackagesCard,
  },
};
</script>
