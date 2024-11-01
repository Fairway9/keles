import Airtable from 'airtable';

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base('YOUR_BASE_ID');

const table = base('Fairway_Sosmed');

export { table };
