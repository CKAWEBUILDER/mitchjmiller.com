// The pre-paint theme script (docs/site-standards.md "Themes"), inlined at the top of every
// <head>: the stored choice (localStorage "mj2-theme", read inside try/catch) or else the system
// setting becomes <html data-theme>, before the body is parsed, so there is no flash of the wrong
// theme. Used by site/layouts/AgencyLayout.astro and, for the standalone SFC report, by
// scripts/finalize-parity.mjs.
export const themeScript = `(function(){var d=document.documentElement,t=null;try{t=localStorage.getItem('mj2-theme')}catch(e){}if(t!=='light'&&t!=='dark'){t=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}d.setAttribute('data-theme',t)})();`;
