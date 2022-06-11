import axios from 'axios'

/**
 * This function creates JSON with the news's data and insert them to database
 * @param {} metadata
 */
async function createNews(metadata) {
  const data = metadata.values;
  let form_data = new FormData()
  /*These values are default for now*/
  form_data.append('ID_event', 1)
  form_data.append('ID_user', 1)
  form_data.append('Title', data.title)
  form_data.append('Description', data.description)
  form_data.append('Summary', data.summary)
  form_data.append('State', data.state)
  if(data.media_file)
    form_data.append('Media_file', data.media_file, data.media_file.name)
  form_data.append('Edition_date', data.edition_date)

    /**
   * We get the events in database
   */

  const eventsData = await axios.get("http://localhost:8000/Events/").then((res) => {
    return res.data
  })
  
  const config = {
    'content-type': 'multipart/form-data'

  }
  const request = await axios.post("http://localhost:8000/News/", form_data, config).then((res) => {
    console.log("respuesta", res)
    return res;
  });

  return {eventsData, request};
}

export { createNews }