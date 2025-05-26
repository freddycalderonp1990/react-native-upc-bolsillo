import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';

interface Props {
  titulo: string; // Ej: "BIENVENID@"
  iconSource: ImageSourcePropType;
}

const DesingBanner: React.FC<Props> = ({ titulo,iconSource }) => {
  const obtenerFechaHoy = (): string => {
    const fecha = new Date();
    const opciones: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };

    let fechaFormateada = new Intl.DateTimeFormat('es-EC', opciones).format(fecha);

    // Capitalizar la primera letra
    return fechaFormateada.charAt(0).toUpperCase() + fechaFormateada.slice(1);
  };

  return (
    <View style={styles.welcomeBox}>
  
        <Image source={iconSource} style={styles.userIcon} />
      <View>
        <Text style={styles.welcomeText}>{titulo}</Text>
        <Text style={styles.dateText}>Hoy es {obtenerFechaHoy()}</Text>
      </View>
    </View>
  );
};

export default DesingBanner;

const styles = StyleSheet.create({
  welcomeBox: {
    margin: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    padding: 15,
    borderRadius: 20,
  },
  userIcon: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  welcomeText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  dateText: {
    color: '#0c2c5c',
    marginTop: 5,
  },
});
