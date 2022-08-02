import axios from "axios"

export { login, loggout, is_logged, has_perms }

const config = {
  headers: {
    "Content-Type": "application/json"
    },
    withCredentials: false
  }

/**
 * Try to login an user.
 * @param {str} Email 
 * @param {str} Password 
 * @returns [Response, error if exist]
 */
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

/**
 * Check if an user is logged in the system.
 * @returns [Response, Error if user is not logged]
 */
async function is_logged() {
  try {
    const response = await axios.get('http://localhost:8000/login/', config)
    return [response, null]

  } catch (err) {
    return [null, err]
  }
}

/**
 * Loggout an user.
 * @returns [Response, Error if some issue appear]
 */
async function loggout() {

  try {
    const response = await axios.delete('http://localhost:8000/login/')
    return [response, null]
  }
  catch (err) {
    return [null, err]
  }
}

/**
 * Check if an user has permissions to get access to functionalities.
 * @returns [Response, Error if user don't have access]
 */
async function has_perms(path){
  try{
    const response = await axios.post('http://localhost:8000/login/perms',{
      path: path
    })
    return [response, null]
  }catch(err){
    return [null, err]
  }
}