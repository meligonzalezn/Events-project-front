import { PaymentRounded } from '@mui/icons-material'
import axios from 'axios'
import { element } from 'prop-types'


/**
 * This function parse the date to "YYYY-MM-DD"
 * @param {*} date 
 * @returns {date}
 */
const formatDate = (date) => {
  const dateFormal = date.replace("/", '-').replace("/", "-")
  const dateArray = dateFormal.split('-')
  const dateArrayOrganized = [dateArray[2], dateArray[1], dateArray[0]]
  return dateArrayOrganized.join('-')
}


/**
 * This function insert an activity to DB
 * @param {} metadata 
 */
async function createActivity(metadata) {
  const data = metadata.values;
  const activity = {
    Date: formatDate(data.date),
    Init_hour: data.init_hour,
    Final_hour: data.final_hour,
    Capacity: data.capacity,
    Cost: data.cost,
    Space: data.space,
    State: data.state,
    Details: data.details,
    Title: data.title,
    ID_Event: localStorage.getItem('idEvent')
  }
  console.log("que necesito enviar ", activity)
  try {
    const request = await axios.post("http://localhost:8000/Activity/", activity);
    return [request, null];
  }
  catch (err) {
    console.log(err);
    return [null, err]
  }
}

/**
 * With this function we can update information of an activity
 * @param {*} metadata 
 */
let finalDateToDB;
async function updateActivity(metadata) {
  const data = metadata.values;
  finalDateToDB = data.date.getFullYear() + '-' + parseInt(data.date.getMonth() + 1) + "-" + data.date.getDate()
  const activity = {
    Date: finalDateToDB,
    Init_hour: data.init_hour,
    Final_hour: data.final_hour,
    Capacity: data.capacity,
    Cost: data.cost,
    Space: data.space,
    State: data.state,
    Details: data.details,
    Title: data.title,
    ID_Event: localStorage.getItem('idEvent')
  }
  try {
    const request = await axios.put("http://localhost:8000/Activity/" + data.id + "/", activity).then((res) => {
      return [request, null];
    });
  }
  catch (err) {
    console.log(err);
    return [null, err]
  }

}

/**
 * Revisa en la BD si el usuario está inscrito a la actividad identificada con
 * 'ID_Activity' del evento identificado con 'ID_Event'.
 * @param {int} ID_Activity 
 * @returns 
 */
async function checkEnrolledStatus(ID_Activity) {
  const ID_User = localStorage.getItem('idUser');
  const ID_Event = localStorage.getItem('idEvent');

  const body = {
    ID_Activity: ID_Activity,
    ID_Event: ID_Event
  }

  try {
    const request = await axios.post(`http://localhost:8000/Payment/${ID_User}/is_enrolled/`,
      JSON.stringify(body));

    return [request.data, null]
  } catch (err) {
    console.log(err)
    return [null, err]
  }
}

/**
 * Cancela la inscripción de un usuario a la actividad identificada con
 * 'ID_Activity' del evento identificado con 'ID_Event'.
 * @param {int} ID_Activity 
 * @returns 
 */
async function unenroll(ID_Activity) {
  const ID_User = localStorage.getItem('idUser');
  const ID_Event = localStorage.getItem('idEvent');

  const body = {
    ID_Activity: ID_Activity,
    ID_Event: ID_Event
  }

  try {
    const request = await axios.post(`http://localhost:8000/Payment/${ID_User}/unenroll/`,
      JSON.stringify(body));

    return [request.data, null]
  } catch (err) {
    return [null, err]
  }
}

export { createActivity, updateActivity, checkEnrolledStatus, unenroll }
