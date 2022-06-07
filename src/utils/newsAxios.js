import axios from 'axios'

/**
 * This function creates JSON with the news's data and insert them to database
 * @param {} data
 */
async function createNews(data) {
  const data = data.values;
  const news = {
    Title: data.title,
    Description: data.description,
    Summary: data.summary,
    State: data.state,
    Media_file: data.media_file,
    Edition_date: data.edition_date
  }

  const request = await axios.post("http://localhost:8000/news/", news, {
    headers: {
      'Content-Type': 'application/json',
    }
  }).then((resp) => {
    return resp;
  });

  return request;
}

export { createNews }