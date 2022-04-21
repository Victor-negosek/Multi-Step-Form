<template>
  <div class="container">
    <article>
      <header>
        <div class="progress">
          <div
            class="progress-step"
            :class="{ active: index === activeStep }"
            v-for="(step, index) in formSteps"
            :key="'step' + index"
          >
            {{ index + 1 }}
          </div>
        </div>
      </header>
      <section :class="animation">
        <h2>{{ formSteps[activeStep].title }}</h2>
        <h1>{{ formSteps[activeStep].description }}</h1>
        <div class="input-fields">
          <div
            class="input-container"
            v-for="(field, index) in formSteps[activeStep].fields"
            :key="'field' + index"
          >
            <label class="input-label">{{ field.label }}</label>
            <input
              type="text"
              :class="{ 'wrong*-input': !field.valid }"
              v-model="field.value"
              required
            />
          </div>
        </div>
        <div>
          <div class="actions">
            <button v-if="activeStep + 1 != 1" @click="backStep">back</button>
            <button
              v-if="activeStep + 1 < formSteps.length - 1"
              @click="checkFields"
            >
              next
            </button>
            <button
              v-if="activeStep + 1 === formSteps.length - 1"
              @click="checkFields"
            >
              done
            </button>
          </div>
        </div>
      </section>
    </article>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      activeStep: 0,
      animation: "animate-in",
      formSteps: [
        {
          title: "PERSONAL INFORMATIONS",
          description: "Please insert your personal informations",
          fields: [
            {
              label: "Name",
              value: "",
              valid: true,
              pattern: /.+/,
            },
            {
              label: "E-Mail",
              value: "",
              valid: true,
              pattern: /.+/,
            },
            {
              label: "Phone-Number",
              value: "",
              valid: true,
              pattern: /.+/,
            },
            {
              label: "Company",
              value: "",
              valid: true,
              pattern: /.+/,
            },
          ],
        },
        {
          title: "PLANUNG UND KONZEPTION",
          description: "Please evaluate the fields betwen 0 and 5",
          fields: [
            {
              label: "NUTZUNG",
              value: "",
              valid: true,
              pattern: /.+/,
            },
            {
              label: "QUALITÄT",
              value: "",
              valid: true,
              pattern: /.+/,
            },
            {
              label: "MACHINE LEARNING",
              value: "",
              valid: true,
              pattern: /.+/,
            },
            {
              label: "DIGITAL ENGINEERING",
              value: "",
              valid: true,
              pattern: /.+/,
            },
            {
              label: "SCHNITTSTELLE",
              value: "",
              valid: true,
              pattern: /.+/,
            },
            {
              label: "VARLANTEN",
              value: "",
              valid: true,
              pattern: /.+/,
            },
            {
              label: "ANFORDERUNG",
              value: "",
              valid: true,
              pattern: /.+/,
            },
          ],
        },
        {
          title: "PRODUKT UND PROZESSENTWICKLUNG",
          description: "Please evaluate the fields betwen 0 and 5",
          fields: [
            {
              label: "ANFORDERUNG VON KUNDEN",
              value: "",
              valid: true,
              pattern: /.+/,
            },
            {
              label: "ANFORDERUNG",
              value: "",
              valid: true,
              pattern: /.+/,
            },
            {
              label: "DURCHFÜRUNG DER PROZESSE",
              value: "",
              valid: true,
              pattern: /.+/,
            },
            {
              label: "WISSENSMANAGMENT",
              value: "",
              valid: true,
              pattern: /.+/,
            },
            {
              label: "IT-INFRASTUKTUR",
              value: "",
              valid: true,
              pattern: /.+/,
            },
            {
              label: "PERSONELLE RESSOURCEN",
              value: "",
              valid: true,
              pattern: /.+/,
            },
            {
              label: "SINGLE POINT OF TRUTH",
              value: "",
              valid: true,
              pattern: /.+/,
            },
          ],
        },
        {
          title:
            "Thank you for filling the questions, Click submit for the response!",
        },
      ],
    };
  },
  methods: {
    nextStep() {
      this.activeStep += 1;
    },
    backStep() {
      this.activeStep -= 1;
    },
    checkFields() {
      let valid = true;
      this.formSteps[this.activeStep].fields.forEach((field) => {
        if (!field.pattern.test(field.value)) {
          valid = false;
          field.valid = false;
        } else {
          field.valid = true;
        }
      });
      if (valid) {
        this.nextStep();
      } else {
        this.animation = "animate-wrong";
        setTimeout(() => {
          this.animation = "";
        }, 400);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Noto+Sans&display=swap");

@mixin flexbox() {
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  @include flexbox();
  width: 100%;
  min-height: 100vh;
  font-family: "Noto Sans", sans-serif;
}

article {
  display: flex;
  margin: 10px;
  width: calc(100% - 20px);
  max-width: 720px;
  min-height: 480px;

  header {
    @include flexbox();
    width: 60px;
    height: flex;
    background-color: #fff;
    border-right: 2px inset rgb(25, 163, 94);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.2);
  }

  .progress-step {
    @include flexbox();
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
      font-size: 2rem;
      color: rgb(1, 71, 36);
      margin: 0px;
      padding-top: 20px;
    }
    h1 {
      font-size: 0.8rem;
      color: rgb(90, 94, 92);
      margin: 0;
    }

    .input-fields {
      @include flexbox();
      flex-direction: column;
      width: 100%;
    }

    .input-container {
      position: relative;
      padding: 20px 20px 20px 20px;
      width: calc(100% - 40px);
      max-width: 400px;

      input {
        position: relative;
        width: 100%;
        font-family: "Noto Sans", sans-serif;
        font-size: 0.8rem;
        color: #555;
        outline: none;
        border: none;
        border-bottom: 1px inset rgb(25, 163, 94);

        &:valid + .input-Label {
          top: 10px;
          left: 20px;
          font-size: 0.7rem;
          font-weight: normal;
          color: #999;
        }

        &.wrong-input + .input-label {
          color: #b92938;
        }
      }
    }

    .input-label {
      left: 20px;
      font-size: 1rem;
      color: rgb(0, 0, 0);
      pointer-events: none;
    }

    .actions {
      margin: 0;

      button {
        font-family: "noto Sans", sans-serif;
        outline: none;
        border: none;
        color: #fff;
        background-color: rgb(25, 163, 94);
        font-size: 1.35rem;
        padding: 5px 20px;
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
