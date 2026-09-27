/* ============================================
   TERRAGOW — Google Sheets Loader
   Читает данные из опубликованной Google Таблицы
   и заменяет статический data.js
   ============================================ */

(function() {
    'use strict';

    /* ===== НАСТРОЙКИ =====
       Ссылка на опубликованную таблицу в формате TSV.
       Если таблица изменится — замени ссылку здесь.
    */
    const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTqr0_7MH95VKyGITK7EYcKmTB2nOUWTolAuBwozni9UXLH1SNtbfbCFLOsFg-bLB6Ulnj30hVSET8P/pub?gid=0&single=true&output=tsv';

    /* ===== ЗАГРУЗКА ДАННЫХ ===== */
    async function loadSheetData() {
        try {
            const response = await fetch(SHEET_URL);
            if (!response.ok) throw new Error('Network error: ' + response.status);

            const text = await response.text();
            return parseTSV(text);
        } catch (e) {
            console.error('Failed to load sheet:', e);
            return null;
        }
    }

    /* ===== ПАРСИНГ TSV ===== */
    function parseTSV(text) {
        // Разбиваем на строки, убираем \r
        const lines = text.split('\n').map(l => l.replace(/\r$/, ''));

        const result = {
            news: { gold: [], oil: [], wheat: [] },
            forecast: { gold: null, oil: null, wheat: null }
        };

        let mode = null;         // 'news' или 'forecast'
        let category = null;     // 'gold' | 'oil' | 'wheat'
        let isFirstRow = false;  // пропускаем строку заголовков в прогнозах

        for (const line of lines) {
            // Разбиваем по табу
            const cols = line.split('\t').map(c => c.trim());
            const first = cols[0] || '';

            // Пропускаем пустые строки
            if (line.trim() === '') continue;

            // Проверяем маркер
            if (first.startsWith('* ')) {
                const marker = first.substring(2).trim().toUpperCase();

                if (marker === 'NEWS GOLD')    { mode = 'news';     category = 'gold';  continue; }
                if (marker === 'NEWS OIL')     { mode = 'news';     category = 'oil';   continue; }
                if (marker === 'NEWS WHEAT')   { mode = 'news';     category = 'wheat'; continue; }
                if (marker === 'FORECAST GOLD')  { mode = 'forecast'; category = 'gold';  isFirstRow = true; continue; }
                if (marker === 'FORECAST OIL')   { mode = 'forecast'; category = 'oil';   isFirstRow = true; continue; }
                if (marker === 'FORECAST WHEAT') { mode = 'forecast'; category = 'wheat'; isFirstRow = true; continue; }
            }

            // Обработка строк данных
            if (mode === 'news') {
                // A: источник, B: flash, C: заголовок
                if (cols[0] && cols[2]) {
                    result.news[category].push({
                        source: cols[0],
                        flash: cols[1].toUpperCase() === 'TRUE',
                        title: cols[2]
                    });
                }
            } else if (mode === 'forecast') {
                // Пропускаем строку заголовков
                if (isFirstRow) {
                    isFirstRow = false;
                    continue;
                }

                // A: тикер, B: описание, C-H: цифры
                if (cols[0] && cols[1]) {
                    result.forecast[category] = {
                        tiker: cols[0],
                        description: cols[1],
                        resistance: [cols[2], cols[3], cols[4]],
                        support:    [cols[5], cols[6], cols[7]]
                    };
                }
            }
        }

        return result;
    }

    /* ===== ЗАМЕНА ДАННЫХ НА САЙТЕ ===== */
    function applyData(data) {
        if (!data) return;

        // Заменяем newsData (глобальный из data.js)
        if (typeof window.newsData !== 'undefined') {
            window.newsData.gold  = data.news.gold;
            window.newsData.oil   = data.news.oil;
            window.newsData.wheat = data.news.wheat;
        }

        // Заменяем forecastData (глобальный из data.js)
        if (typeof window.forecastData !== 'undefined') {
            window.forecastData.gold  = data.forecast.gold;
            window.forecastData.oil   = data.forecast.oil;
            window.forecastData.wheat = data.forecast.wheat;
        }
    }

    /* ===== ОБНОВЛЕНИЕ ИНТЕРФЕЙСА ===== */
    function refreshUI() {
        if (typeof initNews === 'function')     initNews();
        if (typeof initForecast === 'function') initForecast();
    }

    /* ===== ИНИЦИАЛИЗАЦИЯ ===== */
    async function init() {
        const data = await loadSheetData();
        if (data) {
            applyData(data);
            refreshUI();
        }
    }

    /* Запускаем после загрузки страницы, но с небольшой задержкой,
       чтобы main.js успел отрисовать начальные данные */
    window.addEventListener('load', () => {
        setTimeout(init, 100);

        // Автообновление раз в 15 минут
        setInterval(init, 15 * 60 * 1000);
    });

    /* Экспортируем для ручного вызова */
    window.TerragowSheets = { refresh: init };

})();