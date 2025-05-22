import FooterRedes from '@/presentation/components/shared/FooterRedes';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, { Marker, UrlTile } from 'react-native-maps';
import HeaderMapa from './HeaderMapa';
import UpcModal from './UpcModal';

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
if (upcs.length === 0 || !mapRef.current) {
    Alert.alert('Sin UPCs', 'No hay UPCs disponibles para enfocar.');
    return;
  }

const coordinates = upcs.map((upc) => ({
    latitude: parseFloat(upc.latitudUpc),
    longitude: parseFloat(upc.longitudUpc),
  }));

  mapRef.current.fitToCoordinates(coordinates, {
    edgePadding: {
      top: 100,
      right: 100,
      bottom: 100,
      left: 100,
    },
    animated: true,
  });
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

      <MapView
        ref={mapRef}
        style={styles.map}
        mapType="none"
        region={region}
        onRegionChangeComplete={setRegion}
      >
        {/* OpenStreetMap Layer */}
        <UrlTile
          urlTemplate="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maximumZ={19}
          tileSize={256}
        />

        {/* Marcador ubicación actual */}
        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          title="Tu ubicación"
          description={`Lat: ${location.coords.latitude.toFixed(5)}, Lng: ${location.coords.longitude.toFixed(5)}`}
          image={require('@/assets/img/marker_persona.png')}
        />

        {/* Marcadores UPCs */}
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

      {/* Loading mientras se consulta el API */}
      {loadingUpcs && (
        <View style={styles.loadingUpcsBox}>
          <ActivityIndicator size="large" color="#0A84FF" />
          <Text style={styles.loadingUpcsText}>Cargando UPCs cercanas...</Text>
        </View>
      )}

      {/* Botones flotantes */}
      <View style={styles.floatingButtonContainer}>
        <TouchableOpacity style={styles.floatingButton} onPress={centrarUbicacion}>
          <Ionicons name="locate" size={24} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.floatingButton} onPress={activarEnfoque}>
          <Ionicons name="scan-circle" size={24} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.floatingButton} onPress={zoomIn}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.floatingButton} onPress={zoomOut}>
          <Ionicons name="remove" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <FooterRedes />





      <UpcModal
        visible={!!upcSeleccionada}
        onClose={() => setUpcSeleccionada(null)}
        upc={upcSeleccionada}
      />




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

  upcCard: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#0c2c5c',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    paddingBottom: 30,
    zIndex: 10,
  },
  upcHeader: {
    alignItems: 'center',
    marginBottom: 5,
  },
  upcLogo: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
  },
  upcTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  upcInfo: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 5,
  },
  upcLabel: {
    fontWeight: 'bold',
    color: '#fff',
  },
  upcActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  upcButton: {
    alignItems: 'center',
  },
  upcActionIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginBottom: 5,
  },
  upcButtonText: {
    color: '#fff',
    fontSize: 13,
  },

});
