import axios from 'axios'

/**
 * This function parse the date to "YYYY-MM-DD"
 * @param {*} date 
 * @returns {date}
 */
const formatDate = (date) => {
    const dateFormal = date.replace("/",'-').replace("/", "-")
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
        Space: data.space,
        State: data.state, 
        Details: data.details, 
        Title: data.title, 
        ID_Event: localStorage.getItem('idEvent') 
    }
    console.log("los  datos que se envian a  la BD son ", activity)
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
  async function updateActivity(metadata){
    const data = metadata.values;
    
  }
export {createActivity}