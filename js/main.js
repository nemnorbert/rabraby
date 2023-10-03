let loadtime = new Date().getTime();


// Variables
const secMenu = document.querySelector('#secundaryMenu');
const preLoaderBox = document.querySelector('#preLoader');
const appMenuBox = document.querySelector('#appMenu');
const hamburgerBtns = document.querySelectorAll(".hamBtns");
const popupWindowDiv = document.querySelector('#popupWindow');
const popupExitDivs = document.querySelectorAll(".popupExit");

// Hamburger Menu
hamburgerBtns.forEach(hamBtn => {
  hamBtn.addEventListener("click", () => {
    const visibility = secMenu.getAttribute("data-visible");
    if (visibility === "true") {
      secMenu.setAttribute("data-visible", "false");
    } else {
      secMenu.setAttribute("data-visible", "true");
    }
  })
})

// PopUp Exit
popupExitDivs.forEach(exitDiv => {
  exitDiv.addEventListener("click", () => {
    popupWindowDiv.style.display = "none"
  })
})

/////////////////////// MENU, FOOD SECTON ///////////////////////
// Variables
const allergyBtns = document.querySelectorAll('.allergyBtn');
const foodItems = document.querySelectorAll('.foodItem');
const activeAllergens = new Set();

const buildFoodPopup = () => {
  console.log("food popup activated");
  popupWindowDiv.style.display = "block";
}

foodItems.forEach(foodItem => {
  foodItem.addEventListener("click", buildFoodPopup)
})

allergyBtns.forEach(allergyBtn => {
  allergyBtn.addEventListener("click", function () {
    const allergenNumber = this.dataset.allergen;
    
    if (activeAllergens.has(allergenNumber)) {
      this.classList.remove("active");
      activeAllergens.delete(allergenNumber);
    } else {
      this.classList.add("active");
      activeAllergens.add(allergenNumber);
    }

    foodItems.forEach(foodItem => {
      const allergens = foodItem.dataset.allergens?.split(" ");
      
      if (allergens && allergens.some(allergen => activeAllergens.has(allergen))) {
        foodItem.style.opacity = ".1";
      } else {
        foodItem.style = "";
      }
    });
  });
});


// PreLoader
const preLoaderFunc = async () => {
  loadtime_bonus = loadtime <= 1 ? (1 - loadtime)*1000 : 0;

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  await delay(loadtime_bonus);

  preLoaderBox.style.transform = "translateY(-100%)";
  appMenuBox.style.transform = "translateY(0%)";
}



loadtime = (new Date().getTime() - loadtime) / 1000;
window.addEventListener("load", preLoaderFunc);


/*
// VARIABLES
var before_loadtime = new Date().getTime();

// FUNCTIONS
function PreLoader() {
    var aftr_loadtime = new Date().getTime();  
    pgloadtime = (aftr_loadtime - before_loadtime) / 1000;
      var idealLoad = 1;
      if (pgloadtime <= idealLoad) {
        bonusLoad = (idealLoad - pgloadtime)*1000;
      } else {
        bonusLoad = 0;
      }
      setTimeout(function(){
        preLoader.remove();
        mainVid();
      }, bonusLoad);
};

function mainVid() {
  if (pgloadtime <= 1 && home == true) {
    document.getElementById('media').innerHTML =
    `<video loading="lazy" autoplay loop muted plays-inline poster="${php[1]}img/header.jpg">
    <source src="${php[1]}img/video_1.mp4" type="video/mp4">
    </video>`
  }
}

function MobileMenu() {
  mobiMen = document.getElementById("window_1");
  if (mobiMen.style.display != "flex") {
    mobiMen.style.display = "flex";
  } else {
    mobiMen.style.display = "none";
  }
}

function DarkSwitch() {
  const darkMode = document.querySelector("#darkMode");
  const useDark = window.matchMedia("(prefers-color-scheme: dark)");
  function toggleDarkMode(state) {
    document.documentElement.classList.toggle("darkMode", state);
    DarkIconS();
  }
  toggleDarkMode(useDark.matches);
  useDark.addListener((evt) => toggleDarkMode(evt.matches));

  darkMode.addEventListener("click", () => {
    document.documentElement.classList.toggle("darkMode");
    DarkIconS();
  });

  function DarkIconS() {
    if (document.documentElement.classList.value == "darkMode") {
      document.getElementById('darkMode').innerHTML = '<i class="bi bi-brightness-high-fill"></i>';
      dm = true;
    } else {
      document.getElementById('darkMode').innerHTML = '<i class="bi bi-moon-fill"></i>';
      dm = false;
    }
  }
  if (cookie.cookie_consent_level["functionality"]) {CookieSet("darkmode", dm, 1);}
}
function langSwitcher() {
  if (language === "en") { x = "hu"; y = "";
  } else { x = "en"; y = "en/";
  }
if (cookie.cookie_consent_level["functionality"]) {CookieSet("lang", x, 1);}
window.open(php[0]+y+php[4], "_self");
}

// MAIN
const navEL = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY >= 56) {
        navEL.classList.add('scroll');
    } else if (window.scrollY < 56) {
        navEL.classList.remove('scroll');
    }
});

// CLICK
document.getElementById("darkMode").addEventListener("click", DarkSwitch);
//document.getElementById("mobile_nav").addEventListener("click", MobileMenu);
document.getElementById("mobile_nav_top").addEventListener("click", MobileMenu);
document.getElementById("mobile_bg").addEventListener("click", MobileMenu);
document.getElementById("lang_1").addEventListener("click", langSwitcher);
document.getElementById("lang_2").addEventListener("click", langSwitcher);

// PRELOADER
var preLoader = document.getElementById('pre_loader');
window.addEventListener("load", PreLoader);
window.addEventListener("load", DarkSwitch);
*/