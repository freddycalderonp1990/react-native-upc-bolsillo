import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const windowWidth = Dimensions.get('window').width;

interface Props {
  visible: boolean;
  titulo: string;
  descripcion: string;
  tips: string[];
  iconSource: any;
  onClose: () => void;
}

const ModalServicios = ({
  visible,
  titulo,
  descripcion,
  tips,
  iconSource,
  onClose,
}: Props) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.iconWrapper}>
            <Image source={iconSource} style={styles.icon} />
            
          </View>

          <Text style={styles.title}>{titulo}</Text>
          <Text style={styles.description}>{descripcion}</Text>

          <Text style={styles.subtitle}>RECUERDE LO SIGUIENTE</Text>

          <FlatList
            data={tips}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.tipItem}>
                <Ionicons name="checkmark-circle-outline" size={18} color="#0c2c5c" />
                <Text style={styles.tipText}>{item}</Text>
        
              </View>
            )}
            ItemSeparatorComponent={() => <View style={styles.line} />}
          />

          <TouchableOpacity onPress={onClose} style={styles.okButton}>
            <Ionicons name="checkmark-circle" size={20} color="#fff" />
            <Text style={styles.okText}>Ok</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalServicios;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: windowWidth * 0.9,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    position: 'relative',
  },
  iconWrapper: {
    position: 'absolute',
    top: -40,
    backgroundColor: '#fff',
    borderRadius: 40,
    padding: 5,
  },
  icon: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  title: {
    marginTop: 30,
    backgroundColor: '#0c2c5c',
    paddingVertical: 8,
    paddingHorizontal: 20,
    color: '#fff',
    fontWeight: 'bold',
    borderRadius: 12,
    fontSize: 16,
    overflow: 'hidden',
  },
  description: {
    marginTop: 12,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
  },
  subtitle: {
    marginTop: 20,
    backgroundColor: '#0c2c5c',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    overflow: 'hidden',
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    paddingVertical: 8,
  },
  tipText: {

    color: '#000',
    fontWeight: 'bold',
    fontSize: 13,
    paddingHorizontal: 0,


    overflow: 'hidden',
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: '#0c2c5c',
  },
  okButton: {
    flexDirection: 'row',
    backgroundColor: '#28c76f',
    borderRadius: 50,
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginTop: 25,
    alignItems: 'center',
    gap: 8,
  },
  okText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
