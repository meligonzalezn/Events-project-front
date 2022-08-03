import axios from 'axios'


const formatDate = (date) => {
  let d = new Date(date);
  let month = (d.getMonth() + 1).toString();
  let day = d.getDate().toString();
  let year = d.getFullYear();
  if (month.length < 2) {
    month = '0' + month;
  }
  if (day.length < 2) {
    day = '0' + day;
  }
  return [year, month, day].join('-');
}


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
  form_data.append('ID_user', localStorage.getItem('idUser'))
  form_data.append('Title', data.title)
  form_data.append('Description', data.description)
  form_data.append('Summary', data.summary)
  form_data.append('State', data.state)
  if(data.media_file)
    form_data.append('Media_file', data.media_file, data.media_file.name)
  form_data.append('Edition_date', data.edition_date)
  form_data.append('Finish_date', formatDate(data.finish_date))
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
  form_data.append('ID_user', localStorage.getItem('idUser'))
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
  form_data.append('Finish_date', formatDate(data.finish_date))
  const config = {
    'content-type': 'multipart/form-data'

  }
  const request = await axios.put("http://localhost:8000/News/" + data.id + "/", form_data, config).then((res) => {
    return res;
  });
  return {request, eventsDataAllUpdate}
}


export { createNews, newsDataAll, newsDataComplete, eventSelected, updateNewsData}
