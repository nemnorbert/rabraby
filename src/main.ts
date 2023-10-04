let loadtime: number = new Date().getTime();

/////////////////////// Variables ///////////////////////
const secMenu: HTMLElement | null = document.querySelector('#secundaryMenu');
const preLoaderBox: HTMLElement | null = document.querySelector('#preLoader');
const appMenuBox: HTMLElement | null = document.querySelector('#appMenu');
const hamburgerBtns: NodeListOf<HTMLElement> = document.querySelectorAll(".hamBtns");
const popupWindowDiv: HTMLElement | null = document.querySelector('#popupWindow');

  // Food,  Menu
  const foodItems: NodeListOf<HTMLElement> = document.querySelectorAll('.foodItem');
  const allergyBtns: NodeListOf<HTMLElement> = document.querySelectorAll('.allergyBtn');
  const activeAllergens: Set<string> = new Set();
  const popupCoverDiv: HTMLImageElement | null = document.querySelector('#popupCoverDiv');
  const popupContentDiv: HTMLElement | null = document.querySelector('#popupContent');

  let foodJSON;
  //let otherJSON;

// JSON Fetch
const fetchJSON = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

// Aszinkron függvény a JSON fájlok betöltésére
const loadJSONFiles = async () => {
  try {
    foodJSON = await fetchJSON("json/food.json");
    //otherJSON = await fetchJSON("json/language/hu.json");
  } catch (error) {
    console.error("Hiba történt a JSON fájlok betöltésekor:", error);
  }
};

// Aszinkron függvény hívása
loadJSONFiles();

// Hamburger Menu
hamburgerBtns.forEach((hamBtn: HTMLElement) => {
  hamBtn.addEventListener("click", () => {
    if (secMenu !== null) {
      const visibility: string | null = secMenu.getAttribute("data-visible");
      if (visibility === "true") {
          secMenu.setAttribute("data-visible", "false");
      } else {
          secMenu.setAttribute("data-visible", "true");
      }
    }
  })
});


/////////////////////// MENU, FOOD SECTON ///////////////////////
foodJSON = fetchJSON("json/food.json");



const buildFoodPopup = () => {
  if (popupCoverDiv !== null) {
    popupCoverDiv.src = "./img/food/537.webp";
  }
  if (popupContentDiv !== null) {
    popupContentDiv.innerHTML = `<div class="title">
    <b>Natúr filézett harcsaszeletek baconbe göngyölve, fokhagyma mártással</b>
    <div class="btn">#117</div>
    </div>

    <div class="allergies">
      <b>Allergének:</b><div class="btn">Tej</div><div class="btn">Glutén</div>
    </div>

    <i class="bi bi-x-circle-fill popupExit"></i>`;

    const popupExitDivs: NodeListOf<HTMLElement> = document.querySelectorAll(".popupExit");

    // PopUp Exit
    popupExitDivs.forEach(exitDiv => {
      exitDiv.addEventListener("click", () => {
        if (popupWindowDiv !== null) {
          popupWindowDiv.style.display = "none"
        }
      })
    })
  }
  if (popupWindowDiv !== null) {
    popupWindowDiv.style.display = "block";
  }
}


// Allergen Functions
foodItems.forEach((foodItem: HTMLElement) => {
    foodItem.addEventListener("click", buildFoodPopup);
});

allergyBtns.forEach((allergyBtn: HTMLElement) => {
    allergyBtn.addEventListener("click", function () {
        const allergenNumber: string | undefined = this.dataset.allergen;

        if (allergenNumber !== undefined) {
            if (activeAllergens.has(allergenNumber)) {
                this.classList.remove("active");
                activeAllergens.delete(allergenNumber);
            } else {
                this.classList.add("active");
                activeAllergens.add(allergenNumber);
            }

            foodItems.forEach((foodItem: HTMLElement) => {
                const allergens: string | undefined = foodItem.dataset.allergens;
                if (allergens) {
                    const allergenArray: string[] = allergens.split(" ");
                    if (allergenArray.some(allergen => activeAllergens.has(allergen))) {
                        foodItem.style.opacity = ".1";
                    } else {
                        foodItem.style.removeProperty("opacity");
                    }
                }
            });
        }
    });
});



// PreLoader
const preLoaderFunc = async () => {
  const loadtime_bonus = loadtime <= 1 ? (1 - loadtime)*1000 : 0;
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  await delay(loadtime_bonus);

  if (preLoaderBox !== null) {
    preLoaderBox.style.transform = "translateY(-100%)";
  }
  if (appMenuBox !== null) {
    appMenuBox.style.transform = "translateY(0%)";
  }
}


// Header autohide
const headerTop = document.querySelector('#primaryMenu');
if (headerTop !== null) {
  window.addEventListener('scroll', () => {
    if (window.scrollY >= 65) {
        headerTop.classList.add('scroll');
    } else if (window.scrollY < 64) {
        headerTop.classList.remove('scroll');
    }
  });
}


loadtime = (new Date().getTime() - loadtime) / 1000;
window.addEventListener("load", preLoaderFunc);