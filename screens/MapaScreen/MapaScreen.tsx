import FooterRedes from '@/components/shared/FooterRedes';
import * as Location from 'expo-location';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Linking,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import MapView, { Marker, UrlTile } from 'react-native-maps';
import HeaderMapa from './HeaderMapa';

const MapaUbicacionActual = () => {
  const [upcSeleccionada, setUpcSeleccionada] = useState(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [region, setRegion] = useState(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [upcs, setUpcs] = useState([]);
  const [loadingUpcs, setLoadingUpcs] = useState(false);
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permiso de ubicación denegado');
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
      const initialRegion = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      };
      setRegion(initialRegion);
      fetchUpcsCercanas(loc.coords.latitude, loc.coords.longitude);
    })();
  }, []);

  const fetchUpcsCercanas = async (lat: number, lon: number) => {
    try {
      setLoadingUpcs(true);
      const url = `https://siipne3wv2.policia.gob.ec/appmovil/polco/index.php?opc=e6fd0cbbb095b3cb1cee0ed2ea89658a0c3fa4be&modulo=ddced13c854fb2c03d6e01ce5bfd7e08&la=${lat}&lo=${lon}`;
      const response = await fetch(url);
      const json = await response.json();

      if (json?.genUpc?.codeError === 0) {
        setUpcs(json.genUpc.datos);
      } else {
        Alert.alert('Error', json?.genUpc?.msj || 'No se pudo cargar UPCs');
      }
    } catch (error) {
      Alert.alert('Error de red', 'No se pudo conectar al servidor de UPCs');
    } finally {
      setLoadingUpcs(false);
    }
  };

  const centrarUbicacion = () => {
    if (location) {
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    }
  };

  const zoomIn = () => {
    setRegion((prev) => ({
      ...prev,
      latitudeDelta: prev.latitudeDelta / 2,
      longitudeDelta: prev.longitudeDelta / 2,
    }));
  };

  const zoomOut = () => {
    setRegion((prev) => ({
      ...prev,
      latitudeDelta: prev.latitudeDelta * 2,
      longitudeDelta: prev.longitudeDelta * 2,
    }));
  };

  const activarEnfoque = () => {
    Alert.alert('Modo enfoque', 'Función de enfoque activada');
  };

  if (errorMsg) {
    return <Text style={styles.errorText}>{errorMsg}</Text>;
  }

  if (!location || !region) {
    return <ActivityIndicator style={styles.loading} size="large" color="#0A84FF" />;
  }

  return (
    <View style={styles.container}>
      <HeaderMapa />

      <Pressable style={{ flex: 1 }} onPress={() => setUpcSeleccionada(null)}>
        <MapView
          ref={mapRef}
          style={styles.map}
          mapType="none"
          region={region}
          onRegionChangeComplete={setRegion}
        >
          <UrlTile
            urlTemplate="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            maximumZ={19}
            tileSize={256}
          />

          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Tu ubicación"
            description={`Lat: ${location.coords.latitude.toFixed(5)}, Lng: ${location.coords.longitude.toFixed(5)}`}
            image={require('@/assets/img/marker_persona.png')}
          />

          {upcs.map((upc) => (
            <Marker
              key={upc.idGenUpc}
              coordinate={{
                latitude: parseFloat(upc.latitudUpc),
                longitude: parseFloat(upc.longitudUpc),
              }}
              title={upc.descripcionUpc}
              onPress={() => setUpcSeleccionada(upc)}
              image={require('@/assets/img/marker_upc.png')}
            />
          ))}
        </MapView>
      </Pressable>

      {loadingUpcs && (
        <View style={styles.loadingUpcsBox}>
          <ActivityIndicator size="large" color="#0A84FF" />
          <Text style={styles.loadingUpcsText}>Cargando UPCs cercanas...</Text>
        </View>
      )}

      {/* Diálogo centrado */}
      <Modal visible={!!upcSeleccionada} transparent animationType="fade">
        <Pressable style={styles.modalOverlay} onPress={() => setUpcSeleccionada(null)}>
          <View style={styles.upcDialog}>
            <Image source={require('@/assets/img/area.png')} style={styles.upcLogo} />
            <Text style={styles.upcTitle}>{upcSeleccionada?.descripcionUpc}</Text>
            <Text style={styles.upcInfo}>📍 {upcSeleccionada?.dirUpc}</Text>
            <Text style={styles.upcInfo}>📧 {upcSeleccionada?.mailUpc}</Text>
            <Text style={styles.upcInfo}>📞 {upcSeleccionada?.fonoUpc}</Text>
            <Text style={styles.upcInfo}>📏 {parseFloat(upcSeleccionada?.distance || 0).toFixed(2)} mts</Text>

            <View style={styles.upcActions}>
              <TouchableOpacity style={styles.upcButton} onPress={() => Alert.alert('Ruta al UPC', 'Funcionalidad pendiente')}>
                <Text style={styles.upcButtonText}>Ruta al UPC</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.upcButton} onPress={() => {
                const telefono = upcSeleccionada.fonoUpc.replace(/\D/g, '');
                Linking.openURL(`tel:${telefono}`);
              }}>
                <Text style={styles.upcButtonText}>Llamar UPC</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Modal>

      <FooterRedes />
    </View>
  );
};

export default MapaUbicacionActual;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loading: {
    marginTop: 30,
  },
  errorText: {
    textAlign: 'center',
    marginTop: 20,
    color: 'red',
  },
  map: {
    flex: 1,
  },
  floatingButtonContainer: {
    position: 'absolute',
    left: 20,
    bottom: 130,
    zIndex: 2,
  },
  floatingButton: {
    backgroundColor: '#0c2c5c',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#fff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  loadingUpcsBox: {
    position: 'absolute',
    top: 100,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    paddingVertical: 10,
    borderRadius: 10,
    marginHorizontal: 40,
  },
  loadingUpcsText: {
    marginTop: 5,
    fontSize: 14,
    color: '#0c2c5c',
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  upcDialog: {
    backgroundColor: '#0c2c5c',
    padding: 20,
    borderRadius: 20,
    width: '85%',
    alignItems: 'center',
  },
  upcLogo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  upcTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  upcInfo: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 5,
    textAlign: 'center',
  },
  upcActions: {
    flexDirection: 'row',
    marginTop: 15,
    gap: 20,
  },
  upcButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  upcButtonText: {
    color: '#0c2c5c',
    fontWeight: 'bold',
  },
});
