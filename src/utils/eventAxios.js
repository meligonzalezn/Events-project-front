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
 * Get all register of Events from DB
 * @returns all events on DB
 */
async function getEvents() {
  try {
    const request = await axios.get('http://localhost:8000/Events/', {
      headers: {
        'Content-Type': 'application/json',
      }
    })

    console.log("request", request.data)

    return [request.data, null]
  } catch (err) {
    console.log(err)
    return [null, err]
  }
}


/**
  * We get the events titles registered in database
  * @param {} 
*/
let eventsTitle = []
async function getEventsTitle () {
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

getEventsTitle()

/**
 *  Creates the JSON with the event data and adds it in the BD
 * @param {} metadata 
 */
async function createEvent(metadata) {
  const data = metadata.values;
  const event = {
    //Id: 3,
    Title: data.title,
    Details: data.details,
    State: data.state,
    Space: data.place,
    Cost: data.enrollment_price,
    Media_file: data.image_file,
    Start_date : formatDate(data.start_date),
    Finish_date : formatDate(data.finish_date),
  }

  let form_data = new FormData()
  form_data.append('Title', data.title)
  form_data.append('Details',data.details)
  form_data.append('State', data.state)
  form_data.append('Space', data.place)
  form_data.append('Cost', data.enrollment_price)
  form_data.append('Start_date', formatDate(data.start_date))
  form_data.append('Finish_date', formatDate(data.finish_date))
  if(data.image_file !== '')
    form_data.append('Media_file', data.image_file, data.image_file.name)

  const config = {
      'content-type': 'multipart/form-data'
  
  }
  try {
    console.log(form_data)
    const request = await axios.post("http://localhost:8000/Events/", form_data, config
    )
    return [request, null];
  }
  catch (err) {
    return [null, err]
  }
}


/**
 * We get the event data completed to display in form
 * @param {newsTitle}
 */
 let eventData = {};
 
 async function getEventData(eventTitle){
   try{
     await axios.get("http://localhost:8000/Events/").then((res) => {
       eventData = res.data.find((element) => element.Title === eventTitle)
       return eventData;
     })
   }
   catch(error){
     console.log(error)
     return [null, error]
   }
 }


async function enable(pk) {

  try {
    const request = await axios.put("http://localhost:8000/User/" + pk + "/enable/", user)
    return [request, null];

  }
  catch (err) {
    return [null, err]
  }

}


/**
 * Updates data from an event in the events model
 * @param {*} metadata 
 */
 async function updateEvent(metadata){
  const data = metadata.values;
  let eventUpdateSelected = {}
  let idEventSelectedUpdate;
  const eventsDataAllUpdate = await axios.get("http://localhost:8000/Events/").then((res) => {
    eventUpdateSelected = res.data.find((element) => element.Title === data.title)  
    idEventSelectedUpdate = eventUpdateSelected.id 
    return idEventSelectedUpdate;
  })
  getEventData(data.title)
  console.log("Data:" ,data)
  let form_data = new FormData()
  form_data.append('Title', data.title)
  form_data.append('Details',data.details)
  form_data.append('State', data.state)
  if(data.place !== ''){
    form_data.append('Space', data.place)
  }
  form_data.append('Cost', data.enrollment_price)
  form_data.append('Start_date', formatDate(data.start_date))
  form_data.append('Finish_date', formatDate(data.finish_date))
  if(data.image_file !== '')
    console.log("Imagen: ", data.image_file, eventData.Media_file)
    if (data.image_file === eventData.Media_file){
    }
    else{
      form_data.append('Media_file', data.image_file, data.image_file.name)
    }
  
  const config = {
    'content-type': 'multipart/form-data'

  }

  console.log(form_data)

  try {
    const request = await axios.put("http://localhost:8000/Events/" + idEventSelectedUpdate + "/", form_data, config).then((res) => {
      return res;
    });
    return {request, eventsDataAllUpdate}
  }
  catch(error){
    console.log(error)
    return [null, error]
  }
}

async function get_event_participants(){
  try{
    const response = await axios.get("http://localhost:8000/Events/get_members")
    return [response, null];

  }catch(err){
    return [null, err]
  }
}

async function getIdEventByIdNew(id_New){
  const petition = {id_new: id_New}
  try{
    const id_event = await axios.post("http://localhost:8000/News/get_event_id_by_new/", petition)
    return [id_event, null];
  }
  catch(err){
    return [null, err]
  }
}

async function enroll_user2event(event_id){
  try{
    const response = await axios.post(`http://localhost:8000/Enroll/enroll_user2event/`,
    {
      event_id: event_id
    })
    return [response, null];
  }
  catch(err){
    return [null, err]
  }
}

async function is_enrolled2Event(event_id){
  try{
    const response = await axios.get(`http://localhost:8000/Enroll/${event_id}/is_user_enrolled2event/`,
    {
      event_id: event_id
    })
    return [response, null];
  }
  catch(err){
    return [null, err]
  }
}

async function uneroll_user2event(event_id){
  try{
    const response = await axios.delete(`http://localhost:8000/Enroll/${event_id}/unenrollment/`)

    return [response.enrolled, null];
  }catch(err){
    return [null, err]
  }
}

export { createEvent , getEventsTitle, getEventData, getIdEventByIdNew, enroll_user2event, updateEvent, uneroll_user2event, is_enrolled2Event }
