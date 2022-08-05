import axios from "axios"
import permissions from "./json/permissions.json"

export { login, loggout, is_logged, has_perms }

const config = {
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: false
}

function saveUserIntoSession(userLogged) {
  sessionStorage.setItem('idUser', userLogged.id)
  sessionStorage.setItem('userName', userLogged.Name)
  sessionStorage.setItem('userRole', userLogged.Role)
  sessionStorage.setItem('userState', userLogged.State)
  sessionStorage.setItem('urlUserImage', userLogged.Media_file)
}

function saveUserIntoLocalStorage(userLogged) {

  localStorage.setItem('idUser', userLogged.id)
  localStorage.setItem('userName', userLogged.Name)
  localStorage.setItem('userRole', userLogged.Role)
  localStorage.setItem('userState', userLogged.State)
  localStorage.setItem('urlUserImage', userLogged.Media_file)
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

    userInformation = response.data;
    saveUserIntoSession(userInformation);
    saveUserIntoLocalStorage(userInformation);

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
  const messageError = "User doesn't exist";
  try {
    const userInformation = sessionStorage.getItem("idUser");

    if (userInformation == undefined)
      return [null, messageError]

    return [userInformation, null]

  } catch (err) {
    return [null, messageError]
  }
}

/**
 * Loggout an user.
 * @returns [Response, Error if some issue appear]
 */
async function loggout() {
  const messageError = "Failed trying to logging out";
  try {
    sessionStorage.clear();
    localStorage.clear();
    return ["You are loggout", null]
  }
  catch (err) {
    return [null, messageError]
  }
}

/**
 * Check if an user has permissions to get access to functionalities.
 * @returns [Response, Error if user don't have access]
 */
async function has_perms(path) {

  try {
    const role = sessionStorage.get("userRole");
    const rolePermissions = permissions[role];
    const hasPerm = rolePermissions.some(perm => perm.startsWith(path))

    return [hasPerm, null]
  } catch (err) {
    return [null, "Internal Error"]
  }

}