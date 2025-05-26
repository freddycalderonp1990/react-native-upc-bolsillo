import { ServiciosRepositoryImpl } from '@/data/repository/ServiciosRepositoryImpl';
import { ServiciosDetalleEntity } from '@/domain/entities/ServiciosDetalleEntity';
import { ServiciosEntity } from '@/domain/entities/ServiciosEntity';
import { GetServiciosComunitario } from '@/domain/usecases/GetServiciosComunitario';
import { GetServiciosDetalle } from '@/domain/usecases/GetServiciosDetalle';
import DesingBanner from '@/presentation/components/shared/DesingBanner';
import FooterRedes from '@/presentation/components/shared/FooterRedes';
import HeaderPage from '@/presentation/components/shared/HeaderPage';
import ModalServicios from '@/presentation/components/shared/ModalServicios';
import { GlobalStyles } from '@/presentation/theme/globalStyles';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';

import RNPickerSelect from 'react-native-picker-select';

import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { styles } from './BotonEmergencia.styles';

const BotonEmergenciaScreen = () => {
  const [loading, setLoading] = useState(true);
  const [medidasProteccion, setMedidasProteccion] = useState<ServiciosEntity[]>([]);
  const [selectedItem, setSelectedItem] = useState<ServiciosEntity | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [tips, setTips] = useState<string[]>([]);
  const [loadingModal, setLoadingModal] = useState(false);

  // Dentro de tu componente:
  const [eventoSeleccionado, setEventoSeleccionado] = useState<string | null>(null);
  const [observacion, setObservacion] = useState('');

  useEffect(() => {
    (async () => {
      const repo = new ServiciosRepositoryImpl();
      const usecase = new GetServiciosComunitario(repo);

      try {
        setLoading(true);
        const data = await usecase.execute();
        setMedidasProteccion(data);
      } catch (e) {
        Alert.alert('Error', 'No se pudo cargar las medidas de autoprotección');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleOpenModal = async (item: ServiciosEntity) => {
    const repo = new ServiciosRepositoryImpl();
    const usecaseDetalle = new GetServiciosDetalle(repo);
    try {
      setLoadingModal(true);
      const detalles = await usecaseDetalle.execute(item.idUpcServicio);
      const tipsResult = detalles.map((d: ServiciosDetalleEntity) => d.descripcion);
      setTips(tipsResult);
      setSelectedItem(item);
      setModalVisible(true);
    } catch (e) {
      Alert.alert('Error', 'No se pudo cargar los detalles del servicio');
    } finally {
      setLoadingModal(false);
    }
  };

  return (
    <ImageBackground
      source={require('@/assets/img/fondo1.png')}
      style={GlobalStyles.background}
      resizeMode="cover"
    >
      <View style={{ flex: 1 }}>
        <HeaderPage titulo="Botón de Emergencia" />

        <DesingBanner
          titulo="Fecha del Evento"
          iconSource={require('@/assets/img/mediadas_seguridad.jpeg')}
        />

        {loading ? (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.loadingText}>Cargando medidas de protección...</Text>
          </View>
        ) : (
          <View style={styles.card}>
            {/* Selector de eventos */}
            <Text style={styles.label}>Eventos</Text>
            <View style={styles.dropdownContainer}>
              <RNPickerSelect
                onValueChange={(value) => setEventoSeleccionado(value)}
                placeholder={{ label: 'Seleccione un evento...', value: null }}
                value={eventoSeleccionado}
                items={[
                  { label: 'ROBO', value: 'ROBO' },
                  { label: 'HURTO', value: 'HURTO' },
                  { label: 'ATROPELLAMIENTO', value: 'ATROPELLAMIENTO' },
                  { label: 'ACCIDENTE DE TRÁNSITO', value: 'ACCIDENTE DE TRÁNSITO' },
                  { label: 'OTROS', value: 'OTROS' },
                ]}
                style={{
                  inputIOS: styles.dropdownText,
                  inputAndroid: styles.dropdownText,
                  iconContainer: {
                    top: 10,
                    right: 12,
                  },
                }}
                Icon={() => <Ionicons name="chevron-down" size={20} color="#0c2c5c" />}
              />


            </View>


            {/* Observación */}
            <Text style={styles.label}>Observación</Text>
            <View style={styles.inputBox}>
  <Ionicons name="pencil-outline" size={22} color="#001f4b" style={styles.inputIcon} />
  
  <TextInput
    style={styles.textInput}
    placeholder="Escribe tu mensaje aquí..."
    placeholderTextColor="#999"
    value={observacion}
    onChangeText={(text) => setObservacion(text)}
    maxLength={100}
    multiline
  />

  <Text style={styles.charCounter}>{observacion.length}/100</Text>
</View>


            {/* Sección Imagen */}
            <Text style={styles.label}>Seleccione una Imagen</Text>
            <TouchableOpacity style={styles.imageButton}>
              <Ionicons name="camera-outline" size={22} color="#001f4b" style={styles.inputIcon} />
              <Text style={styles.imageText}>Registre una Imagen</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Espaciador flexible */}
        <View style={{ flex: 1 }} />

        {/* Footer al final */}
        <FooterRedes />

        {loadingModal && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.loadingText}>Cargando detalles...</Text>
          </View>
        )}

        {selectedItem && !loadingModal && (
          <ModalServicios
            visible={modalVisible}
            titulo={selectedItem.descripcion || ''}
            descripcion={selectedItem.resumen || ''}
            tips={tips}
            iconSource={{ uri: `data:image/jpeg;base64,${selectedItem.imgBase64}` }}
            onClose={() => setModalVisible(false)}
          />
        )}
      </View>
    </ImageBackground>
  );
};

export default BotonEmergenciaScreen;
