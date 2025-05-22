import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapaUbicacionActual = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permiso de ubicación denegado');
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
    })();
  }, []);

  if (errorMsg) {
    return <Text style={{ textAlign: 'center', marginTop: 20 }}>{errorMsg}</Text>;
  }

  if (!location) {
    return <ActivityIndicator style={{ marginTop: 30 }} size="large" color="#0A84FF" />;
  }

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      <Marker
        coordinate={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        }}
        title="Tu ubicación"
        description="Estás aquí"
      />
    </MapView>
  );
};

export default MapaUbicacionActual;

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: 300,
    borderRadius: 15,
  },
});
