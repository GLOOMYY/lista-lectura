import { Client } from '@notionhq/client';

const DATABASE_ID = '8c9851d1a3034b90abf17cc5708c93ad';

const notion = new Client({
  auth: import.meta.env.NOTION_TOKEN
});

export const getBooks = async ({ filterBy } = {}) => {
  const query = {
    database_id: DATABASE_ID
  };

  if (filterBy) {
    query.filter = {
      property: 'id',
      rich_text: {
        contains: filterBy
      }
    };
  }

  const { results } = await notion.databases.query(query);

  if (!results.length) {
    return [];
  }

  const books = results.map(page => {
    const { properties } = page;
    const { id, title, img, author, opinion } = properties;
  
    const authorText = author?.rich_text[0]?.plain_text;
    if (authorText) {
      return {
        id: id.rich_text[0].plain_text,
        title: title.title[0].plain_text,
        img: img.files[0].file.url,
        author: authorText,
        opinion: opinion.rich_text[0].plain_text
      };
    } else {
      return null;
    }
  });

  return books;
};
