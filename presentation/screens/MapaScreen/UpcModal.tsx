import { Upc } from '@/domain/entities/Upc';
import React from 'react';
import {
  Alert,
  Image,
  Linking,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from './UpcModal.styles';

interface Props {
  visible: boolean;
  upc: Upc | null;
  onClose: () => void;
  onRutaPress: (upc: Upc) => void; // 👈 nuevo
}


const llamarTelefonoUpc = (telf: string) => {
  const phone = telf.replace(/\D/g, ''); // limpia caracteres no numéricos
  const url = `tel:${phone}`;

  Linking.canOpenURL(url)
    .then((supported) => {
      if (!supported) {
        Alert.alert('Error', 'No se pudo iniciar la llamada');
      } else {
        return Linking.openURL(url);
      }
    })
    .catch((err) => {
      console.error('Error al intentar llamar:', err);
      Alert.alert('Error', 'Ocurrió un problema al llamar al número');
    });
};

const UpcModal = ({ visible, upc, onClose, onRutaPress }: Props) => {
  if (!upc) return null;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <View style={styles.upcDialog}>
         <View style={styles.upcTitleBox}>
  <Image
    source={require('@/assets/img/upedificio.png')} // primer ícono o imagen
    style={styles.upcIcon}
  />
  <Image
    source={require('@/assets/img/titulo.png')} // texto "Mi UPC"
    style={styles.upcTextLogo}
    resizeMode="contain"
  />
</View>
         
          <Text style={styles.upcTitle}>{upc.descripcionUpc}</Text>
          <Text style={styles.upcInfo}>📍Dirección:  {upc.dirUpc}</Text>
          <Text style={styles.upcInfo}>📧Email: {upc.mailUpc}</Text>
          <Text style={styles.upcInfo}>📞 Teléfono: {upc.fonoUpc}</Text>
          <Text style={styles.upcInfo}>📏Distancia: {parseFloat(upc.distance || 0).toFixed(2)} mts</Text>

          <View style={styles.upcActions}>
                       <TouchableOpacity
              style={styles.upcButton}
              onPress={() => onRutaPress(upc)} // 👈 aquí ejecutas la ruta
            >
              <Text style={styles.upcButtonText}>Ruta al UPC</Text>
            </TouchableOpacity>

            <TouchableOpacity 
             style={styles.upcButton}
            
            onPress={() => llamarTelefonoUpc(upc.fonoUpc)}>
  <Text style={styles.upcButtonText}>Llamar UPC</Text>
</TouchableOpacity>


          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

export default UpcModal;
