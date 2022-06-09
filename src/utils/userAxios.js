import axios from 'axios'
const { createHash } = require('crypto');

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
  const user = {
    Name: data.Name + " " + data.LastName,
    Email: data.Email,
    Phone: data.Phone,
    Role: data.Role,
    State: true,
    Password: createHash("sha256").update(data.password).digest("hex")
  }

  try {

    const request = await axios.post("http://localhost:8000/User/", user, {
      headers: {
        'Content-Type': 'application/json',
      }
    })

    // console.log(request)
    return [request, null];
  }
  catch (err) {
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
    const request = await axios.put("http://localhost:8000/User/" + data.id + "/update", user, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    return [request, null];

  } catch (err) {
    return null, err
  }


}

async function enable(pk) {

  try {
    const request = await axios.put("http://localhost:8000/User/" + pk + "/enable", user, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    console.log("donete")
    return [request, null];

  }
  catch (err) {
    return [null, err]
  }

}

export { createUser, update, enable, getUsers }