/* ==========================================================================
   TIME LINE OF VIDEO GAMES - CONTROLES DE ACESSIBILIDADE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  let fontScale = 1;
  const maxScale = 1.4;
  const minScale = 0.8;
  const liveRegion = document.getElementById('accessible-announcer');

  // Função para anunciar alterações a leitores de tela (ARIA Live)
  function announce(message) {
    if (liveRegion) {
      liveRegion.textContent = message;
    }
  }

  // Aumentar Fonte
  const btnIncrease = document.getElementById('btn-increase-font');
  if (btnIncrease) {
    btnIncrease.addEventListener('click', () => {
      if (fontScale < maxScale) {
        fontScale += 0.1;
        document.documentElement.style.setProperty('--font-scale', fontScale.toFixed(1));
        announce(`Tamanho da fonte aumentado para ${(fontScale * 100).toFixed(0)} por cento.`);
      }
    });
  }

  // Diminuir Fonte
  const btnDecrease = document.getElementById('btn-decrease-font');
  if (btnDecrease) {
    btnDecrease.addEventListener('click', () => {
      if (fontScale > minScale) {
        fontScale -= 0.1;
        document.documentElement.style.setProperty('--font-scale', fontScale.toFixed(1));
        announce(`Tamanho da fonte diminuído para ${(fontScale * 100).toFixed(0)} por cento.`);
      }
    });
  }

  // Resetar Fonte
  const btnReset = document.getElementById('btn-reset-font');
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      fontScale = 1.0;
      document.documentElement.style.setProperty('--font-scale', '1');
      announce('Tamanho da fonte restaurado para o padrão.');
    });
  }

  // Alternar Alto Contraste
  const btnContrast = document.getElementById('btn-high-contrast');
  if (btnContrast) {
    btnContrast.addEventListener('click', () => {
      document.body.classList.toggle('high-contrast');
      const isHighContrast = document.body.classList.contains('high-contrast');
      btnContrast.setAttribute('aria-pressed', isHighContrast);
      announce(isHighContrast ? 'Modo de alto contraste ativado.' : 'Modo de alto contraste desativado.');
    });
  }
});