let loadtime: number = new Date().getTime();

/////////////////////// Variables ///////////////////////
let siteJSON;
const secMenu: HTMLElement | null = document.querySelector('#secundaryMenu');
const preLoaderBox: HTMLElement | null = document.querySelector('#preLoader');
const appMenuBox: HTMLElement | null = document.querySelector('#appMenu');
const homeCover: HTMLElement | null = document.querySelector('#homeCover');
const hamburgerBtns: NodeListOf<HTMLElement> = document.querySelectorAll(".hamBtns");
const flagDiv: HTMLImageElement | null = document.querySelector('#flag');
let flagsIMGs: NodeListOf<HTMLElement>;

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
        setTimeout(() => {
          secMenu.style.display = "none";
        }, 200);
      } else {
        secMenu.style.display = "flex";
        setTimeout(() => {
          secMenu.setAttribute("data-visible", "true");
        }, 200);
      }
    }
  });
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

// Video Cover Loader
const fastConnection = () => {
  if (homeCover !== null) {
    homeCover.innerHTML = `<video src="${siteINFO.mainPath}img/video1.mp4" loop="" autoplay="" poster="" muted="" playsinline=""></video>`
  }
}

// PreLoader
const preLoader = async () => {
  loadtime = (new Date().getTime() - loadtime) / 1000;
  console.log(loadtime);

  const loadtime_bonus = loadtime <= 1 ? (1 - loadtime)*1000 : 0;
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  await delay(loadtime_bonus);

  if (loadtime < 4) {
    fastConnection();
  }

  if (preLoaderBox !== null) {
    preLoaderBox.style.transform = "translateY(-100%)";
    setTimeout(() => {
      preLoaderBox.style.display = "none";
    }, 500);
  }
}


/* Header autohide
const headerTop = document.querySelector('#primaryMenu');
if (headerTop !== null) {
  window.addEventListener('scroll', () => {
    if (window.scrollY >= 20) {
        headerTop.classList.add('scroll');
    } else if (window.scrollY < 64) {
        headerTop.classList.remove('scroll');
    }
  });
}*/

// Language Switcher
if (flagDiv !== null) {
  flagDiv.addEventListener("click", () => {
    let flagSwitch: HTMLElement | null = document.querySelector('#flagSwitch');
    if (popupContentDiv !== null && flagSwitch === null) {
      let flags = siteJSON.languages.site;
      let htmlContent = '<div id="flagSwitch">';
      flags.forEach(flag => {
        htmlContent += `<a href="${siteINFO.mainPath+flag+"/"+siteINFO.page}"><img src="${siteINFO.mainPath}img/flag/${flag}.svg" alt="flag of ${flag}"></a>`;
      });
      htmlContent += '</div>';
      popupContentDiv.innerHTML = htmlContent;
    }
    popUpSwitcher();
  });
}

// Auto hide
let timeout:number;
let prevScrollPos = window.pageYOffset;

window.addEventListener("scroll", function() {
  if (window.innerWidth < 768) {
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      const currentScrollPos = window.pageYOffset;
      if (prevScrollPos > currentScrollPos) {
        appMenuBox.style.bottom = "0";
      } else {
        appMenuBox.style.bottom = "-65px";
      }
      prevScrollPos = currentScrollPos;
    }, 200);
  }
});


popupExitDivs.forEach(exitDiv => {
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
window.addEventListener("load", preLoader);