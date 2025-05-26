
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import MapView, { Marker, Polyline, UrlTile } from 'react-native-maps';


import { createPolylines } from '@/core/utils/mapUtils';
import { UpcRepositoryImpl } from '@/data/repository/UpcRepositoryImpl';
import FooterRedes from '@/presentation/components/shared/FooterRedes';
import { Upc } from '../../../domain/entities/Upc';
import { GetUpcsCercanas } from '../../../domain/usecases/GetUpcsCercanas';
 
import HeaderPage from '@/presentation/components/shared/HeaderPage';
import { styles } from './MapaScreen.styles';
import UpcModal from './UpcModal';


const MapaScreen = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [region, setRegion] = useState(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [upcs, setUpcs] = useState<Upc[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUpc, setSelectedUpc] = useState<Upc | null>(null);
  const mapRef = useRef<MapView>(null);
  const [markersRendered, setMarkersRendered] = useState(false);
  const [polylineCoords, setPolylineCoords] = useState<{ latitude: number; longitude: number }[]>([]);
  const [loadingRuta, setLoadingRuta] = useState(false);



  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permiso de ubicación denegado');
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
      const region = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      };
      setRegion(region);

      const repo = new UpcRepositoryImpl();
      const usecase = new GetUpcsCercanas(repo);

      try {
        setLoading(true);
        const upcData = await usecase.execute(loc.coords.latitude, loc.coords.longitude);
        setUpcs(upcData);
      } catch (e) {
        Alert.alert('Error', 'No se pudo cargar las UPCs');
      } finally {
        setLoading(false);
      }
    })();
  }, []);


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

  const manejarRuta = async (upc: Upc) => {
    if (!location) return;

    setLoadingRuta(true);

    try {
      const coords = await createPolylines(
        location.coords.latitude,
        location.coords.longitude,
        parseFloat(upc.latitudUpc),
        parseFloat(upc.longitudUpc)
      );

      setPolylineCoords(coords);
      setSelectedUpc(null);

      // Centrar mapa en toda la ruta
      if (mapRef.current && coords.length > 0) {
        mapRef.current.fitToCoordinates(coords, {
          edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
          animated: true,
        });
      }
    } catch (e) {
      Alert.alert('Error', 'No se pudo generar la ruta');
    } finally {
      setLoadingRuta(false);
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

  if (errorMsg) return <Text>{errorMsg}</Text>;
  if (!location || !region) return <ActivityIndicator size="large" />;

  return (
    <View style={{ flex: 1 }}>
   <HeaderPage titulo="Encuentra la Upc más cercana" />
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        region={region}
        onRegionChangeComplete={setRegion}
        onMapReady={() => {
          // Esperamos unos milisegundos a que los markers se dibujen visualmente
          setTimeout(() => setMarkersRendered(true), 500);
        }}
        mapType="none"
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
          title="Mi ubicación"
          image={require('@/assets/img/marker_persona.png')}
        />

        {upcs.map((upc) => (
          <Marker
            key={upc.idGenUpc}
            coordinate={{ latitude: parseFloat(upc.latitudUpc), longitude: parseFloat(upc.longitudUpc) }}
            title={upc.descripcionUpc}
            image={require('@/assets/img/marker_upc.png')}
            onPress={() => setSelectedUpc(upc)}
          />
        ))}

        {polylineCoords.length > 0 && (
          <Polyline
            coordinates={polylineCoords}
            strokeColor="#001f4b"
            strokeWidth={4}
          />
        )}
      </MapView>



      {loading || !markersRendered || loadingRuta ? (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>Cargando UPCs cercanas...</Text>
        </View>
      ) : null}
      <UpcModal
        visible={!!selectedUpc}
        upc={selectedUpc}
        onClose={() => setSelectedUpc(null)}
        onRutaPress={manejarRuta}
      />

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
    </View>
  );
};

export default MapaScreen;