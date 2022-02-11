const tariffRate = [0, 1.97, 2.29, 2.36, 2.46, 2.71];
const workExperience = [0, 0, 0.08, 0.12, 0.15];
const hardshipАllowance = [0, 0.1, 0.14];
const tariffRateFirst = 1.076;
const surtax = 0.13;
const union = pensionTax = 0.01;
const monthHours = [159, 160, 175, 168, 159, 176, 168, 184, 176, 168, 168, 176];
const date = new Date();
const month = date.getMonth();

const showResult = document.querySelector('#show-result');
const showHours = document.querySelector('#show-hours');
const showBonus = document.querySelector('#show-bonus');
const showTariff = document.querySelector('#show-tariff');
const showExperience = document.querySelector('#show-experience');
const showHardship = document.querySelector('#show-hardship');
const swipePrime = document.querySelector('.prime');
const swipeCalc = document.querySelector('.calc');
const swipeOutput = document.querySelector('.output');
const normsHours = document.getElementById('norm-hours');
normsHours.innerHTML = `Норма часов <b>${monthHours[month]}</b> в этом месяце`;
const preloader = document.getElementById('preloader');


button.onclick = () => {
  const preloader = document.getElementById('preloader');
  const preloaderWrapper = document.getElementById('preloader-wrapper');
  button.style.visibility = 'hidden';


  swipeCalc.style.paddingTop = '0px';
  swipeCalc.style.paddingBottom = '0px';
  preloader.style.display = 'block';
  preloaderWrapper.classList.add('preloader-active');

  setTimeout(outputResult, 2200);

  function outputResult() {
    const workOutHour = document.getElementById("work-out-hour").value;
    const bonusValue = document.getElementById("bonus").value;
    const nightHours = document.getElementById("night-hours").value;
    const checkbox = document.getElementById("check-box");
    const oneTimeBonus = document.getElementById("one-time-bonus").value;

    // Переключение и рассчеты
    swipeCalc.classList.toggle('active');
    swipeOutput.classList.toggle('active');
    preloaderWrapper.classList.remove('preloader-active');
    preloader.style.display = 'none';
    scrolled = window.pageYOffset;
    scrollToTop();

    // индексация денежных доходов
    const getIndexationIncome = () => {
      let result = 0;
      if (checkbox.checked) {
        result = 68.70;
        return result;
      }
      else {
        return result;
      }
    }

    // Вредность
    const hardShip = (workOutHour * tariffRateFirst) * hardshipАllowance[selectElementHardshipАllowance.selectedIndex];

    // Премия
    const bonus = () => {
      let result = bonusValue / 100;
      return result;
    }

    // Профмастерство
    const professionalSkills = () => {
      let result

      if (tariffRate[selectElementTariff.selectedIndex] < 2) {
        result = 0.15;
        return result;
      } else if (tariffRate[selectElementTariff.selectedIndex] === 2.71) {
        result = 0.21;
        return result;
      } else {
        result = 0.18;
        return result;
      }
    }


    // Сверхурочные
    const getOverHour = (workOutHour) => {
      let result = 0;
      if (monthHours[month] < workOutHour) {
        result = (workOutHour - monthHours[month]) * 2;
        return result;
      } else {
        return result;
      }
    }
    // Ночные
    const getNightHours = (nightHours) => {
      let result;
      result = (tariffRate[selectElementTariff.selectedIndex] * nightHours) * 0.4;
      return result;

    }

    // Оклад за часы
    let baseSalary = workOutHour * tariffRate[selectElementTariff.selectedIndex];
    //Зарплата грязными  
    let dirtySalary = baseSalary + (baseSalary * bonus()) + (baseSalary * workExperience[selectElementExperience.selectedIndex]) + (baseSalary * professionalSkills()) + hardShip + (getOverHour(workOutHour) * tariffRate[selectElementTariff.selectedIndex]) + getNightHours(nightHours) + (+oneTimeBonus);
    // Зарплата чистыми
    let clearSalary = dirtySalary - (dirtySalary * surtax) - (dirtySalary * pensionTax) - (dirtySalary * union) + getIndexationIncome();


    //главное
    showResult.innerHTML = `Зарплата за месяц составит<br><u>${clearSalary.toFixed(2)}</u> BYN`;

    const outputDirtySalary = document.querySelector('#output-dirtysalary');
    outputDirtySalary.innerHTML = `Всего начислено  <u>${(dirtySalary + getIndexationIncome()).toFixed(2)}</u> BYN`;
    //выводы 

    const outputBaseSalary = document.querySelector('#output-basesalary');
    outputBaseSalary.innerHTML = `${baseSalary.toFixed(2)} BYN`;

    const outputBonus = document.querySelector('#output-bonus');
    outputBonus.innerHTML = `${(baseSalary * bonus()).toFixed(2)} BYN`;

    const outputworkExperience = document.querySelector('#output-experience');
    outputworkExperience.innerHTML = `${(baseSalary * workExperience[selectElementExperience.selectedIndex]).toFixed(2)} BYN`;

    const outputSkills = document.querySelector('#output-skills');
    outputSkills.innerHTML = `${(baseSalary * professionalSkills()).toFixed(2)} BYN`;

    const outputHardship = document.querySelector('#output-hardship');
    outputHardship.innerHTML = `${hardShip.toFixed(2)} BYN`;

    const outputIndex = document.querySelector('#output-index');
    outputIndex.innerHTML = `${(getIndexationIncome()).toFixed(2)} BYN`;

    const outputOverHour = document.querySelector('#output-overhour');
    outputOverHour.innerHTML = `${(getOverHour(workOutHour) * tariffRate[selectElementTariff.selectedIndex]).toFixed(2)} BYN`;

    const outputNightHours = document.querySelector('#output-nighthours');
    outputNightHours.innerHTML = `${getNightHours(nightHours).toFixed(2)} BYN`;

    const outputOneTimeBonus = document.querySelector('#output-onetimebonus');
    outputOneTimeBonus.innerHTML = `${oneTimeBonus - null} BYN`;

    // вычеты
    const outputSurtax = document.querySelector('#output-surtax');
    outputSurtax.innerHTML = `${(dirtySalary * surtax).toFixed(2)} BYN`;

    const outputPensionTax = document.querySelector('#output-pensiontax');
    outputPensionTax.innerHTML = `${(dirtySalary * pensionTax).toFixed(2)} BYN`;

    const outputUnion = document.querySelector('#output-union');
    outputUnion.innerHTML = `${(dirtySalary * union).toFixed(2)} BYN`;

    // Очистка формы
    const form = document.getElementById('form');
    form.reset();

    showHours.innerHTML = '';
    showBonus.innerHTML = '';
    showTariff.innerHTML = '';
    showExperience.innerHTML = '';
    showHardship.innerHTML = '';

    button.style.visibility = 'visible';
  }
};

