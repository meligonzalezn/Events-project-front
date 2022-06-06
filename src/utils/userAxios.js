import axios from 'axios'
const { createHash } = require('crypto');

/**
 *  Crea el JSON con los datos del usuario y lo inserta en la BD.
 * @param {} metadata 
 */
async function createUser(metadata) {
  const data = metadata.values;
  const user = {
    Nombre: data.firstName + " " + data.lastName,
    Correo: data.email,
    Telefono: data.phone,
    Rol: data.rol,
    Estado: true,
    Contraseña: createHash("sha256").update(data.password).digest("hex")
  }

  const request = await axios.post("http://localhost:8000/usuarios/", user, {
    headers: {
      'Content-Type': 'application/json',
    }
  }).then((resp) => {
    return resp;
  });

  return request;
}

export { createUser }