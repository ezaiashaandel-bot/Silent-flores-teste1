const configBtn = document.getElementById("config");
const configMenu = document.getElementById("configMenu");
const backBtn = document.getElementById("back");

configBtn.addEventListener("click", () => {
    configMenu.style.display = "flex";
});

backBtn.addEventListener("click", () => {
    configMenu.style.display = "none";
});
