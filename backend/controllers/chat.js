const wolfReply = require('../agents/wolfagent');
const sageReply = require('../agents/sageagent');
const db = require('../db/dummyDb');

// Check if AI is available
const AI_ENABLED = !!process.env.GEMINI_API_KEY;

// Fallback dummy responses when no API key
const getDummyResponse = (message, agentType) => {
    const lowerMsg = message.toLowerCase();
    const isStock = lowerMsg.includes('stock') || lowerMsg.includes('invest') || lowerMsg.includes('buy') || lowerMsg.includes('market');
    const isBudget = lowerMsg.includes('budget') || lowerMsg.includes('spend') || lowerMsg.includes('save') || lowerMsg.includes('money');

    const wolfResponses = [
        `📊 **Market Analysis:** Based on current trends, this looks like a calculated risk. With your current balance, I'd recommend allocating no more than 15% of your portfolio. The risk-to-reward ratio warrants consideration. Watch for Q3 earnings before committing.`,
        `📈 **Investment Outlook:** The fundamentals here are solid. Consider a dollar-cost averaging approach — invest fixed amounts monthly rather than a lump sum. This reduces volatility risk significantly.`,
        `💹 **Financial Assessment:** Strong momentum in this sector. Set a stop-loss at 8% below your entry point to protect your capital. Target a 15-20% return window over 6-12 months.`,
    ];

    const sageResponses = [
        `🧘 **Behavioral Insight:** This decision reflects a common pattern — emotional spending triggered by short-term thinking. Ask yourself: is this a need or a want? Pause for 48 hours before acting. Your future self will thank you.`,
        `💡 **Financial Coaching:** The 50/30/20 rule works well here — 50% needs, 30% wants, 20% savings. It sounds like this falls into the 30% category. As long as you've covered your essential expenses, you have some flexibility.`,
        `🎯 **Goal Alignment:** Before making this decision, revisit your financial goals. Does this move you closer to your Emergency Fund goal? Staying aligned with your goals is the foundation of financial health.`,
    ];

    const sniperResponses = [
        `🎯 **Coordinated Analysis:** I've gathered insights from both The Wolf and The Sage. The consensus is: proceed with caution, diversify your approach, and keep your long-term goals in focus. Small, consistent steps build lasting wealth.`,
    ];

    if (agentType === 'wolf') return wolfResponses[Math.floor(Math.random() * wolfResponses.length)];
    if (agentType === 'sage') return sageResponses[Math.floor(Math.random() * sageResponses.length)];
    return sniperResponses[0];
};

// POST /api/chat
const sendMessage = async (req, res) => {
    try {
        const { message, type } = req.body;

        if (!message || !message.trim()) {
            return res.status(400).json({ success: false, message: 'Message is required.' });
        }

        const responses = [];

        // Determine which agents to use based on message content / type
        const lowerMsg = message.toLowerCase();
        const isFinancialDecision = lowerMsg.includes('buy') || lowerMsg.includes('invest') || lowerMsg.includes('spend') || lowerMsg.includes('should i');
        const isStockQuery = lowerMsg.includes('stock') || lowerMsg.includes('market') || lowerMsg.includes('crypto') || lowerMsg.includes('share') || type === 'stock_comparison';

        let wolfResponse, sageResponse;

        if (AI_ENABLED) {
            try {
                if (isStockQuery || isFinancialDecision) {
                    wolfResponse = await wolfReply(message);
                }
                sageResponse = await sageReply(message);
            } catch (aiErr) {
                console.warn('AI error, falling back to dummy responses:', aiErr.message);
                if (isStockQuery || isFinancialDecision) {
                    wolfResponse = getDummyResponse(message, 'wolf');
                }
                sageResponse = getDummyResponse(message, 'sage');
            }
        } else {
            if (isStockQuery || isFinancialDecision) {
                wolfResponse = getDummyResponse(message, 'wolf');
            }
            sageResponse = getDummyResponse(message, 'sage');
        }

        if (wolfResponse) {
            responses.push({
                agent: 'wolf',
                agentName: 'The Wolf',
                agentRole: 'Investment Analyst',
                agentIcon: '🐺',
                response: wolfResponse,
            });
        }

        if (sageResponse) {
            responses.push({
                agent: 'sage',
                agentName: 'The Sage',
                agentRole: 'Financial Coach',
                agentIcon: '🧘',
                response: sageResponse,
            });
        }

        // If only one responded, add sniper summary
        if (responses.length > 1) {
            const sniperSummary = getDummyResponse(message, 'sniper');
            responses.push({
                agent: 'sniper',
                agentName: 'The Sniper',
                agentRole: 'Coordinator',
                agentIcon: '🎯',
                response: sniperSummary,
            });
        }

        // Save conversation to user's chat history
        const primaryResponse = responses[0]?.response || 'No response generated.';
        db.addChatMessage(req.user.id, message, primaryResponse, responses[0]?.agent || 'sage');

        return res.json({
            success: true,
            data: { responses },
        });
    } catch (err) {
        console.error('Chat error:', err);
        return res.status(500).json({ success: false, message: 'Failed to process message. Please try again.' });
    }
};

// GET /api/chat/history
const getHistory = (req, res) => {
    const user = req.user;
    const history = user.chatHistory || [];
    return res.json({
        success: true,
        data: history.slice(-20).reverse(),
    });
};

// POST /api/chat/stock-analysis
const analyzeStock = async (req, res) => {
    try {
        const { symbol } = req.body;
        if (!symbol) {
            return res.status(400).json({ success: false, message: 'Stock symbol is required.' });
        }

        const message = `Analyze the stock ${symbol.toUpperCase()} for me. Is it a good investment right now?`;
        let response;

        if (AI_ENABLED) {
            try {
                response = await wolfReply(message);
            } catch {
                response = getDummyResponse(message, 'wolf');
            }
        } else {
            response = getDummyResponse(message, 'wolf');
        }

        db.addChatMessage(req.user.id, message, response, 'wolf');

        return res.json({
            success: true,
            data: {
                symbol: symbol.toUpperCase(),
                analysis: response,
                agent: 'wolf',
                agentName: 'The Wolf',
            },
        });
    } catch (err) {
        console.error('Stock analysis error:', err);
        return res.status(500).json({ success: false, message: 'Failed to analyze stock.' });
    }
};

// POST /api/chat/spending-analysis
const analyzeSpending = async (req, res) => {
    try {
        const { itemName, itemPrice } = req.body;
        if (!itemName || !itemPrice) {
            return res.status(400).json({ success: false, message: 'Item name and price are required.' });
        }

        const message = `Should I buy ${itemName} for $${itemPrice}? Is this a wise financial decision?`;
        let response;

        if (AI_ENABLED) {
            try {
                response = await sageReply(message);
            } catch {
                response = getDummyResponse(message, 'sage');
            }
        } else {
            response = getDummyResponse(message, 'sage');
        }

        db.addChatMessage(req.user.id, message, response, 'sage');

        return res.json({
            success: true,
            data: {
                item: itemName,
                price: itemPrice,
                analysis: response,
                agent: 'sage',
                agentName: 'The Sage',
            },
        });
    } catch (err) {
        console.error('Spending analysis error:', err);
        return res.status(500).json({ success: false, message: 'Failed to analyze spending.' });
    }
};

module.exports = { sendMessage, getHistory, analyzeStock, analyzeSpending };
