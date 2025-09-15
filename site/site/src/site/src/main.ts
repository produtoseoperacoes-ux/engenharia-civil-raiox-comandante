const app = document.querySelector<HTMLDivElement>("#app")!;
app.innerHTML = `
  <h1>TypeScript + GitHub Pages</h1>
  <button id="btn">Testar</button>
  <p id="out">Publicação automática (subpasta).</p>
`;
document.querySelector<HTMLButtonElement>("#btn")!.addEventListener("click", () => {
  const out = document.querySelector<HTMLParagraphElement>("#out")!;
  out.textContent = "OK: " + new Date().toISOString();
});
