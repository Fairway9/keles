import Airtable from 'airtable';

const base = new Airtable({
  apiKey: process.env.AIRTABLE_PAT, // Use the personal access token
  apiVersion: 'v1'
}).base('appEzlmG3bClW6Gkd');

const table = base('Fairway_Sosmed');

export { table };
