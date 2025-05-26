import { ServiciosRepositoryImpl } from '@/data/repository/ServiciosRepositoryImpl';
import { ServiciosDetalleEntity } from '@/domain/entities/ServiciosDetalleEntity';
import { ServiciosEntity } from '@/domain/entities/ServiciosEntity';
import { GetMedidasProteccion } from '@/domain/usecases/GetMedidasProteccion';
import { GetServiciosDetalle } from '@/domain/usecases/GetServiciosDetalle';
import DesingBanner from '@/presentation/components/shared/DesingBanner';
import FooterRedes from '@/presentation/components/shared/FooterRedes';
import HeaderPage from '@/presentation/components/shared/HeaderPage';
import ModalServicios from '@/presentation/components/shared/ModalServicios';
import { GlobalStyles } from '@/presentation/theme/globalStyles';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from './MedidasProteccion.styles';

const MedidasProteccionScreen = () => {
  const [loading, setLoading] = useState(true);
  const [medidasProteccion, setMedidasProteccion] = useState<ServiciosEntity[]>([]);
  const [selectedItem, setSelectedItem] = useState<ServiciosEntity | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [tips, setTips] = useState<string[]>([]);
  const [loadingModal, setLoadingModal] = useState(false);

  useEffect(() => {
    (async () => {
      const repo = new ServiciosRepositoryImpl();
      const usecase = new GetMedidasProteccion(repo);

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

  const renderItem = ({ item }: { item: ServiciosEntity }) => (
    <TouchableOpacity onPress={() => handleOpenModal(item)}>
      <View style={styles.itemContainer}>
        <Image
          source={{ uri: `data:image/jpeg;base64,${item.imgBase64}` }}
          style={styles.itemIcon}
        />
        <Text style={styles.itemText}>{item.descripcion}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={require('@/assets/img/fondo1.png')}
      style={GlobalStyles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <HeaderPage titulo="Medidas de Autoprotección" />

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
          <FlatList
            data={medidasProteccion}
            keyExtractor={(item) => item.idUpcServicio.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
            ItemSeparatorComponent={() => <View style={styles.separatorLine} />}
          />
        )}

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

export default MedidasProteccionScreen;
