import { Handler } from '@netlify/functions';
import { Client, Environment } from 'square';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Custom replacer for JSON.stringify to handle BigInt
const jsonReplacer = (key: string, value: any) => {
  if (typeof value === 'bigint') {
    return value.toString();
  }
  return value;
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

    // First retrieve the existing item variation
    const { result: { object: existingVariation } } = await square.catalogApi.retrieveCatalogObject(
      squareVariationId
    );

    if (!existingVariation) {
      throw new Error('Item variation not found');
    }

    // Update only the price while preserving other data
    const updatedVariation = {
      ...existingVariation,
      itemVariationData: {
        ...existingVariation.itemVariationData,
        priceMoney: {
          amount: Math.round(price * 100),
          currency: 'USD'
        }
      }
    };

    // Update the item variation
    const { result } = await square.catalogApi.upsertCatalogObject({
      idempotencyKey: `${squareVariationId}_${Date.now()}`,
      object: updatedVariation
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      },
      body: JSON.stringify(result, jsonReplacer)
    };

  } catch (error) {
    console.error('Error updating Square price:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      },
      body: JSON.stringify({ error: error.message }, jsonReplacer)
    };
  }
};
