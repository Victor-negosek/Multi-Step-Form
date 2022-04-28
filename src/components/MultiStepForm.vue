<template>
  <div v-for="step in formSteps" :key="step.id">
    <div v-if="step.id - 1 == activeStep" class="container">
      <article>
        <header>
          <div class="progress">
            <div
              v-for="step in formSteps"
              :key="step.id"
              class="progress-step"
              :class="{ active: step.id - 1 == activeStep }"
            >
              {{ step.id }}
            </div>
          </div>
        </header>
        <section :class="animation">
          <h2>{{ formSteps[activeStep].title }}</h2>
          <h1>{{ formSteps[activeStep].description }}</h1>
          <h3>{{ formSteps[activeStep].header }}</h3>

          <div
            v-for="question in questions"
            :key="question.id"
            class="input-fields"
          >
            <div
              v-if="question.phase_id - 1 == activeStep"
              class="input-container"
            >
              <label class="input-label">{{ question.label }}</label>
              <v-slider
                class="input-slider"
                v-model="question.value"
                color="green"
                :min="0"
                :max="5"
                :step="1"
                :thumb-size="15"
              >
                <template v-slot:append>
                  <v-text-field
                    v-model="question.value"
                    label="Value"
                    variant="plain"
                  ></v-text-field>
                </template>
              </v-slider>
            </div>
          </div>

          <div>
            <div class="actions">
              <v-btn v-if="activeStep + 1 != 1" @click="backStep" color="error">
                back
              </v-btn>
              <v-btn
                v-if="activeStep < formSteps.length - 1"
                @click="nextStep"
                color="sucess"
              >
                next
              </v-btn>
              <v-btn
                v-if="activeStep === formSteps.length - 1"
                @click="submitStep"
                href="/AboutPage"
                color="info"
              >
                done
              </v-btn>
            </div>
          </div>
        </section>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      activeStep: 0,
      animation: "animate-in",
      result_id: 1,
      result: [],
      questions: [],
      formSteps: [],
    };
  },
  mounted() {
    fetch("http://localhost:5000/formSteps")
      .then((res) => res.json())
      .then((data) => (this.formSteps = data))
      .catch((err) => console.log(err.message));

    fetch("http://localhost:5000/questions")
      .then((res) => res.json())
      .then((data) => (this.questions = data))
      .catch((err) => console.log(err.message));
  },
  methods: {
    async submitStep() {
      const res = await fetch("http://localhost:5000/results", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          body: JSON.stringify(this.result),
        },
        body: JSON.stringify(this.result),
      });
      const data = await res.json();

      this.result = [...this.result, data];
    },
    nextStep() {
      for (const question of this.questions) {
        if (question.phase_id - 1 == this.activeStep) {
          const values = {
            question: question.id,
            pashe: question.phase_id,
            score: question.value,
          };
          this.result[question.id] = values;
        }
      }
      this.activeStep += 1;
    },
    backStep() {
      this.activeStep -= 1;
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Noto+Sans&display=swap");
@mixin flexbox() {
  display: flex;
  justify-content: center;
}
.container {
  @include flexbox();
  width: 100%;
  max-height: 100vh;
  font-family: "Noto Sans", sans-serif;
}
article {
  display: flex;
  margin: 10px;
  width: calc(100% - 20px);
  max-width: 1500px;
  min-height: 280px;
  header {
    @include flexbox();
    align-items: center;
    width: 60px;
    height: flex;
    background-color: #fff;
    border-right: 2px inset rgb(25, 163, 94);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.2);
  }
  .progress-step {
    @include flexbox();
    align-items: center;
    position: relative;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-bottom: 20px;
    color: #fff;
    background-color: rgb(25, 163, 94);
    &.active {
      background-color: rgb(25, 163, 94);
      ~ .progress-step {
        color: #555;
        background-color: #ccc;
      }
      ~ .progress-step::before {
        background-color: #ccc;
      }
    }
    &:before {
      content: "";
      position: absolute;
      top: -20px;
      width: 2px;
      height: 20px;
      background-color: rgb(25, 163, 94);
      z-index: 10;
    }
    &:first-child::before {
      display: none;
    }
  }
  section {
    @include flexbox();
    flex-direction: column;
    width: 100%;
    background-color: #fff;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.2);
    h2 {
      text-align: center;
      font-size: 2rem;
      color: rgb(1, 71, 36);
      margin: 0px;
      padding-top: 20px;
    }
    h1 {
      text-align: center;
      font-size: 0.8rem;
      color: rgb(90, 94, 92);
      margin: 0;
      padding-bottom: 20px;
    }
    h3 {
      font-size: 1.5rem;
      color: rgb(1, 71, 36);
      margin-left: 10px;
      padding-bottom: 10px;
    }
    .input-fields {
      @include flexbox();
      flex-direction: column;
      width: 100%;
    }
    .input-container {
      position: relative;
      padding: 1px 1pc 1px 1px;
      width: calc(100% - 40px);
      input {
        position: relative;
        width: 100%;
        font-family: "Noto Sans", sans-serif;
        font-size: 0.8rem;
        color: #555;
        outline: none;
        border: none;
        border-bottom: 1px inset rgb(25, 163, 94);
      }
    }

    .input-label {
      left: 20px;
      margin-left: 10px;
      font-size: 1rem;
      color: rgb(0, 0, 0);
      pointer-events: none;
    }
    .input-slider {
      margin-left: 10px;
      padding-right: 100 px;
      left: 20px;
      width: 100%;
      height: 80px;
    }
    .actions {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0;
      button {
        font-family: "noto Sans", sans-serif;
        outline: none;
        border: none;
        color: #fff;
        background-color: rgb(25, 163, 94);
        font-size: 1.35rem;
        margin: 40px;
        text-transform: uppercase;
        border-radius: 3px;
        cursor: pointer;
      }
    }
  }
}
.animate-in {
  animation: in 0.4s ease-in-out;
}
.animate-wrong {
  animation: wrong 0.6s ease-in-out;
}
@keyframes in {
  0% {
    opacity: 0;
    transform: rotateY(0deg);
  }
  100% {
    opacity: 1;
    transform: rotateY(0deg);
  }
}
@keyframes wrong {
  0% {
    transform: translateX(0);
  }
  20% {
    transform: translateX(30px);
  }
  40% {
    transform: translateX(10px);
  }
  60% {
    transform: translateX(30px);
  }
  80% {
    transform: translateX(10px);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
