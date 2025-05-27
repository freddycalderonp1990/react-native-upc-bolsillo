

export const fetchSaveEventoFromApi = async (
  tipoEvento: string,
  descripcion: string,
  imagen: string
): Promise<boolean> => {
  const url = 'https://siipne3wv2.policia.gob.ec/appmovil/polco/index.php';

  const payload = {
    opc: 'add-evento',
    modulo: 'ddced13c854fb2c03d6e01ce5bfd7e08',
    tipoEvento,
    descripcion,
    imagen, // debe ser el nombre del archivo, ej: "foto_alerta.jpg"
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const json = await response.json();

    if (json?.upcReportaEvento?.codeError === 0) {
      return true;
    } else {
      throw new Error(json?.upcReportaEvento?.msj || 'Error al guardar el evento');
    }
  } catch (error) {
    console.error('Error al guardar el evento:', error);
    return false;
  }
};
