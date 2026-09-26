/* ============================================
   TERRAGOW — Commodity Markets
   Data: news, articles, translations
   ============================================ */

/* ===== НОВОСТИ =====
   Правила:
   - "flash: true" — выделяет новость (синий фон + ⚡)
   - "time" — время в формате 'HH:MM'
   - "source" — источник (Reuters, Bloomberg, и т.д.)
   
   Чтобы добавить новость — просто скопируй строку { ... } и поменяй данные.
*/
const newsData = {
    gold: [
        { source: 'Reuters',   time: '14:32', flash: true,  title: 'Fed signals potential rate cuts in Q3, gold surges to 3-month high' },
        { source: 'Bloomberg', time: '13:15', flash: false, title: 'Central banks add 39 tonnes of gold to reserves in May' },
        { source: 'CNBC',      time: '11:48', flash: false, title: 'Gold demand from India and China remains robust ahead of festival season' },
        { source: 'FT',        time: '10:22', flash: false, title: 'Geopolitical tensions in Middle East support safe-haven gold buying' },
        { source: 'WSJ',       time: '09:05', flash: false, title: 'ETF gold holdings see largest weekly inflow since January' },
        { source: 'Reuters',   time: '08:30', flash: false, title: 'Dollar weakness provides tailwind for precious metals complex' },
        { source: 'Bloomberg', time: '07:15', flash: false, title: 'Mining output disruptions in South Africa tighten supply' },
        { source: 'CNBC',      time: '06:00', flash: false, title: 'Analysts raise year-end gold price target to $2,500/oz' }
    ],
    oil: [
        { source: 'Reuters',   time: '14:45', flash: true,  title: 'OPEC+ agrees to extend production cuts through Q4 2026' },
        { source: 'Bloomberg', time: '13:20', flash: false, title: 'US crude inventories fall by 4.2 million barrels last week' },
        { source: 'CNBC',      time: '12:10', flash: false, title: 'Brent crude tests $83 resistance as demand outlook improves' },
        { source: 'FT',        time: '10:55', flash: false, title: 'European refiners increase runs ahead of summer driving season' },
        { source: 'WSJ',       time: '09:40', flash: false, title: 'IEA raises 2026 global oil demand growth forecast to 1.1 mb/d' },
        { source: 'Reuters',   time: '08:25', flash: false, title: 'Strait of Hormuz shipping concerns add risk premium to crude' },
        { source: 'Bloomberg', time: '07:00', flash: false, title: 'US shale producers maintain disciplined capex despite higher prices' },
        { source: 'CNBC',      time: '05:30', flash: false, title: 'Natural gas prices rally on hotter-than-expected summer forecast' }
    ],
    wheat: [
        { source: 'Reuters',   time: '15:00', flash: true,  title: 'Black Sea grain deal uncertainty sends wheat futures higher' },
        { source: 'Bloomberg', time: '13:45', flash: false, title: 'USDA cuts global wheat production estimate by 3.2 million tonnes' },
        { source: 'CNBC',      time: '12:30', flash: false, title: 'Drought conditions in Argentina threaten winter wheat crop' },
        { source: 'FT',        time: '11:15', flash: false, title: 'EU wheat exports accelerate as Black Sea supplies face disruption' },
        { source: 'WSJ',       time: '10:00', flash: false, title: 'India considers wheat import tender as domestic stocks deplete' },
        { source: 'Reuters',   time: '08:50', flash: false, title: 'Australian wheat harvest forecast revised down on El Nino impact' },
        { source: 'Bloomberg', time: '07:30', flash: false, title: 'Fertilizer costs decline, easing pressure on wheat margins' },
        { source: 'CNBC',      time: '06:15', flash: false, title: 'Soybean-wheat spread narrows on shifting acreage expectations' }
    ]
};

/* ===== СТАТЬИ =====
   Правила:
   - В сайдбаре каждого раздела показываются ПЕРВЫЕ 3 статьи (см. main.js)
   - "url" — путь к HTML-файлу статьи (относительно корня сайта)
   - "image" — эмодзи-заглушка для карточки (можно заменить на <img src="...">, см. main.js)
   
   Чтобы добавить статью:
   1) Скопируй строку { ... } в нужный раздел
   2) Поменяй данные
   3) Создай HTML-файл статьи в articles/ (см. _template.html)
*/
const articlesData = {
    gold: [
        {
            tag: 'Technical Analysis',
            title: "Gold Breaks Key Resistance at $2,340: What's Next?",
            date: 'Jun 12, 2026',
            readTime: '5 min',
            emoji: '📊',
            url: 'articles/gold-breaks-2340.html'
        },
        {
            tag: 'Macro',
            title: 'How Central Bank Buying Is Reshaping the Gold Market',
            date: 'Jun 10, 2026',
            readTime: '8 min',
            emoji: '🏦',
            url: 'articles/central-banks-gold.html'
        },
        {
            tag: 'Strategy',
            title: 'Gold vs. Bitcoin: The New Safe-Haven Debate',
            date: 'Jun 8, 2026',
            readTime: '6 min',
            emoji: '⚖️',
            url: 'articles/gold-vs-bitcoin.html'
        }
    ],
    oil: [
        {
            tag: 'Market Outlook',
            title: 'Brent at $85: Is the Rally Sustainable?',
            date: 'Jun 12, 2026',
            readTime: '7 min',
            emoji: '🛢️',
            url: 'articles/brent-85-rally.html'
        },
        {
            tag: 'Geopolitics',
            title: 'Middle East Tensions and Oil Supply Risk Assessment',
            date: 'Jun 11, 2026',
            readTime: '9 min',
            emoji: '🌍',
            url: 'articles/middle-east-oil.html'
        },
        {
            tag: 'Energy Transition',
            title: 'EV Adoption vs. Oil Demand: The 2030 Outlook',
            date: 'Jun 9, 2026',
            readTime: '10 min',
            emoji: '🔋',
            url: 'articles/ev-vs-oil-2030.html'
        }
    ],
    wheat: [
        {
            tag: 'Agriculture',
            title: 'Global Wheat Supply Chain Under Stress',
            date: 'Jun 12, 2026',
            readTime: '6 min',
            emoji: '🌾',
            url: 'articles/wheat-supply-chain.html'
        },
        {
            tag: 'Weather',
            title: 'El Nino Impact on South American Wheat Production',
            date: 'Jun 11, 2026',
            readTime: '7 min',
            emoji: '🌡️',
            url: 'articles/el-nino-wheat.html'
        },
        {
            tag: 'Trade',
            title: "India's Wheat Import Strategy: Implications for Global Markets",
            date: 'Jun 10, 2026',
            readTime: '8 min',
            emoji: '📦',
            url: 'articles/india-wheat-import.html'
        }
    ]
};

