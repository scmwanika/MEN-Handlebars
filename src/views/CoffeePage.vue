<template>
  <div>
    <HeaderSection />
    <h4>Coffee Process</h4>
    <br />
    <p>
      Our coffee is processed using a method known as wet processing. This
      removes the coffee's fruity material and leaves the coffee cherry
      moist.<br />
      It is passed through a pulping machine, fermented and dried using forced
      air drying to achieve a moisture content of about 10.5%.
    </p>
    <div class="flex-container">
      <div class="flex-item-left"><ProcessingGuide /></div>
      <div class="flex-item-right"><CoffeeProcessing /></div>
    </div>
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

<style scoped>
* {
  box-sizing: border-box;
}

.flex-container {
  display: flex;
  flex-direction: row;
  font-size: 30px;
  text-align: center;
}

.flex-item-left {
  padding: 10px;
  flex: 50%;
}

.flex-item-right {
  padding: 10px;
  flex: 50%;
}

/* Responsive layout - makes a one column-layout instead of two-column layout */
@media (max-width: 800px) {
  .flex-container {
    flex-direction: column;
  }
}
</style>
