import axios from 'axios'
import { NewsCard } from 'src/components/news/news-card';

/**
 * This function creates JSON with the news's data and insert them to database
 * @param {} metadata
 */
async function createNews(metadata) {
  const data = metadata.values;
  console.log("los datos que recibe el back son: "+data.media_file)
  /**
   * We get the events in database
   */
  const eventsData = await axios.get("http://localhost:8000/Events/").then((res) => {
    return res.data
  })
  const news = {
    Title: data.title,
    Description: data.description,
    Summary: data.summary,
    State: data.state,
    Media_file: data.media_file,
    Edition_date: data.edition_date,
    //This value is default for now, it's important to get this information from the logged user
    ID_USER: 2,
    ID_EVENT: 1
  }
  console.log("los datos que recibió desde React son: " + news.Summary)
  const config = {
    'content-type': 'multipart/form-data'

  }
  const request = await axios.post("http://localhost:8000/News/", news, config).then((res) => {
    return res;
  });

  return {eventsData, request};
}

export { createNews }