import axios from "axios"
import permissions from "./json/permissions.json"

export { login, loggout, is_logged, has_perms }

const config = {
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: false
}

// function saveUserIntoSession(userLogged) {
//   sessionStorage.setItem('idUser', userLogged.id)
//   sessionStorage.setItem('userName', userLogged.Name)
//   sessionStorage.setItem('userRole', userLogged.Role)
//   sessionStorage.setItem('userState', userLogged.State)
//   sessionStorage.setItem('urlUserImage', userLogged.Media_file)
// }

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

    let userLogged;
    await axios.get("https://abc-app-univalle.herokuapp.com/User/").then((res) => {
      userLogged = res.data.find((element) => element.Email === Email && element.Password === Password)
      // saveUserIntoSession(userLogged)
      saveUserIntoLocalStorage(userLogged)
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
function is_logged() {
  const messageError = "User doesn't exist";
  try {
    const userInformation = localStorage.getItem("idUser");

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
function has_perms(path) {

  // console.log("hasPerm", permissions)
  const role = localStorage.getItem("userRole");
  console.log(path)
  const rolePermissions = permissions[role] ? permissions[role] : [];
  const otherPermissions = permissions.any_user
  const exactPermissions = permissions.exact_url;

  console.log(rolePermissions)
  const hasPerm = rolePermissions.some(perm => perm.startsWith(path.slice(1))) || otherPermissions.some(perm => perm.startsWith(path.slice(1))) || exactPermissions.some(perm => perm == path)
  return [hasPerm, null]
  try {
  } catch (err) {
    return [null, "Internal Error"]
  }

}