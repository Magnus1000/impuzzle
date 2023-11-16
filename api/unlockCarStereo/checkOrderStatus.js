const cors = require('cors'); // Importing the CORS package

// Initialize CORS handler
const corsHandler = cors();

// Vercel Serverless Function (example: /api/checkOrderStatus.js)
module.exports = async function(req, res) {
    corsHandler(req, res, async () => {
        const orderId = req.query.orderId;

        if (!orderId) {
            res.status(400).send({ error: 'Order ID is required' });
            return;
        }

        const airtableEndpoint = `https://api.airtable.com/v0/${process.env.AIRTABLE_APP_ID_UCS}/${process.env.AIRTABLE_TABLE_ID_UCS}`;
        const queryParams = `?filterByFormula={order_id}='${orderId}'&fields[]=Order%20Status%20Text`;

        try {
            const response = await fetch(airtableEndpoint + queryParams, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${process.env.AIRTABLE_BEARER_ID_UCS}`,
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();

            if (data.records && data.records.length > 0) {
                const orderStatusText = data.records[0].fields["Order Status Text"];
                res.status(200).json({ orderStatusText });
            } else {
                res.status(404).json({ error: "No records found" });
            }
        } catch (error) {
            console.error("Airtable Error:", error);
            res.status(500).send({ error: 'Internal Server Error' });
        }
    });
};