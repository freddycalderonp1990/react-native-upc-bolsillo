import { ServiciosDetalleEntity } from "@/domain/entities/ServiciosDetalleEntity";



export const fetchServiciosDetalleFromApi = async (id: number): Promise<ServiciosDetalleEntity[]> => {
  const url = `https://siipne3wv2.policia.gob.ec/appmovil/polco/index.php?opc=a5ef8f60cf849b2edb66370f01be08a89b7e2b5f&modulo=ddced13c854fb2c03d6e01ce5bfd7e08&id=${id}`;
  const response = await fetch(url);
  const json = await response.json();
  if (json?.upcServitems?.codeError === 0) {
    return json.upcServitems.datos;
  } else {
    throw new Error(json?.upcServitems?.msj || 'Error al consultar Servicios');
  }
};