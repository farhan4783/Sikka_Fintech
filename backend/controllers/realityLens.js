// POST /api/reality-lens/scan
// Accepts a product image upload and returns a mocked financial analysis of the product

const scanProduct = (req, res) => {
    // In a real app this would send the image to a Vision AI model
    // For now we return a rich dummy response

    const file = req.file;
    const filename = file ? file.originalname : 'unknown-product.jpg';

    // Simulate product recognition
    const products = [
        {
            productName: 'Apple AirPods Pro (2nd Gen)',
            estimatedPrice: 249,
            marketCompare: [
                { store: 'Amazon', price: 219.99, url: '#' },
                { store: 'Best Buy', price: 249.00, url: '#' },
                { store: 'Walmart', price: 229.00, url: '#' },
            ],
            financialImpact: {
                affordabilityScore: 72,
                percentOfMonthlyIncome: 5.5,
                daysOfWork: 2.1,
                impactOnGoals: 'Low — will not significantly impact your Emergency Fund goal',
                recommendation: 'This is a reasonable purchase. Consider buying from Amazon to save $29. You can afford this without affecting your financial goals.',
                sentiment: 'positive',
            },
            category: 'Electronics',
            aiFlags: ['Best Price Available', 'Alternative Stores Available'],
        },
        {
            productName: 'Nike Air Max 270',
            estimatedPrice: 150,
            marketCompare: [
                { store: 'Nike.com', price: 150.00, url: '#' },
                { store: 'Foot Locker', price: 149.99, url: '#' },
                { store: 'Amazon', price: 120.00, url: '#' },
            ],
            financialImpact: {
                affordabilityScore: 88,
                percentOfMonthlyIncome: 3.3,
                daysOfWork: 1.2,
                impactOnGoals: 'Minimal — small impact on monthly budget',
                recommendation: 'This is a solid purchase. Get it from Amazon to save $30. Fits well within your monthly discretionary budget.',
                sentiment: 'positive',
            },
            category: 'Footwear',
            aiFlags: ['Discount Available'],
        },
        {
            productName: 'Samsung 65" QLED 4K TV',
            estimatedPrice: 1299,
            marketCompare: [
                { store: 'Samsung.com', price: 1299.00, url: '#' },
                { store: 'Best Buy', price: 1249.99, url: '#' },
                { store: 'Costco', price: 999.99, url: '#' },
            ],
            financialImpact: {
                affordabilityScore: 41,
                percentOfMonthlyIncome: 28.9,
                daysOfWork: 10.8,
                impactOnGoals: 'High — will significantly set back your Emergency Fund and New Car goals',
                recommendation: 'Consider waiting 3 months to save up. This would delay your Emergency Fund goal by 2 months. Alternatively, look for a 0% APR financing deal.',
                sentiment: 'caution',
            },
            category: 'Electronics',
            aiFlags: ['Large Purchase', 'Better Deal at Costco', 'Consider Waiting'],
        },
    ];

    // Pick a random product to simulate scanning
    const product = products[Math.floor(Math.random() * products.length)];

    return res.json({
        success: true,
        data: {
            scannedFile: filename,
            scanTime: new Date().toISOString(),
            ...product,
        },
    });
};

module.exports = { scanProduct };
