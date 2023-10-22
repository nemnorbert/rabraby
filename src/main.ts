let loadtime: number = new Date().getTime();

/////////////////////// Variables ///////////////////////
let siteJSON;
const secMenu: HTMLElement | null = document.querySelector('#secundaryMenu');
const preLoaderBox: HTMLElement | null = document.querySelector('#preLoader');
const appMenuBox: HTMLElement | null = document.querySelector('#appMenu');
const hamburgerBtns: NodeListOf<HTMLElement> = document.querySelectorAll(".hamBtns");
const flagDiv: HTMLElement | null = document.querySelector('#flag');

// Popup Window Variables
const popupWindowDiv: HTMLElement | null = document.querySelector('#popUp');
const popupContentDiv: HTMLElement | null = document.querySelector('#popUpContent');
const popupExitDivs: NodeListOf<HTMLElement> = document.querySelectorAll(".popupExit");
/*
const popupCoverDiv: HTMLImageElement | null = document.querySelector('#popupCover');
const popupTitleDiv: HTMLElement | null = document.querySelector('#popupTitle');
*/

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


const popUpSwitcher = () => {
  if (popupWindowDiv !== null) {
    if (popupWindowDiv.style.display === "none") {
      popupWindowDiv.style.display = "flex"
    } else {
      popupWindowDiv.style.display = "none"
    }
  }
}

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

// Language Switcher
if (flagDiv !== null) {
  flagDiv.addEventListener("click", () => {
    if (popupContentDiv !== null) {
      let flags = siteJSON.languages.site;
      let htmlContent = '<b>Nyelvek</b>';
      htmlContent += '<div class="flags">';
      flags.forEach(flag => {
        htmlContent += `<div class="flag"><img src="${siteINFO.mainPath}img/flag/${flag}.svg" alt="flag of ${flag}"></div>`;
      });
      htmlContent += '</div>';
      popupContentDiv.innerHTML = htmlContent;
    }
    popUpSwitcher();
  });
}


popupExitDivs.forEach((exitDiv) => {
  exitDiv.addEventListener("click", popUpSwitcher)
})

async function asyncFunction() {
  try {
    siteJSON = await fetchJSON(siteINFO.mainPath + "json/site.json");
  } catch (error) {
    console.error("Hiba történt:", error);
  }
}

asyncFunction();

// END
loadtime = (new Date().getTime() - loadtime) / 1000;
window.addEventListener("load", preLoaderFunc);