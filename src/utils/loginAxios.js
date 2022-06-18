import axios from "axios"

export { login, loggout, is_logged }

const config = {
  headers: {
    "Content-Type": "application/json"
    },
    withCredentials: false
  }


async function login(Email, Password) {
  try {
    const response = await axios.post('http://localhost:8000/login/', {
      Email: Email,
      Password: Password
    }, config)

    return [response, null]

  }
  catch (err) {
    return [null, err.response]
  }
}

async function is_logged() {
  try {
    const response = await axios.get('http://localhost:8000/login/', config)

    return [response, null]

  } catch (err) {

    return [null, err]

  }
}

async function loggout() {

  try {
    const response = await axios.delete('http://localhost:8000/login/')
    return [response, null]
  }
  catch (err) {
    return [null, err]
  }
}