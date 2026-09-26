/* ============================================
   TERRAGOW — Commodity Markets
   Main logic: render, tabs, theme, language
   ============================================ */

/* ===== STATE ===== */
let currentLang = 'en';
let currentTheme = 'light';

/* ===== INIT ===== */
document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    initNews();
    initArticles();
    detectBrowserLang();
    openTabFromHash();
   updateWidgetsTheme(currentTheme);
});

/* ===== NEWS ===== */
function initNews() {
    ['gold', 'oil', 'wheat'].forEach(category => {
        const container = document.getElementById(category + 'News');
        if (!container) return;

        // Сортируем: flash-новости сверху
        const items = [...newsData[category]].sort(
            (a, b) => (b.flash ? 1 : 0) - (a.flash ? 1 : 0)
        );

        container.innerHTML = items.map(item => `
            <div class="news-item ${item.flash ? 'flash' : ''}">
                <div class="news-item-header">
                    <span class="news-source">${item.source}</span>
                    ${item.flash ? '<span class="news-flash-icon">⚡</span>' : ''}
                    <span class="news-time">${item.time}</span>
                </div>
                <div class="news-title ${item.flash ? 'flash' : ''}">${item.title}</div>
            </div>
        `).join('');
    });
}

/* ===== ARTICLES =====
   В сайдбаре показываем 3 статьи (см. data.js).
   Каждая карточка — ссылка на отдельную HTML-страницу статьи.
*/
function initArticles() {
    ['gold', 'oil', 'wheat'].forEach(category => {
        const container = document.getElementById(category + 'Articles');
        if (!container) return;

        const articles = articlesData[category].slice(0, 3); // берём первые 3

        container.innerHTML = articles.map(art => `
            <a class="article-card" href="${art.url}">
                <div class="article-image">${art.emoji}</div>
                <div class="article-content">
                    <div class="article-tag">${art.tag}</div>
                    <div class="article-title">${art.title}</div>
                    <div class="article-meta">${art.date} · ${art.readTime} read</div>
                </div>
            </a>
        `).join('');
    });
}

/* ===== TABS ===== */
function switchTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabName);
    });
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.toggle('active', content.id === 'tab-' + tabName);
    });

    // Обновляем hash в адресной строке (index.html#gold / #oil / #wheat)
    history.replaceState(null, '', '#' + tabName);

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* Открываем нужный таб при загрузке страницы, если в URL есть #gold / #oil / #wheat */
function openTabFromHash() {
    const hash = window.location.hash.replace('#', '');
    const validTabs = ['gold', 'oil', 'wheat'];
    if (validTabs.includes(hash)) {
        switchTab(hash);
    }
}

/* ===== LANGUAGE ===== */
function detectBrowserLang() {
    const browserLang = (navigator.language || navigator.userLanguage || 'en').split('-')[0];
    const supported = ['en', 'ru', 'es', 'it', 'de', 'fr'];
    const lang = supported.includes(browserLang) ? browserLang : 'en';
    changeLang(lang);
}

function toggleLangMenu() {
    document.getElementById('langMenu').classList.toggle('active');
}

function changeLang(lang) {
    currentLang = lang;
    document.getElementById('currentLang').textContent = lang.toUpperCase();

    document.querySelectorAll('.lang-option').forEach(opt => {
        opt.classList.toggle('active', opt.dataset.lang === lang);
    });
    document.getElementById('langMenu').classList.remove('active');

    const t = translations[lang];

    // Табы
    document.querySelectorAll('.tab-btn').forEach(btn => {
        const tab = btn.dataset.tab;
        if (t[tab]) btn.querySelector('.tab-label').textContent = t[tab];
    });

    // Заголовки новостей
    document.querySelectorAll('.tab-news-title').forEach(el => {
        const section = el.closest('.tab-content');
        if (!section) return;
        const tab = section.id.replace('tab-', '');
        if (t[tab]) el.textContent = t.latestNews + ' — ' + t[tab];
    });

    // Заголовки аналитики
    document.querySelectorAll('.tab-articles-title').forEach(el => {
        const section = el.closest('.tab-content');
        if (!section) return;
        const tab = section.id.replace('tab-', '');
        if (t[tab]) el.textContent = t.analysis + ' — ' + t[tab];
    });

       // Футер
    document.querySelector('.footer-risk-title').textContent = t.riskTitle;
    document.querySelector('.footer-risk-text').textContent = t.riskText;

    // Запускаем авто-перевод через TerragowTranslate
    if (window.TerragowTranslate) {
        window.TerragowTranslate.setLang(lang);
    }


/* ===== THEME =====
   При переключении темы:
   1) сохраняем её в localStorage
   2) перезагружаем страницу (чтобы TradingView-виджеты получили новую тему)
*/
function initTheme() {
    const saved = localStorage.getItem('terragow-theme') || 'light';
    currentTheme = saved;
    document.documentElement.setAttribute('data-theme', saved);
    updateThemeIcon(saved);
}

function toggleTheme() {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    currentTheme = newTheme;
    localStorage.setItem('terragow-theme', newTheme);

    // 1. Меняем тему сайта (CSS)
    document.documentElement.setAttribute('data-theme', newTheme);
    updateThemeIcon(newTheme);

    // 2. Меняем тему всех виджетов TradingView на странице
    updateWidgetsTheme(newTheme);
}

/* Обновляет атрибут theme у всех виджетов TradingView */
function updateWidgetsTheme(theme) {
    const widgets = document.querySelectorAll(
        'tv-ticker-tape, tv-mini-chart, tv-market-data'
    );
    widgets.forEach(w => w.setAttribute('theme', theme));
}

function updateThemeIcon(theme) {
    const icon = document.getElementById('themeIcon');
    if (!icon) return;
    if (theme === 'dark') {
        icon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
    } else {
        icon.innerHTML = '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';
    }
}

/* Закрываем языковое меню при клике вне его */
document.addEventListener('click', function(e) {
    if (!e.target.closest('.lang-dropdown')) {
        const menu = document.getElementById('langMenu');
        if (menu) menu.classList.remove('active');
    }
});
