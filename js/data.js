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
        { source: 'Reuters', flash: true,  title: 'Fed signals potential rate cuts in Q3, gold surges to 3-month high' },
        { source: 'Bloomberg', flash: false, title: 'Central banks add 39 tonnes of gold to reserves in May' },
        { source: 'CNBC', flash: false, title: 'Gold demand from India and China remains robust ahead of festival season' },
        { source: 'FT', flash: false, title: 'Geopolitical tensions in Middle East support safe-haven gold buying' },
        { source: 'WSJ' , flash: false, title: 'ETF gold holdings see largest weekly inflow since January' },
        { source: 'Reuters', flash: false, title: 'Dollar weakness provides tailwind for precious metals complex' },
        { source: 'Bloomberg', flash: false, title: 'Mining output disruptions in South Africa tighten supply' },
        { source: 'CNBC', flash: false, title: 'Analysts raise year-end gold price target to $2,500/oz' }
    ],
    oil: [
        { source: 'Reuters', flash: true,  title: 'OPEC+ agrees to extend production cuts through Q4 2026' },
        { source: 'Bloomberg', flash: false, title: 'US crude inventories fall by 4.2 million barrels last week' },
        { source: 'CNBC', flash: false, title: 'Brent crude tests $83 resistance as demand outlook improves' },
        { source: 'FT', flash: false, title: 'European refiners increase runs ahead of summer driving season' },
        { source: 'WSJ', flash: false, title: 'IEA raises 2026 global oil demand growth forecast to 1.1 mb/d' },
        { source: 'Reuters' , flash: false, title: 'Strait of Hormuz shipping concerns add risk premium to crude' },
        { source: 'Bloomberg', flash: false, title: 'US shale producers maintain disciplined capex despite higher prices' },
        { source: 'CNBC', flash: false, title: 'Natural gas prices rally on hotter-than-expected summer forecast' }
    ],
    wheat: [
        { source: 'Reuters', flash: true,  title: 'Black Sea grain deal uncertainty sends wheat futures higher' },
        { source: 'Bloomberg', flash: false, title: 'USDA cuts global wheat production estimate by 3.2 million tonnes' },
        { source: 'CNBC', flash: false, title: 'Drought conditions in Argentina threaten winter wheat crop' },
        { source: 'FT', flash: false, title: 'EU wheat exports accelerate as Black Sea supplies face disruption' },
        { source: 'WSJ', flash: false, title: 'India considers wheat import tender as domestic stocks deplete' },
        { source: 'Reuters', flash: false, title: 'Australian wheat harvest forecast revised down on El Nino impact' },
        { source: 'Bloomberg', flash: false, title: 'Fertilizer costs decline, easing pressure on wheat margins' },
        { source: 'CNBC', flash: false, title: 'Soybean-wheat spread narrows on shifting acreage expectations' }
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
/* ===== ПРОГНОЗ (Forecast) =====
   Редактируется вручную. Для каждого раздела — свой блок.
   
   Что можно менять:
   - tiker: тикер инструмента (например, 'BR1', 'XAUUSD', 'ZW1')
   - description: описание инструмента
   - resistance: массив из 3 значений (Day, Week, Month)
   - support: массив из 3 значений (Day, Week, Month)
*/
const forecastData = {
    gold: {
        tiker: 'XAUUSD',
        description: 'Spot Gold',
        resistance: ['2,380.00', '2,420.00', '2,500.00'],
        support:    ['2,320.00', '2,280.00', '2,200.00']
    },
    oil: {
        tiker: 'BR1',
        description: 'Futures ICE EUROPE',
        resistance: ['105.50', '110.55', '120.00'],
        support:    ['100.75', '85.70', '80.00']
    },
    wheat: {
        tiker: 'ZW1',
        description: 'Futures CBOT',
        resistance: ['720.00', '750.00', '800.00'],
        support:    ['680.00', '650.00', '600.00']
    }
};
