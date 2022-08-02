import axios from 'axios';
import moment from 'moment';

/**
 * Registra un pago en la BD.
 * @param {*} pay_method 
 * @returns 
 */
async function registerPayment(pay_method) {
  const data = JSON.parse(localStorage.getItem("actividad"));

  const payment = {
    ID_User: localStorage.getItem('idUser'),
    ID_Event: localStorage.getItem('idEvent'),
    ID_Activity: data.id,
    Date: moment().format("YYYY-MM-DD"),
    Value: data.cost,
    pay_method: pay_method
  }

  try {
    const request = await axios.post("http://localhost:8000/Payment/", payment);
    return [request, null];
  }
  catch (err) {
    console.log(err);
    return [null, err]
  }
}

export { registerPayment }