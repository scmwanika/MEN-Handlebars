<template>
  <div>
    <h4>Founder's statement</h4>
    <div class="our-founder">
      <div class="row">
        <div class="col-md-4">
          <figure>
            <div>
              <iframe
                class="embed-responsive-item img-fluid"
                src="https://www.youtube.com/embed/NC3kg2Q3fqo"
                allowfullscreen
              ></iframe>
              <!-- https://www.youtube.com/watch?v=NC3kg2Q3fqo -->
            </div>
            <figcaption>
              Dr. Ian Clarke shares his Farm's Vision and Values.
            </figcaption>
          </figure>
        </div>
        <div class="col-md-8">
          <div class="paragraph-about-founder">
            <br />
            <p>
              Dr. Ian Clarke came to Uganda 33 years ago with his wife Robbie
              and their three children, Sean, Michael and Lauren.
            </p>
            <p>
              Since then he has been on a journey of investing in people and
              communities in Uganda, first in Luweero shortly after the civil
              war (1982 – 1986) where he founded a church hospital, Kiwoko
              Hospital, which still stands to this day providing community and
              curative services at very low cost. It has one of the best
              neonatal intensive care units in Uganda.
            </p>
            <p>
              Later Ian and Robbie moved to Kampala where he set up
              International Hospital and International Medical Centres.
              Subsequently he founded Clarke International University, while his
              son Sean founded Clarke Junior School. These projects were for
              development in the health and education sector. More recently he
              invested in agriculture in Clarke Farm. The agricultural sector in
              Uganda supports 80% of the population, so if one can bring
              improvements in this sector it has a significant effect on
              household incomes of a large segment of the population.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- Limit CSS to this component -->
<style scoped>
p {
  text-align: justify;
}

.our-founder {
  margin-left: 5%;
  margin-right: 5%;
  background-color: #f5f5f5;
}

iframe {
  margin-top: 20px;
  height: 260px;
  width: 350px;
  border: none;
}

.paragraph-about-founder {
  font-size: 11pt;
  margin-top: 12px;
  text-align: justify;
  margin-right: 2%;
  color: grey;
}

figcaption {
  font-size: 12px;
}
</style>
