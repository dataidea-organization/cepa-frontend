export const THEME_STORAGE_KEY = "cepa-theme";

/**
 * Runs before first paint (inlined in <head> by layout.tsx) so there is no flash of the
 * wrong theme. An explicit visitor choice wins; otherwise follow the OS preference.
 */
export const themeInitScript = `(function(){try{var s=localStorage.getItem("${THEME_STORAGE_KEY}");var d=s?s==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;if(d)document.documentElement.classList.add("dark");}catch(e){}})();`;
