<template>
  <!-- Packages -->
  <div class="our-packages">
    <p>
        We have arrangements for:<br />
        corporate events, tourists looking for adventure, and individuals
        looking to training programs in best agricultural practises.
    </p>
    <div class="card-data">
      <div
        v-for="teamData in teamDataList"
        :key="teamData.id"
        class="team-data"
      >
        <div class="card">
          <div class="card-body">
            <h6 class="card-title">{{ teamData.title }}</h6>
            <p class="card-text">{{ teamData.text }}</p>
            <p>
              <ul>
              <li>{{ teamData.itemOne }}</li>
              <li>{{ teamData.itemTwo }}</li>
              <li>{{ teamData.itemThree }}</li>
              <li>{{ teamData.itemFour }}</li>
              </ul>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Packages -->
</template>

<script>
export default {
  data() {
    return {
      teamDataList: [
        {
          id: 1,
          title: 'Corporate Events',
          text:
            'We offer a venue for team building exercises, and social gatherings.',
          itemOne: 'Venue',
          itemTwo: 'Games and sports',
          itemThree: 'Special requests',
        },
        {
          id: 2,
          title: 'Tourist',
          text: 'Regular tourists, looking for a place to have fun.',
          itemOne: 'Accommodation',
          itemTwo: 'Meals',
          itemThree: 'Internet / Wi-Fi',
          itemFour: 'All Non-priced activities',
        },
        {
          id: 3,
          title: 'Training',
          text: 'We conduct training exercises in the following.',
          itemOne: 'Coffee',
          itemTwo: 'Irish Potatoes',
          itemThree: 'Chickens',
        },
        {
          id: 4,
          title: 'Amenities',
          text: '',
          itemOne: '',
          itemTwo: '',
          itemThree: '',
        },
      ],
    };
  },
};
</script>

<style scoped>
table {
  margin: 0 auto;
  width: 100%;
}

td,
th {
  width: 20%;
}

.cell-size {
  width: 60%;
}

th {
  background-color: #068d68;
}

b {
  font-size: 12.5pt;
}

.card-data {
  margin-left: 5%;
  margin-right: 5%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  column-gap: 70px;
  row-gap: 20px;
}

.card-title {
  color: white;
  background-color: #068d68;
}

li {
  text-align: justify;
  font-size: 11pt;
}
</style>
