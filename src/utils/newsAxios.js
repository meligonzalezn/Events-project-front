import axios from 'axios'

/**
  * We get the events titles registered in database
  * @param {} 
*/
let eventsTitle = []
async function eventsData () {
  try{
    await axios.get("http://localhost:8000/Events/").then((res) => {
      res.data.map((value) => {
        eventsTitle.push(value.Title)
      })
    })
    return {eventsTitle};
  }
  catch(error){
    console.log(error)
    return [null, error]
  }
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
  try {
    const request = await axios.post("http://localhost:8000/News/", form_data, config).then((res) => { 
      return res;
    });
    return {request, eventsDataAll}
  }
  catch(error){
    console.log(error)
    return [null, error]
  }
}

/**
  * We get the news titles registered in database
  * @param {}
*/
let newsTitle = []
async function newsData () {
  try{
    await axios.get("http://localhost:8000/News/").then((res) => {
      res.data.map((value) => {
        newsTitle.push(value.Title)
      })
    })
    return {newsTitle};
  }
  catch(error){
    console.log(error)
    return [null, error]
  }
} 

newsData()

/**
 * We get the news data completed to display in form
 * @param {newsTitle}
 */
let newsDataComplete = {};
let newsEventData = {};
let eventSelected;

async function newsDataAll(newsTitle){
  try{
    await axios.get("http://localhost:8000/News/").then((res) => {
      newsDataComplete = res.data.find((element) => element.Title === newsTitle)
      return newsDataComplete; 
    })
    await axios.get("http://localhost:8000/Events/").then((res) => {
      newsEventData = res.data.find((element) => element.id === newsDataComplete.ID_event)
      eventSelected = newsEventData.Title
      return eventSelected;
    })
  }
  catch(error){
    console.log(error)
    return [null, error]
  }
}
/**
 * This function performs the update of the data in the news model
 * @param {*} metadata 
 */
async function updateNewsData(metadata){
  const data = metadata.values;
  let eventUpdateSelected = {}
  let idEventSelectedUpdate;
  const eventsDataAllUpdate = await axios.get("http://localhost:8000/Events/").then((res) => {
    eventUpdateSelected = res.data.find((element) => element.Title === data.event_name)  
    idEventSelectedUpdate = eventUpdateSelected.id 
    return idEventSelectedUpdate;
  })
  let form_data = new FormData()
  form_data.append('ID_event', idEventSelectedUpdate)
  // This value is default for now (it has to be fetch the user id when login)
  form_data.append('ID_user', 1)
  form_data.append('Title', data.title)
  form_data.append('Description', data.description)
  form_data.append('Summary', data.summary)
  form_data.append('State', data.state)
  if(data.media_file)
    if (data.media_file === newsDataComplete.Media_file){
      form_data.append('Media_file', data.media_file)
    }
    else{
      form_data.append('Media_file', data.media_file, data.media_file.name)
    }
  form_data.append('Edition_date', data.edition_date)
  const config = {
    'content-type': 'multipart/form-data'

  }

  try {
    const request = await axios.put("http://localhost:8000/News/" + data.id + "/", form_data, config).then((res) => {
      console.log("La respuesta si se cumplió la petición es: ", res) 
      return res;
    });
    return {request, eventsDataAllUpdate}
  }
  catch(error){
    console.log(error)
    return [null, error]
  }
}


export { createNews, eventsData, eventsTitle, newsTitle, newsDataAll, newsDataComplete, eventSelected, updateNewsData}