// Селекты
let selectElementTariff = document.getElementById("tariff-rate");
selectElementTariff.addEventListener('change', function () {
  let index = selectElementTariff.selectedIndex;
  showTariff.innerHTML = `Тарифная ставка ${tariffRate[index]} BYN в час`;
});

let selectElementExperience = document.getElementById("work-experience");
selectElementExperience.addEventListener('change', function () {
  let index = selectElementExperience.selectedIndex;
  showExperience.innerHTML = `Примерно за полный  месяц - ${(monthHours[month] * 2 * workExperience[index])} BYN`;

});

let selectElementHardshipАllowance = document.getElementById("hardship-allowance");
selectElementHardshipАllowance.addEventListener('change', function () {
  let index = selectElementHardshipАllowance.selectedIndex;
  showHardship.innerHTML = `Надбавка за вредность ${(tariffRateFirst * hardshipАllowance[index]).toFixed(2)} копеек в час`;

});

// Лейблы
let workOutHour = document.getElementById("work-out-hour");
workOutHour.oninput = () => {
  let result;
  result = workOutHour.value / 8;
  if (result === 1) {
    showHours.innerHTML = `Это около ${result.toFixed(0)} дня`;
  } else if (workOutHour.value > monthHours[month]) {
    result = workOutHour.value - monthHours[month];
    showHours.innerHTML = `Сверхурочных часов -  ${result} `;
  } else {
    showHours.innerHTML = `Это около ${result.toFixed(0)} дней`;
  }
};


let bonus = document.getElementById("bonus");
bonus.oninput = () => {
  let result;
  result = workOutHour.value * 2 * (bonus.value / 100);
  showBonus.innerHTML = `Примерно ${result.toFixed(2)} BYN в этом месяце`;

}


const scrollWindow = () => {
  document.getElementById('start').onclick = function () {
    swipeCalc.style.paddingTop = '20px';
    swipeCalc.style.paddingBottom = '20px';
    swipePrime.classList.toggle('active');
    swipeCalc.classList.toggle('active');
    scrolled = window.pageYOffset;
    scrollToTop();
  }

  document.getElementById('backout').onclick = function () {
    swipePrime.classList.toggle('active');
    swipeOutput.classList.toggle('active');
    scrolled = window.pageYOffset;
    scrollToTop();
  }

}
scrollWindow();

const scrollToTop = () => {
  if (scrolled > 0) {
    window.scrollTo(0, scrolled);
    scrolled = scrolled - 35;
    timer = setTimeout(scrollToTop, 15);
  } else {
    clearTimeout(timer);
    window.scrollTo(0, 0)
  }
}

const fadeIn = (el, timeout) => {
  el.style.transition = `opacity ${timeout}ms`;
  setTimeout(() => {
    el.style.opacity = '1';
  }, 10);
};


window.onload = function () {
  const start = document.getElementById('start');
  fadeIn(start, 8000);
}