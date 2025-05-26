import { ServiciosEntity } from '@/domain/entities/ServiciosEntity';


export const fetchServiciosFromApi = async (id: number): Promise<ServiciosEntity[]> => {
  const url = `https://siipne3wv2.policia.gob.ec/appmovil/polco/index.php?opc=e71783b8bd0839724a0a671d8bc90b6c4c9d7069&modulo=ddced13c854fb2c03d6e01ce5bfd7e08&id=${id}`;
  const response = await fetch(url);
  const json = await response.json();
  if (json?.upcServicio?.codeError === 0) {
    return json.upcServicio.datos;
  } else {
    throw new Error(json?.upcServicio?.msj || 'Error al consultar Servicios');
  }
};