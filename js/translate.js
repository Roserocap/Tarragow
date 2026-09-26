/* ============================================
   TERRAGOW — Auto-translation
   Следит за DOM и переводит новые элементы
   через Apertium (бесплатно, без ключей)
   ============================================ */

(function() {
    'use strict';

    /* Языки, на которые переводим */
    const LANG_MAP = {
        'en': 'eng',
        'ru': 'rus',
        'es': 'spa',
        'it': 'ita',
        'de': 'deu',
        'fr': 'fra'
    };

    /* Текущий язык перевода */
    let currentLang = 'en';

    /* Хранилище оригинальных текстов (чтобы можно было откатить) */
    const originalTexts = new WeakMap();

    /* Кэш переводов (чтобы не переводить одно и то же дважды) */
    const translationCache = new Map();

    /* ===== ПЕРЕВОД ЧЕРЕЗ APERTIUM ===== */
    async function apertiumTranslate(text, toLang) {
        if (toLang === 'en' || !text || text.trim().length < 2) return text;

        // Проверяем кэш
        const cacheKey = `${toLang}:${text}`;
        if (translationCache.has(cacheKey)) {
            return translationCache.get(cacheKey);
        }

        try {
            const pair = `eng|${LANG_MAP[toLang]}`;
            const url = `https://apertium.org/apy/translate?langpair=${pair}&q=${encodeURIComponent(text)}&markUnknown=no`;

            const response = await fetch(url);
            const data = await response.json();
            const translated = data.responseData?.translatedText || text;

            // Сохраняем в кэш
            translationCache.set(cacheKey, translated);

            return translated;
        } catch (e) {
            console.warn('Apertium error:', e);
            return text;
        }
    }

    /* ===== ПЕРЕВОД ОДНОГО ЭЛЕМЕНТА ===== */
    async function translateElement(el) {
        if (currentLang === 'en') return;

        // Пропускаем тикеры и всё, что помечено notranslate
        if (el.closest('.ticker-section') ||
            el.closest('.notranslate') ||
            el.closest('tv-ticker-tape') ||
            el.closest('tv-mini-chart') ||
            el.closest('tv-market-data')) {
            return;
        }

        // Пропускаем уже переведённые
        if (el.hasAttribute('data-translated')) return;

        const originalText = el.textContent.trim();
        if (!originalText || originalText.length < 2) return;

        // Сохраняем оригинал
        if (!originalTexts.has(el)) {
            originalTexts.set(el, originalText);
        }

        const translated = await apertiumTranslate(originalText, currentLang);

        if (translated && translated !== originalText) {
            el.textContent = translated;
            el.setAttribute('data-translated', 'true');
        }
    }

    /* ===== ПЕРЕВОД ВСЕГО ДОКУМЕНТА ===== */
    async function translateAll() {
        if (currentLang === 'en') return;

        // Находим все текстовые элементы
        const selectors = [
            '.news-title',
            '.news-source',
            '.article-title',
            '.article-tag',
            '.article-meta',
            '.tab-news-title',
            '.tab-articles-title',
            '.section-title',
            '.section-label',
            '.footer-risk-title',
            '.footer-risk-text'
        ];

        for (const selector of selectors) {
            const elements = document.querySelectorAll(selector);
            for (const el of elements) {
                await translateElement(el);
            }
        }
    }

    /* ===== НАБЛЮДЕНИЕ ЗА ИЗМЕНЕНИЯМИ DOM ===== */
    function startObserver() {
        const observer = new MutationObserver((mutations) => {
            if (currentLang === 'en') return;

            for (const mutation of mutations) {
                // Новые узлы
                if (mutation.type === 'childList') {
                    for (const node of mutation.addedNodes) {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            // Ищем текстовые элементы внутри нового узла
                            const selectors = '.news-title, .news-source, .article-title, .article-tag, .article-meta';
                            const targets = node.matches?.(selectors)
                                ? [node]
                                : Array.from(node.querySelectorAll?.(selectors) || []);

                            for (const el of targets) {
                                translateElement(el);
                            }
                        }
                    }
                }

                // Изменения текста
                if (mutation.type === 'characterData') {
                    const parent = mutation.target.parentElement;
                    if (parent) {
                        translateElement(parent);
                    }
                }
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            characterData: true
        });

        return observer;
    }

    /* ===== ПУБЛИЧНОЕ API ===== */
    window.TerragowTranslate = {
        setLang: function(lang) {
            currentLang = lang || 'en';

            if (lang === 'en') {
                // Восстанавливаем оригиналы
                document.querySelectorAll('[data-translated]').forEach(el => {
                    const original = originalTexts.get(el);
                    if (original) {
                        el.textContent = original;
                        el.removeAttribute('data-translated');
                    }
                });
                return;
            }

            // Переводим всё заново
            translateAll();
        },

        getLang: function() {
            return currentLang;
        }
    };

    /* Запускаем наблюдатель при загрузке */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startObserver);
    } else {
        startObserver();
    }

})();