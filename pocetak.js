let prviDropdown = document.querySelector("#from");
let drugiDropdown = document.querySelector("#to");
const submitButton = document.querySelector(".convert");
let rezPolje = document.querySelector("#result");
const swapBtn = document.querySelector("#swap");
let inputNumber = document.querySelector("#inputNumber");

let swaper;

const getData = async function () {
  let valute = [];
  try {
    const data = await fetch(
      "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json"
    );
    const qqq = await data.json();

    for (const key in qqq) {
      if (Object.hasOwnProperty.call(qqq, key)) {
        if (qqq[key] !== "") {
          if (qqq[key] === "00 Token") {
            qqq[key] = "---Odaberite valutu---";
          }
          valute.push(qqq[key]);

          prviDropdown.insertAdjacentHTML(
            "afterbegin",
            `
          <option value="${key}">${qqq[key]}</option>
          `
          );
          drugiDropdown.insertAdjacentHTML(
            "afterbegin",
            `
          <option value="${key}">${qqq[key]}</option>
          `
          );
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
};

getData();

const convertFunc = async function () {
  try {
    const data = await fetch(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${prviDropdown.value}/${drugiDropdown.value}.json`
    );
    if (!data.ok) {
      throw new Error(
        "Doslo je do greske pri obradi podataka! Radimo na rijesavanju problema"
      );
    }

    const qqq = await data.json();

    inputNumber.value = inputNumber.value ? inputNumber.value : 1;
    rezPolje.value = (
      qqq[`${drugiDropdown.value}`] * inputNumber.value
    ).toFixed(3);
  } catch (error) {
    alert(
      "Doslo je do greske pri obradi podataka! Radimo na rijesavanju problema"
    );
  }
};

submitButton.addEventListener("click", function () {
  convertFunc();
});

swapBtn.addEventListener("click", function () {
  swaper = prviDropdown.value;
  prviDropdown.value = drugiDropdown.value;
  drugiDropdown.value = swaper;
  convertFunc();
});

inputNumber.addEventListener("change", function () {
  convertFunc();
});
