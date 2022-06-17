import axios from 'axios'

/**
* We get the events titles registered in database
*/
let eventsTitle = []
async function eventsData () {
  await axios.get("http://localhost:8000/Events/").then((res) => {
    res.data.map((value) => {
      eventsTitle.push(value.Title)
    })
  })
  return {eventsTitle};
} 

eventsData()
/**
 * This function creates JSON with the news's data and insert them to database
 * @param {} metadata
 */
async function createNews(metadata) {
  const data = metadata.values;
  let eventSelected = {}
  let id_event_selected;
  const eventsDataAll = await axios.get("http://localhost:8000/Events/").then((res) => {
    eventSelected = res.data.find((element) => element.Title === data.event_name)  
    id_event_selected = eventSelected.id 
    return id_event_selected;
  })
  let form_data = new FormData()
  form_data.append('ID_event', id_event_selected)
  // This value is default for now (it has to be fetch the user id when login)
  form_data.append('ID_user', 1)
  form_data.append('Title', data.title)
  form_data.append('Description', data.description)
  form_data.append('Summary', data.summary)
  form_data.append('State', data.state)
  if(data.media_file)
    form_data.append('Media_file', data.media_file, data.media_file.name)
  form_data.append('Edition_date', data.edition_date)

  const config = {
    'content-type': 'multipart/form-data'

  }
  const request = await axios.post("http://localhost:8000/News/", form_data, config).then((res) => { 
    return res;
  });

  return {request, eventsDataAll};
}

export { createNews, eventsData, eventsTitle}