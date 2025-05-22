
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
import MapView, { Marker, UrlTile } from 'react-native-maps';

import { UpcRepositoryImpl } from '@/data/repository/UpcRepositoryImpl';
import FooterRedes from '@/presentation/components/shared/FooterRedes';
import { Upc } from '../../../domain/entities/Upc';
import { GetUpcsCercanas } from '../../../domain/usecases/GetUpcsCercanas';
import HeaderMapa from './HeaderMapa';
import UpcModal from './UpcModal';


const MapaScreen = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [region, setRegion] = useState(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [upcs, setUpcs] = useState<Upc[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedUpc, setSelectedUpc] = useState<Upc | null>(null);
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

  const activarEnfoque = () => {
    if (upcs.length === 0 || !mapRef.current) return;
    const coords = upcs.map((u) => ({ latitude: parseFloat(u.latitudUpc), longitude: parseFloat(u.longitudUpc) }));
    mapRef.current.fitToCoordinates(coords, {
      edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
      animated: true,
    });
  };

  if (errorMsg) return <Text>{errorMsg}</Text>;
  if (!location || !region) return <ActivityIndicator size="large" />;

  return (
    <View style={{ flex: 1 }}>
      <HeaderMapa />

      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        region={region}
        onRegionChangeComplete={setRegion}
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
      </MapView>

      <View style={{ position: 'absolute', left: 20, bottom: 140 }}>
        <TouchableOpacity onPress={centrarUbicacion}><Ionicons name="locate" size={30} color="#0c2c5c" /></TouchableOpacity>
        <TouchableOpacity onPress={activarEnfoque}><Ionicons name="scan-circle" size={30} color="#0c2c5c" /></TouchableOpacity>
      </View>

      {loading && <ActivityIndicator style={{ position: 'absolute', top: 100, alignSelf: 'center' }} size="large" />}

      <UpcModal visible={!!selectedUpc} upc={selectedUpc} onClose={() => setSelectedUpc(null)} />

      <FooterRedes />
    </View>
  );
};

export default MapaScreen;