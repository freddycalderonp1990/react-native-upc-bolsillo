import { ServiciosRepositoryImpl } from '@/data/repository/ServiciosRepositoryImpl';
import { ServiciosEntity } from '@/domain/entities/ServiciosEntity';
import { GetServiciosComunitario } from '@/domain/usecases/GetServiciosComunitario';
import DesingBanner from '@/presentation/components/shared/DesingBanner';
import FooterRedes from '@/presentation/components/shared/FooterRedes';
import HeaderPage from '@/presentation/components/shared/HeaderPage';
import ModalServicios from '@/presentation/components/shared/ModalServicios';
import { GlobalStyles } from '@/presentation/theme/globalStyles';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { ImagePickerResult } from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { styles } from './BotonEmergencia.styles';
import ModalCamara from './ModalCamara';

const BotonEmergenciaScreen = () => {
  const [loading, setLoading] = useState(true);
  const [medidasProteccion, setMedidasProteccion] = useState<ServiciosEntity[]>([]);
  const [selectedItem, setSelectedItem] = useState<ServiciosEntity | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [tips, setTips] = useState<string[]>([]);
  const [loadingModal, setLoadingModal] = useState(false);

  const [eventoSeleccionado, setEventoSeleccionado] = useState<string | null>(null);
  const [observacion, setObservacion] = useState('');
  const [imagenBase64, setImagenBase64] = useState<string | null>(null);
  const [modalCamaraVisible, setModalCamaraVisible] = useState(false);

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

  const abrirGaleria = async () => {
    const permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permiso.granted) {
      Alert.alert('Permiso denegado', 'Se requiere acceso a la galería');
      return;
    }
    const resultado = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      quality: 0.7,
    });
    manejarResultadoImagen(resultado);
  };

  const abrirCamara = async () => {
    const permiso = await ImagePicker.requestCameraPermissionsAsync();
    if (!permiso.granted) {
      Alert.alert('Permiso denegado', 'Se requiere acceso a la cámara');
      return;
    }
    const resultado = await ImagePicker.launchCameraAsync({
      base64: true,
      quality: 0.7,
    });
    manejarResultadoImagen(resultado);
  };

  const manejarResultadoImagen = (resultado: ImagePickerResult) => {
    if (!resultado.canceled && resultado.assets && resultado.assets.length > 0) {
      const base64 = resultado.assets[0].base64;
      setImagenBase64(base64 ?? null);
      setModalCamaraVisible(false);
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
<Text style={styles.label}>
  {imagenBase64 ? 'Imagen Seleccionada' : 'Seleccione una Imagen'}
</Text>

<TouchableOpacity
  style={styles.imageButton}
  onPress={() => setModalCamaraVisible(true)}
>
  <Ionicons name="camera-outline" size={22} color="#001f4b" style={styles.inputIcon} />
  <Text style={styles.imageText}>
    {imagenBase64 ? 'Cambiar Imagen' : 'Registre una Imagen'}
  </Text>
</TouchableOpacity>

{imagenBase64 && (
  <View style={styles.previewContainer}>
    <Text style={styles.previewLabel}>Previsualización:</Text>
    <View style={styles.imagePreviewBox}>
      <Image
        source={{ uri: `data:image/jpeg;base64,${imagenBase64}` }}
        style={styles.previewImage}
      />
    </View>
  </View>
)}

            {/* Modal cámara/galería */}
            <ModalCamara
              visible={modalCamaraVisible}
              onClose={() => setModalCamaraVisible(false)}
              onGaleria={abrirGaleria}
              onCamara={abrirCamara}
            />
          </View>
        )}

        {/* Espaciador flexible */}
        <View style={{ flex: 1 }} />

        {/* Footer al final */}
        <FooterRedes />

        {/* Cargando detalles */}
        {loadingModal && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.loadingText}>Cargando detalles...</Text>
          </View>
        )}

        {/* Modal de información */}
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
