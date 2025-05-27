import { Handler } from '@netlify/functions';
import { Client, Environment } from 'square';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const square = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: Environment.Production
});

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: ''
    };
  }

  try {
    const { squareVariationId, price } = JSON.parse(event.body || '');

    if (!squareVariationId || !price) {
      throw new Error('Missing required fields');
    }

    const { result } = await square.catalogApi.upsertCatalogObject({
      idempotencyKey: `${squareVariationId}_${Date.now()}`,
      object: {
        type: 'ITEM_VARIATION',
        id: squareVariationId,
        itemVariationData: {
          priceMoney: {
            amount: BigInt(Math.round(price * 100)),
            currency: 'USD'
          }
        }
      }
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      },
      body: JSON.stringify(result)
    };

  } catch (error) {
    console.error('Error updating Square price:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      },
      body: JSON.stringify({ error: error.message })
    };
  }
};
