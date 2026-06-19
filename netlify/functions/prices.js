// netlify/functions/prices.js

let cache = null;
let cacheTime = 0;
const CACHE_DURATION = 15 * 60 * 1000;  // 15 минут

exports.handler = async function(event, context) {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
    };

    // Проверяем кэш
    if (cache && Date.now() - cacheTime < CACHE_DURATION) {
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(cache)
        };
    }

    const FINNHUB_KEY = process.env.FINNHUB_API_KEY;
    
    if (!FINNHUB_KEY) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'FINNHUB_API_KEY not set in environment variables' })
        };
    }

    // ETF-символы (фьючерсы не работают на бесплатном тарифе)
    const symbols = {
        GOLD: 'GLD',
        BRENT: 'BNO',
        WTI: 'USO',
        WHEAT: 'WEAT',
        SILVER: 'SLV',
        NATGAS: 'UNG'
    };

    try {
        const results = {};
        
        for (const [name, symbol] of Object.entries(symbols)) {
            const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_KEY}`;
            console.log('Fetching:', url);  // для отладки
            
            const response = await fetch(url);
            const data = await response.json();
            
            console.log('Response for', symbol, ':', data);  // для отладки
            
            // Проверяем, что данные валидны
            if (data.c === 0 && data.d === null) {
                console.log('No data for', symbol);
            }
            
            results[name] = {
                price: data.c || 0,
                change: data.d || 0,
                changePercent: data.dp || 0,
                prevClose: data.pc || 0,
                raw: data  // для отладки
            };
        }

        // Сохраняем в кэш
        cache = results;
        cacheTime = Date.now();

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(results)
        };
        
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: error.message, key_exists: !!FINNHUB_KEY })
        };
    }
};
