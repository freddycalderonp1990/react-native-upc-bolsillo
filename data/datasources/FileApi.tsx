
export const saveFileApi = async (uri: string, path: string, nameFile: string) : Promise<boolean> => {
   const formData = new FormData();

  // Extraemos tipo MIME desde la extensión
  const fileExtension = nameFile.split('.').pop();
  const mimeType = fileExtension === 'png' ? 'image/png' : 'image/jpeg';

  formData.append('file', {
    uri,
    name: nameFile,
    type: mimeType,
  } as any); // ⚠️ se usa "as any" por un tema de tipos en RN

  formData.append('path', path);
  formData.append('nameFile', nameFile);

  try {
    const response = await fetch('https://siipne3wv2.policia.gob.ec/appmovil/apis/v1/saveFile/read.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });

    const json = await response.json();
    
    console.log('Respuesta de la API:', json);

    if (!response.ok) throw new Error('Error en la subida');

    return json.data;
  } catch (error) {
    console.error('Error al subir la imagen:', error);
    return false;
  }
};