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
 *  Crea el JSON con los datos del usuario y lo inserta en la BD.
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

async function update(metadata) {
  const data = metadata.values;
  const event = {
    Title: data.title,
  }

  try {
    const request = await axios.put("http://localhost:8000/Events/" + "1" + "/update/", event)
    return [request, null];

  } catch (err) {
    return null, err
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

export { createEvent, update}