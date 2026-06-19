// netlify/functions/prices.js

exports.handler = async function(event, context) {
    // Разрешаем запросы с твоего домена
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
    };

    // Символы Finnhub для наших товаров
    const symbols = {
        GOLD: 'GC=F',      // Gold Futures
        BRENT: 'BZ=F',     // Brent Oil Futures
        WTI: 'CL=F',       // WTI Oil Futures
        WHEAT: 'ZW=F',     // Wheat Futures
        SILVER: 'SI=F',    // Silver Futures
        NATGAS: 'NG=F'     // Natural Gas Futures
    };

    const FINNHUB_KEY = process.env.FINNHUB_API_KEY;
    
    if (!FINNHUB_KEY) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'API key not configured' })
        };
    }

    try {
        const results = {};
        
        for (const [name, symbol] of Object.entries(symbols)) {
            const response = await fetch(
                `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_KEY}`
            );
            const data = await response.json();
            
            // Finnhub возвращает: c (current), d (change), dp (change percent), h (high), l (low), o (open), pc (previous close)
            results[name] = {
                price: data.c,
                change: data.d,
                changePercent: data.dp,
                prevClose: data.pc
            };
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(results)
        };
        
    } catch (error) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: error.message })
        };
    }
};
