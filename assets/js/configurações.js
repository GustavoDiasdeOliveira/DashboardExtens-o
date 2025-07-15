document.addEventListener("DOMContentLoaded", () => {
  const themeButtons = document.querySelectorAll(".theme-button");
  const backgroundThemeRadios = document.querySelectorAll('input[name="background-theme"]');
  const saveButton = document.querySelector(".save-button");
  const container = document.querySelector(".container");
  const body = document.body;

  // Elementos que terão o tema aplicado
  const themedElements = document.querySelectorAll(`
    .projectCard, .left, .right, header, main, 
    .settings-header, .settings-section, .save-button,
    .inputBx, .searchBx, .user, .title, .logout, nav ul li a,
    .searchBx input, .user h2, .user span, .user .arrow, 
    .user .toggle, .logo h2, .container
  `);

  // Aplica o tema dos cards (light/dark)
  function applyCardTheme(theme) {
    // Remove active de todos os botões, adiciona ao selecionado
    themeButtons.forEach(button => button.classList.remove("active"));
    const selectedButton = document.querySelector(`.theme-button[data-theme="${theme}"]`);
    if (selectedButton) selectedButton.classList.add("active");

    // Remove classes card-light e card-dark dos elementos com tema
    themedElements.forEach(el => {
      el.classList.remove("card-light", "card-dark");
    });

    // Define se é dark ou light (considerando "system")
    const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    const themeClass = isDark ? "card-dark" : "card-light";

    // Aplica a classe correspondente
    themedElements.forEach(el => el.classList.add(themeClass));
  }

  // Aplica tema de fundo do body
  function applyBackgroundTheme(theme) {
    // Remove classes bg- existentes no body
    body.classList.forEach(c => {
      if (c.startsWith("bg-")) body.classList.remove(c);
    });

    body.classList.add(`bg-${theme}`);

    // Atualiza os radios para refletir a seleção
    backgroundThemeRadios.forEach(radio => {
      radio.checked = radio.value === theme;
    });
  }

  // Salva preferências no localStorage
  function savePreferences() {
    const selectedCardTheme = document.querySelector(".theme-button.active")?.dataset.theme || "light";
    const selectedBackgroundTheme = document.querySelector('input[name="background-theme"]:checked')?.value || "purple";

    localStorage.setItem("cardTheme", selectedCardTheme);
    localStorage.setItem("backgroundTheme", selectedBackgroundTheme);

    alert("Preferências salvas com sucesso!");
  }

  // Carrega preferências do localStorage
  function loadPreferences() {
    const savedCardTheme = localStorage.getItem("cardTheme") || "light";
    const savedBackgroundTheme = localStorage.getItem("backgroundTheme") || "purple";

    applyCardTheme(savedCardTheme);
    applyBackgroundTheme(savedBackgroundTheme);
  }

  // Eventos dos botões de tema
  themeButtons.forEach(button => {
    button.addEventListener("click", () => {
      applyCardTheme(button.dataset.theme);
    });
  });

  // Eventos dos radios de fundo
  backgroundThemeRadios.forEach(radio => {
    radio.addEventListener("change", () => {
      applyBackgroundTheme(radio.value);
    });
  });

  // Evento do botão salvar
  if (saveButton) {
    saveButton.addEventListener("click", savePreferences);
  }

  // Inicializa com as preferências salvas
  loadPreferences();
});
