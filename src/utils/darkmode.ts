const storageName = 'darkmode';

function checkIt() {
    const storage = localStorage.getItem(storageName);
    const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (storage !== null) { return JSON.parse(storage) === true; }
    if (prefers) { return true; }
    return false;
}

export default function (switchTo = false) {
    let isDark;
    if (!switchTo) {
        isDark = checkIt();
    } else {
        const theme = document.documentElement.className;
        isDark = theme !== "dark";
    }

    if (isDark) {
        document.documentElement.className = "dark";
        if (switchTo) {
            localStorage.setItem(storageName, JSON.stringify(true));
        }
    } else {
        document.documentElement.className = "light";
        if (switchTo) {
            localStorage.setItem(storageName, JSON.stringify(false));
        }
    }
}