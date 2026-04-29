(() => {
  const LANGUAGE_VOICE_MAP = {
    auto: 'en-US',
    ar: 'ar-SA',
    zh: 'zh-CN',
    cs: 'cs-CZ',
    nl: 'nl-NL',
    en: 'en-US',
    tl: 'fil-PH',
    fil: 'fil-PH',
    fr: 'fr-FR',
    de: 'de-DE',
    el: 'el-GR',
    he: 'he-IL',
    hi: 'hi-IN',
    hu: 'hu-HU',
    id: 'id-ID',
    it: 'it-IT',
    ja: 'ja-JP',
    ko: 'ko-KR',
    pl: 'pl-PL',
    pt: 'pt-PT',
    ro: 'ro-RO',
    ru: 'ru-RU',
    es: 'es-ES',
    sv: 'sv-SE',
    th: 'th-TH',
    tr: 'tr-TR',
    uk: 'uk-UA',
    vi: 'vi-VN'
  };

  const THEME_OPTIONS = [
    { value: 'midnight', label: 'Midnight Neon' },
    { value: 'aurora', label: 'Aurora Gem' },
    { value: 'daylight', label: 'Daylight Pearl' }
  ];

  const css = document.createElement('style');
  css.id = 'jewelry-box-hotfix-styles';
  css.textContent = `
    select {
      background-color: rgba(9, 11, 22, 0.96) !important;
      color: var(--text, #f6f3ff) !important;
      -webkit-text-fill-color: var(--text, #f6f3ff) !important;
    }

    select option,
    select optgroup {
      background: #111427 !important;
      color: #f6f3ff !important;
      -webkit-text-fill-color: #f6f3ff !important;
    }

    :root[data-theme="daylight"] select {
      background-color: rgba(255, 255, 255, 0.96) !important;
      color: #1c1a2e !important;
      -webkit-text-fill-color: #1c1a2e !important;
    }

    :root[data-theme="daylight"] select option,
    :root[data-theme="daylight"] select optgroup {
      background: #ffffff !important;
      color: #1c1a2e !important;
      -webkit-text-fill-color: #1c1a2e !important;
    }

    .hotfix-voice-btn {
      border: 1px solid var(--stroke, rgba(255,255,255,0.18)) !important;
      background: linear-gradient(135deg, var(--accent-2, #ff5ea8), var(--accent, #7ef0ff)) !important;
      color: var(--button-text, #08101a) !important;
    }

    .hotfix-voice-btn.is-listening {
      outline: 3px solid rgba(255, 255, 255, 0.32);
      box-shadow: 0 0 0 6px rgba(255, 94, 168, 0.18), 0 18px 34px rgba(0, 0, 0, 0.24) !important;
    }
  `;
  document.head.appendChild(css);

  function normalizeText(value) {
    return String(value || '').replace(/\s+/g, ' ').trim().toLowerCase();
  }

  function findThemeSelect() {
    const selects = [...document.querySelectorAll('select')];
    return selects.find(select => {
      const nearby = normalizeText([
        select.id,
        select.name,
        select.getAttribute('aria-label'),
        select.closest('.field')?.textContent,
        select.closest('.top-card')?.textContent,
        select.parentElement?.textContent
      ].filter(Boolean).join(' '));

      const options = [...select.options].map(option => normalizeText(option.textContent)).join(' ');
      return nearby.includes('appearance') || nearby.includes('theme') || options.includes('midnight neon');
    });
  }

  function repairThemeSelect() {
    const themeSelect = findThemeSelect();
    if (!themeSelect) return;

    const current = themeSelect.value || 'midnight';
    const existing = [...themeSelect.options].map(option => normalizeText(option.textContent));
    const missingChoices = THEME_OPTIONS.some(theme => !existing.includes(normalizeText(theme.label)));

    if (themeSelect.options.length < 3 || missingChoices) {
      themeSelect.innerHTML = THEME_OPTIONS
        .map(theme => `<option value="${theme.value}">${theme.label}</option>`)
        .join('');
    }

    const savedTheme = localStorage.getItem('jewelryBoxTheme') || current || 'midnight';
    applyTheme(savedTheme);
    themeSelect.value = ['aurora', 'daylight'].includes(savedTheme) ? savedTheme : 'midnight';

    themeSelect.addEventListener('change', () => applyTheme(themeSelect.value));
  }

  function applyTheme(theme) {
    const safeTheme = ['aurora', 'daylight'].includes(theme) ? theme : 'midnight';
    if (safeTheme === 'midnight') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', safeTheme);
    }
    localStorage.setItem('jewelryBoxTheme', safeTheme);
  }

  function findSourceSelect() {
    const selects = [...document.querySelectorAll('select')];
    return selects.find(select => {
      const text = normalizeText([
        select.id,
        select.name,
        select.getAttribute('aria-label'),
        select.closest('.field')?.textContent,
        select.parentElement?.textContent
      ].filter(Boolean).join(' '));
      return text.includes('source') || text.includes('from') || [...select.options].some(option => option.value === 'auto');
    }) || selects[0];
  }

  function findInputTextArea() {
    return document.querySelector('textarea:not([readonly])') || document.querySelector('[contenteditable="true"]');
  }

  function announce(message) {
    const status = document.querySelector('[role="status"], .status-marquee, #status, .status');
    if (status) {
      status.textContent = message;
    }
  }

  function dispatchInput(element) {
    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function setInputValue(element, value) {
    if (!element) return;
    if ('value' in element) {
      element.value = value;
    } else {
      element.textContent = value;
    }
    dispatchInput(element);
  }

  function buildVoiceButton() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const input = findInputTextArea();
    if (!input) return;

    const existingVoiceButton = [...document.querySelectorAll('button')].find(button => {
      const text = normalizeText(button.textContent || button.getAttribute('aria-label'));
      return text.includes('voice') || text.includes('mic') || text.includes('speak input') || text.includes('dictate');
    });

    const button = existingVoiceButton || document.createElement('button');
    button.type = 'button';
    button.classList.add('hotfix-voice-btn');
    button.textContent = '🎙 Voice Input';
    button.setAttribute('aria-label', 'Start voice input');

    if (!existingVoiceButton) {
      const actionArea = document.querySelector('.pane-actions') || document.querySelector('.top-actions') || input.parentElement;
      actionArea?.appendChild(button);
    }

    if (!SpeechRecognition) {
      button.disabled = true;
      button.title = 'Voice input is not supported in this browser. Chrome and Edge usually support it best.';
      announce('🎙 Voice input is not supported in this browser. Try Chrome or Edge.');
      return;
    }

    let recognition = null;
    let listening = false;

    button.addEventListener('click', () => {
      if (listening && recognition) {
        recognition.stop();
        return;
      }

      recognition = new SpeechRecognition();
      const sourceSelect = findSourceSelect();
      recognition.lang = LANGUAGE_VOICE_MAP[sourceSelect?.value] || 'en-US';
      recognition.interimResults = true;
      recognition.continuous = false;

      const originalText = 'value' in input ? input.value : input.textContent;
      let finalTranscript = '';

      recognition.onstart = () => {
        listening = true;
        button.classList.add('is-listening');
        button.textContent = '🎙 Listening...';
        announce(`🎙 Listening in ${recognition.lang}. Allow microphone permission if your browser asks.`);
      };

      recognition.onresult = event => {
        let interimTranscript = '';
        finalTranscript = '';

        for (let i = 0; i < event.results.length; i += 1) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        const combined = `${originalText ? `${originalText.trim()} ` : ''}${finalTranscript || interimTranscript}`.trim();
        setInputValue(input, combined);
      };

      recognition.onerror = event => {
        const detail = event.error === 'not-allowed'
          ? 'Microphone permission was blocked. Check browser/site permissions.'
          : `Voice input error: ${event.error || 'unknown error'}.`;
        announce(`⚠️ ${detail}`);
      };

      recognition.onend = () => {
        listening = false;
        button.classList.remove('is-listening');
        button.textContent = '🎙 Voice Input';
        if (finalTranscript) {
          announce('✨ Voice input captured. Translating now...');
        }
      };

      try {
        recognition.start();
      } catch (error) {
        announce('⚠️ Voice input could not start. Try again after a moment.');
      }
    });
  }

  function initHotfixes() {
    repairThemeSelect();
    buildVoiceButton();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHotfixes);
  } else {
    initHotfixes();
  }
})();
