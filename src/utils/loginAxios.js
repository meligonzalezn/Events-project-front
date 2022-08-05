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

    const response = await axios.post('https://abc-app-univalle.herokuapp.com/login/', {
      Email: Email,
      Password: Password
    }, config)
    /**
     * This function search in database information about user that just logged in
     * @param {email, password} 
    */
    let userLogged;
    await axios.get("https://abc-app-univalle.herokuapp.com/User/").then((res) => {
      userLogged = res.data.find((element) => element.Email === Email && element.Password === Password)
      localStorage.setItem('idUser', userLogged.id)
      localStorage.setItem('userName', userLogged.Name)
      localStorage.setItem('userRole', userLogged.Role)
      localStorage.setItem('userState', userLogged.State)
      localStorage.setItem('urlUserImage', userLogged.Media_file)
    })
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
    const response = await axios.get('https://abc-app-univalle.herokuapp.com/login/', config)
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
    const response = await axios.delete('https://abc-app-univalle.herokuapp.com/login/')
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
async function has_perms(path) {
  try {
    const response = await axios.post('https://abc-app-univalle.herokuapp.com/login/perms', {
      path: path
    })
    return [response, null]
  } catch (err) {
    return [null, err]
  }
}