/* ===== ПЕРЕВОДЫ =====
   Используются для переключения языка интерфейса (табы, заголовки, футер).
   Сами тексты новостей и статей НЕ переводятся этим механизмом —
   для них используется Google Translate (см. index.html).
*/
const translations = {
    en: {
        gold: 'Gold', oil: 'Oil', wheat: 'Wheat',
        latestNews: 'Latest News', analysis: 'Analysis',
        riskTitle: 'Risk Disclaimer',
        riskText: 'Trading in commodities, futures, and derivatives involves substantial risk of loss and is not suitable for all investors. Past performance is not indicative of future results. Terragow provides market information and analysis for educational purposes only and does not constitute investment advice. Please consult a licensed financial advisor before making any investment decisions.'
    },
    ru: {
        gold: 'Золото', oil: 'Нефть', wheat: 'Пшеница',
        latestNews: 'Последние новости', analysis: 'Аналитика',
        riskTitle: 'Предупреждение о рисках',
        riskText: 'Торговля товарами, фьючерсами и деривативами связана с существенным риском убытков и не подходит для всех инвесторов. Прошлые результаты не гарантируют будущих. Terragow предоставляет рыночную информацию и аналитику исключительно в образовательных целях и не является инвестиционной рекомендацией. Проконсультируйтесь с лицензированным финансовым советником перед принятием инвестиционных решений.'
    },
    es: {
        gold: 'Oro', oil: 'Petróleo', wheat: 'Trigo',
        latestNews: 'Últimas Noticias', analysis: 'Análisis',
        riskTitle: 'Aviso de Riesgo',
        riskText: 'El comercio de materias primas, futuros y derivados conlleva un riesgo sustancial de pérdida y no es adecuado para todos los inversores. El rendimiento pasado no es indicativo de resultados futuros. Terragow proporciona información y análisis de mercado únicamente con fines educativos y no constituye asesoramiento de inversión. Consulte a un asesor financiero autorizado antes de tomar decisiones de inversión.'
    },
    it: {
        gold: 'Oro', oil: 'Petrolio', wheat: 'Grano',
        latestNews: 'Ultime Notizie', analysis: 'Analisi',
        riskTitle: 'Avviso di Rischio',
        riskText: "Il trading di materie prime, futures e derivati comporta un rischio sostanziale di perdita e non è adatto a tutti gli investitori. Le performance passate non sono indicative dei risultati futuri. Terragow fornisce informazioni e analisi di mercato solo a scopo educativo e non costituisce consulenza d'investimento. Si prega di consultare un consulente finanziario autorizzato prima di prendere decisioni di investimento."
    },
    de: {
        gold: 'Gold', oil: 'Öl', wheat: 'Weizen',
        latestNews: 'Neueste Nachrichten', analysis: 'Analyse',
        riskTitle: 'Risikohinweis',
        riskText: 'Der Handel mit Rohstoffen, Futures und Derivaten birgt ein erhebliches Verlustrisiko und ist nicht für alle Anleger geeignet. Die vergangene Performance ist kein Indikator für zukünftige Ergebnisse. Terragow stellt Marktinformationen und Analysen ausschließlich zu Bildungszwecken bereit und stellt keine Anlageberatung dar. Bitte konsultieren Sie einen lizenzierten Finanzberater, bevor Sie Anlageentscheidungen treffen.'
    },
    fr: {
        gold: 'Or', oil: 'Pétrole', wheat: 'Blé',
        latestNews: 'Dernières Nouvelles', analysis: 'Analyse',
        riskTitle: 'Avertissement sur les Risques',
        riskText: "Le trading de matières premières, de contrats à terme et de dérivés comporte un risque substantiel de perte et n'est pas adapté à tous les investisseurs. Les performances passées ne sont pas indicatives des résultats futurs. Terragow fournit des informations et des analyses de marché uniquement à des fins éducatives et ne constitue pas un conseil en investissement. Veuillez consulter un conseiller financier agréé avant de prendre des décisions d'investissement."
    }
};