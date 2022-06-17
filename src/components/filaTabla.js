import React from "react";
import DesplegableTabla from "./desplegableTabla";

/**
 * Retorna una fila de tabla con text.lenght + 1 columnas.
 * La columna extra le pertenece a las opciones, que solo
 * contienen la opción de eliminar.
 * @param {{text: string[], onClick: function
 *          id: int, category: string, showOptions: boolean}} props 
 * @returns 
 */
export default function FilaTabla(props) {

  const mapearDatos = () => {
    return (
      props.text.map(
        (data, index) => {
          return (
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4" key={index}>
              {data}
            </td>
          );
        }
      )
    );
  }

  const showOptions = () => {
    if (props.showOptions !== false) return (
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
        <DesplegableTabla
          text="Eliminar"
          id={props.id}
          category={props.category}
          onClick={props.onClick}
        />
      </td>
    )
  }

  return (
    <tr>
      {mapearDatos()}

      {showOptions()}
    </tr>
  );
}