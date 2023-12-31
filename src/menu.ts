// Variables
const popupAllergyDiv: HTMLElement | null = document.querySelector('#popupAllergy');
const popupCodeDiv: HTMLElement | null = document.querySelector('#popupCode');
const popupPriceDiv: HTMLElement | null = document.querySelector('#popupPrice');
const popupPrice2Div: HTMLElement | null = document.querySelector('#popupPrice2');
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
// When click a Food Item
foodItems.forEach((foodItem: HTMLElement) => {
    foodItem.addEventListener("click", function () {
        if (popupContentDiv !== null) {
            let code: string | undefined = this.dataset.code;
            let name: string | undefined = this.dataset.name;
            let huf: string | undefined = this.dataset.price1;
            let price2: string | undefined = this.dataset.price2;

            let htmlContent = '<div id="foodBox">';
            htmlContent += `<img src="${siteINFO.mainPath}img/food/${code}_400px.webp" alt="Food Box Image">`;
            htmlContent += `<b>${name}</b>`;
            htmlContent += '</div>';

            /*
            if (popupCoverDiv !== null) {
                popupCoverDiv.src = siteINFO.mainPath + `img/food/${code}.webp`;
            }
            if (popupTitleDiv !== null && name !== undefined) {
                popupTitleDiv.innerHTML = name;
            }
            if (popupCodeDiv !== null) {
                popupCodeDiv.innerHTML = '#' + code;
            }
            if (popupPrice2Div !== null && price2 !== undefined) {
                popupPrice2Div.innerHTML = price2;
            }
            if (popupPriceDiv !== null) {
                popupPriceDiv.innerHTML = huf+" HUF";
            }

            let flags = siteJSON.languages.site;
            let htmlContent = '<div id="flagSwitch">';
            flags.forEach(flag => {
                htmlContent += `<a href="${siteINFO.mainPath+flag+"/"+siteINFO.page}"><img src="${siteINFO.mainPath}img/flag/${flag}.svg" alt="flag of ${flag}"></a>`;
            });
            */
            popupContentDiv.innerHTML = htmlContent;
        }
        popUpSwitcher();
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