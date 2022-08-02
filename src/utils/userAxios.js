import axios from 'axios'
const { createHash } = require('crypto');
import { defaultUserIcon } from './defaultImages';

/**
 * Get all register of User from DB
 * @returns all users on DB
 */
async function getUsers() {
  try {
    const request = await axios.get('http://localhost:8000/User/', {
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
async function createUser(metadata) {
  const data = metadata.values;

  let cipheredPassword = createHash("sha256").update(data.password).digest("hex")
  let form_data = new FormData();
  form_data.append('Name', data.Name);
  form_data.append('Last_name', data.LastName);
  form_data.append('Email', data.Email);
  form_data.append('Phone', data.Phone);
  form_data.append('Role', data.Role);
  form_data.append('State', true);
  form_data.append('Password', cipheredPassword);

  if (data.Image != defaultUserIcon)
    form_data.append('Media_file', data.Image, data.Image.name);

  const config = { 'content-type': 'multipart/form-data' }

  try {
    const request = await axios.post("http://localhost:8000/User/", form_data, config);
    return [request, null];
  }
  catch (err) {
    console.log(err);
    return [null, err]
  }
}

async function update(metadata) {
  const data = metadata.values;
  const user = {
    Name: data.Name + " " + data.LastName,
    Email: data.Email,
    Phone: data.Phone,
    Role: data.Role,
    State: data.State,
    Password: data.Password === data.BeforePassword ? data.password : createHash("sha256").update(data.password).digest("hex")
  }

  try {
    const request = await axios.put("http://localhost:8000/User/" + data.id + "/", user)
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

/**
 * This function search in database information about user that just logged in
 * @param {email, password} 
 */
let userLogged; 
async function getUserByEmailPassword(email, password) {
  await axios.get("http://localhost:8000/User/").then((res) => {
    userLogged = res.data.find((element) => element.Email === email && element.Password === password)
    localStorage.setItem('idUser', userLogged.id)
    localStorage.setItem('userName', userLogged.Name)
    localStorage.setItem('userRole', userLogged.Role)
    localStorage.setItem('userState', userLogged.State)
    localStorage.setItem('urlUserImage', userLogged.Media_file)
  })
}

export { createUser, update, enable, getUsers, getUserByEmailPassword}