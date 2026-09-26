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

    /* ===== ПЕРЕВОД ЧЕРЕЗ MYMEMORY ===== */
async function myMemoryTranslate(text, toLang) {
    if (toLang === 'en' || !text || text.trim().length < 2) return text;

    // Проверяем кэш
    const cacheKey = `${toLang}:${text}`;
    if (translationCache.has(cacheKey)) {
        return translationCache.get(cacheKey);
    }

    // Коды языков для MyMemory
    const langMap = {
        'en': 'en',
        'ru': 'ru',
        'es': 'es',
        'it': 'it',
        'de': 'de',
        'fr': 'fr'
    };

    try {
        // MyMemory API endpoint
        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${langMap[toLang]}&mt=1`;

        const response = await fetch(url);
        const data = await response.json();

        // Проверяем статус ответа
        if (data.responseStatus !== 200) {
            console.warn('MyMemory error:', data.responseDetails);
            return text;
        }

        const translated = data.responseData?.translatedText || text;

        // Сохраняем в кэш
        translationCache.set(cacheKey, translated);

        return translated;
    } catch (e) {
        console.warn('MyMemory error:', e);
        return text;
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
