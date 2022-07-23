import axios from 'axios';

async function registerPayment(metadata) {
  const data = metadata.values;

  let form_data = new FormData()
  form_data.append('ID_Event', data.ID_Event)
  form_data.append('ID_User', data.ID_User)
  form_data.append('ID_Activity', data.ID_Activity)
  form_data.append('Date', data.Date)
  form_data.append('Value', data.Value)
  form_data.append('pay_method', data.pay_method);
  const config = {
    'content-type': 'multipart/form-data'
  }
  try {
    const request = await axios.post("http://localhost:8000/Payment/", form_data, config).then((res) => {
      return res;
    });
    return { request, eventsDataAll }
  }
  catch (error) {
    console.log(error)
    return [null, error]
  }
}