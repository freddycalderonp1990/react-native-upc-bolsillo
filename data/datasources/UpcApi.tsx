import { Upc } from '../../domain/entities/Upc';

export const fetchUpcsFromApi = async (lat: number, lon: number): Promise<Upc[]> => {
  const url = `https://siipne3wv2.policia.gob.ec/appmovil/polco/index.php?opc=e6fd0cbbb095b3cb1cee0ed2ea89658a0c3fa4be&modulo=ddced13c854fb2c03d6e01ce5bfd7e08&la=${lat}&lo=${lon}`;
  const response = await fetch(url);
  const json = await response.json();
  if (json?.genUpc?.codeError === 0) {
    return json.genUpc.datos;
  } else {
    throw new Error(json?.genUpc?.msj || 'Error al consultar UPCs');
  }
};