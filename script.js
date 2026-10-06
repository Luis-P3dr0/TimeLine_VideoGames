/* ==========================================================================
   TIME LINE OF VIDEO GAMES - CONTROLES DE ACESSIBILIDADE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const maxScale = 1.4;
  const minScale = 0.8;
  const defaultScale = 1;
  const liveRegion = document.getElementById('accessible-announcer');
  const storageKey = 'timeline-accessibility-settings';

  const getSettings = () => {
    try {
      const stored = JSON.parse(localStorage.getItem(storageKey) || '{}');
      return {
        fontScale: Number(stored.fontScale) || defaultScale,
        highContrast: Boolean(stored.highContrast),
        readingMode: Boolean(stored.readingMode)
      };
    } catch (error) {
      return { fontScale: defaultScale, highContrast: false, readingMode: false };
    }
  };

  let settings = getSettings();
  let fontScale = settings.fontScale;

  function saveSettings() {
    localStorage.setItem(storageKey, JSON.stringify({
      fontScale,
      highContrast: document.body.classList.contains('high-contrast'),
      readingMode: document.body.classList.contains('reading-mode')
    }));
  }

  function announce(message) {
    if (liveRegion) {
      liveRegion.textContent = message;
    }
  }

  function applyFontScale() {
    document.documentElement.style.setProperty('--font-scale', fontScale.toFixed(1));
  }

  function applyContrastState(forceState = null) {
    const contrastButton = document.getElementById('btn-high-contrast');
    const shouldBeHighContrast = forceState ?? document.body.classList.contains('high-contrast');

    document.body.classList.toggle('high-contrast', shouldBeHighContrast);

    if (contrastButton) {
      contrastButton.setAttribute('aria-pressed', String(shouldBeHighContrast));
      contrastButton.textContent = shouldBeHighContrast ? 'Contraste On' : 'Alto Contraste';
    }

    saveSettings();
  }

  function applyReadingMode(forceState = null) {
    const readingButton = document.getElementById('btn-reading-mode');
    const shouldUseReadingMode = forceState ?? document.body.classList.contains('reading-mode');

    document.body.classList.toggle('reading-mode', shouldUseReadingMode);

    if (readingButton) {
      readingButton.setAttribute('aria-pressed', String(shouldUseReadingMode));
      readingButton.textContent = shouldUseReadingMode ? 'Leitura On' : 'Leitura Simples';
    }

    saveSettings();
  }

  applyFontScale();
  applyContrastState(settings.highContrast);
  applyReadingMode(settings.readingMode);

  const toolbar = document.querySelector('.accessibility-toolbar');
  if (toolbar && !document.getElementById('btn-reading-mode')) {
    const readingButton = document.createElement('button');
    readingButton.id = 'btn-reading-mode';
    readingButton.type = 'button';
    readingButton.setAttribute('aria-label', 'Ativar modo de leitura simples');
    readingButton.textContent = 'Leitura Simples';
    readingButton.addEventListener('click', () => {
      const isReadingMode = !document.body.classList.contains('reading-mode');
      applyReadingMode(isReadingMode);
      announce(isReadingMode ? 'Modo de leitura simples ativado.' : 'Modo de leitura simples desativado.');
    });
    toolbar.appendChild(readingButton);
  }

  const backToTopButton = document.createElement('a');
  backToTopButton.id = 'back-to-top';
  backToTopButton.href = '#main-content';
  backToTopButton.textContent = 'Voltar ao topo';
  backToTopButton.setAttribute('aria-label', 'Voltar ao topo da página');
  document.body.appendChild(backToTopButton);

  const btnIncrease = document.getElementById('btn-increase-font');
  if (btnIncrease) {
    btnIncrease.addEventListener('click', () => {
      if (fontScale < maxScale) {
        fontScale = Number((fontScale + 0.1).toFixed(1));
        applyFontScale();
        saveSettings();
        announce(`Tamanho da fonte aumentado para ${(fontScale * 100).toFixed(0)} por cento.`);
      }
    });
  }

  const btnDecrease = document.getElementById('btn-decrease-font');
  if (btnDecrease) {
    btnDecrease.addEventListener('click', () => {
      if (fontScale > minScale) {
        fontScale = Number((fontScale - 0.1).toFixed(1));
        applyFontScale();
        saveSettings();
        announce(`Tamanho da fonte diminuído para ${(fontScale * 100).toFixed(0)} por cento.`);
      }
    });
  }

  const btnReset = document.getElementById('btn-reset-font');
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      fontScale = defaultScale;
      applyFontScale();
      saveSettings();
      announce('Tamanho da fonte restaurado para o padrão.');
    });
  }

  const btnContrast = document.getElementById('btn-high-contrast');
  if (btnContrast) {
    btnContrast.addEventListener('click', () => {
      const isHighContrast = !document.body.classList.contains('high-contrast');
      applyContrastState(isHighContrast);
      announce(isHighContrast ? 'Modo de alto contraste ativado.' : 'Modo de alto contraste desativado.');
    });
  }
});