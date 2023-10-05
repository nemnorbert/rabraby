let loadtime: number = new Date().getTime();

/////////////////////// Variables ///////////////////////
const secMenu: HTMLElement | null = document.querySelector('#secundaryMenu');
const preLoaderBox: HTMLElement | null = document.querySelector('#preLoader');
const appMenuBox: HTMLElement | null = document.querySelector('#appMenu');
const hamburgerBtns: NodeListOf<HTMLElement> = document.querySelectorAll(".hamBtns");

// Popup Window Variables
const popupWindowDiv: HTMLElement | null = document.querySelector('#popupWindow');
const popupCoverDiv: HTMLImageElement | null = document.querySelector('#popupCover');
const popupContentDiv: HTMLElement | null = document.querySelector('#popupContent');
const popupTitleDiv: HTMLElement | null = document.querySelector('#popupTitle');
const popupExitDivs: NodeListOf<HTMLElement> = document.querySelectorAll(".popupExit");

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