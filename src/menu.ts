// Variables
const popupAllergyDiv: HTMLElement | null = document.querySelector('#popupAllergy');
const popupCodeDiv: HTMLElement | null = document.querySelector('#popupCode');
const popupPriceDiv: HTMLElement | null = document.querySelector('#popupPrice');
const foodItems: NodeListOf<HTMLElement> = document.querySelectorAll('.foodItem');
const allergyBtns: NodeListOf<HTMLElement> = document.querySelectorAll('.allergyBtn');
const activeAllergens: Set<string> = new Set();

let foodJSON: any;

interface FoodItem {
    id: string;
    huf: number;
    allergens: number[];
    category: string;
}


/////////////////////// MENU, FOOD SECTON ///////////////////////
const loadJSONFiles = async () => {
    try {
      foodJSON = await fetchJSON("json/food.json");
      //langJSON = await fetchJSON("json/language/hu.json");
    } catch (error) {
      console.error("Hiba történt a JSON fájlok betöltésekor:", error);
    }
  };
  loadJSONFiles();





// When click a Food Item
foodItems.forEach((foodItem: HTMLElement) => {
    foodItem.addEventListener("click", function () {
        let allergyAlert = true;

        if (foodItem.style.opacity === "0.1") {
            allergyAlert = window.confirm("Olyan allergént tartalmazhat amit kiválasztottál!")
        }

        if (allergyAlert) {
            const code: string | undefined = this.dataset.code;
            let food = foodJSON.food.find((item: FoodItem) => item.id === code);
    
            if (popupCoverDiv !== null) {
            popupCoverDiv.src = `./img/food/${code}.webp`;
            }
            if (popupTitleDiv !== null && code !== undefined) {
            popupTitleDiv.innerHTML = foodJSON.translate[code]["hu"];
            }
            if (popupCodeDiv !== null) {
            popupCodeDiv.innerHTML = '#' + code;
            }
            if (popupAllergyDiv !== null) {
            popupAllergyDiv.innerHTML = food.allergens.map((item: number) => {
                    return '<div class="btn">' + foodJSON.allergens["hu"][item-1]
                }).join("</div>");
            }
            if (popupPriceDiv !== null) {
                popupPriceDiv.innerHTML = food.huf.toLocaleString('hu-HU', { style: 'currency', currency: 'HUF', minimumFractionDigits: 0, maximumFractionDigits: 0 });
            }
    
            // PopUp Exit
            popupExitDivs.forEach(exitDiv => {
                exitDiv.addEventListener("click", () => {
                if (popupWindowDiv !== null) {
                    popupWindowDiv.style.display = "none"
                }
                })
            })
    
            if (popupWindowDiv !== null) {
                popupWindowDiv.style.display = "block";
            }
        }
        
    });
});

// Allergen Functions
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