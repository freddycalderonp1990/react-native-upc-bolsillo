import React from 'react';
import {
    Image,
    Linking,
    Modal,
    Pressable,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { styles } from './UpcModal.styles';


const UpcModal = ({ visible, onClose, upc }) => {
  if (!upc) return null;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <View style={styles.upcDialog}>
          <Image source={require('@/assets/img/area.png')} style={styles.upcLogo} />
          <Text style={styles.upcTitle}>{upc.descripcionUpc}</Text>
          <Text style={styles.upcInfo}>📍Dirección:  {upc.dirUpc}</Text>
          <Text style={styles.upcInfo}>📧Email: {upc.mailUpc}</Text>
          <Text style={styles.upcInfo}>📞 Teléfono: {upc.fonoUpc}</Text>
          <Text style={styles.upcInfo}>📏Distancia: {parseFloat(upc.distance || 0).toFixed(2)} mts</Text>

          <View style={styles.upcActions}>
            <TouchableOpacity
              style={styles.upcButton}
              onPress={() => alert('Funcionalidad pendiente')}
            >
              <Text style={styles.upcButtonText}>Ruta al UPC</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.upcButton}
              onPress={() => {
                const telefono = upc.fonoUpc.replace(/\D/g, '');
                Linking.openURL(`tel:${telefono}`);
              }}
            >
              <Text style={styles.upcButtonText}>Llamar UPC</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

export default UpcModal;
