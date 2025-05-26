// ModalCamara.tsx
import { Ionicons } from '@expo/vector-icons';
import React from 'react';


import {
    Image,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';


interface Props {
  visible: boolean;
  onClose: () => void;
  onGaleria: () => void;
  onCamara: () => void;
}


const ModalCamara = ({ visible, onClose, onGaleria, onCamara }: Props) => {
    
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.close} onPress={onClose}>
            <Ionicons name="close" size={24} color="#001f4b" />
          </TouchableOpacity>

          <View style={styles.iconWrapper}>
            <Image
              source={require('@/assets/img/foto.png')} // reemplaza con tu icono
              style={styles.icon}
            />

         
          </View>

          <Text style={styles.text}>
            Elige una imagen de la galería o toma una foto con la cámara
          </Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.btn} onPress={onGaleria}>
              <Ionicons name="image-outline" size={22} color="#fff" />
              <Text style={styles.btnText}>Galería</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn} onPress={onCamara}>
              <Ionicons name="camera-outline" size={22} color="#fff" />
              <Text style={styles.btnText}>Cámara</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalCamara;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    position: 'relative',
  },
  close: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  iconWrapper: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 60,
    marginTop: -50,
    zIndex: 1,
  },
  icon: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  text: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 15,
    color: '#333',
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
  },
  btn: {
    backgroundColor: '#0c2c5c',
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
    gap: 8,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
