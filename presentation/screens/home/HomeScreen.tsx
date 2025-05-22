
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ImageBackground } from 'react-native';



import {
  Alert,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { styles } from './HomeScreen.styles';

const HomeScreen = () => {
  const router = useRouter();
  const navigation = useNavigation();

  const [visibleDialogo, setVisibleDialogo] = useState(false);

  const onToggleDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

const abrirDialogo = () => router.push('/mapaMiUpc');

const obtenerFechaHoy = (): string => {
  const fecha = new Date();

  const opciones: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

  const fechaFormateada = new Intl.DateTimeFormat('es-EC', opciones).format(fecha);
  
  // Capitalizar la primera letra
  return fechaFormateada.charAt(0).toUpperCase() + fechaFormateada.slice(1);
};

  const cerrarDialogo = () => setVisibleDialogo(false);

  const botonEmergencia = () => {
    Alert.alert('Emergencia', 'Botón de emergencia activado');
  };

  const verServiciosPolicia = () => {
    Alert.alert('Servicios', 'Servicios de policía comunitaria');
  };

  const verMedidasProteccion = () => {
    Alert.alert('Seguridad', 'Medidas de autoprotección');
  };

  return (
  <ImageBackground
  source={require('@/assets/img/fondo1.png')}
  style={styles.background}
  resizeMode="cover"
>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onToggleDrawer}>
          <Ionicons name="menu" size={24} color="#fff" />
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <Image source={require('@/assets/img/upedificio.png')} style={styles.logo} />
          <Text style={styles.title}>MI UPC</Text>
        </View>

        <TouchableOpacity>
             <Ionicons name="notifications-outline" size={22} color="#fff" style={styles.notificationIcon} />
        </TouchableOpacity>
      </View>

      {/* Bienvenida */}
      <View style={styles.welcomeBox}>
        <Image source={require('@/assets/img/upc.jpeg')} style={styles.userIcon} />
        <View>
          <Text style={styles.welcomeText}>BIENVENID@</Text>
  <Text style={styles.dateText}>Hoy es {obtenerFechaHoy()}</Text>
        </View>
      </View>

      {/* Acciones principales */}
      <View style={styles.grid}>
        <TouchableOpacity style={styles.card} onPress={abrirDialogo}>
          <Image source={require('@/assets/img/upc.jpeg')} style={styles.cardIcon} />
          <Text style={styles.cardText}>ENCUENTRA LA UPC MÁS CERCANA</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={botonEmergencia}>
          <Image source={require('@/assets/img/boton_emergencia.jpeg')} style={styles.cardIcon} />
          <Text style={styles.cardText}>BOTÓN DE EMERGENCIA</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={verServiciosPolicia}>
          <Image source={require('@/assets/img/servicios_comunitario.jpeg')} style={styles.cardIcon} />
          <Text style={styles.cardText}>SERVICIOS DE POLICÍA COMUNITARIA</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={verMedidasProteccion}>
          <Image source={require('@/assets/img/mediadas_seguridad.jpeg')} style={styles.cardIcon} />
          <Text style={styles.cardText}>MEDIDAS DE AUTOPROTECCIÓN</Text>
        </TouchableOpacity>
      </View>

      {/* Footer redes sociales */}
      <View style={styles.footer}>
        <View style={styles.socialRow}>
          <View style={styles.socialIconBox}>
            <Image source={require('@/assets/img/facebook.png')} style={styles.socialIcon} />
          </View>
          <View style={styles.socialIconBox}>
            <Image source={require('@/assets/img/twitter.png')} style={styles.socialIcon} />
          </View>
          <View style={styles.socialIconBox}>
            <Image source={require('@/assets/img/instagran.png')} style={styles.socialIcon} />
          </View>
          <View style={styles.socialIconBox}>
            <Image source={require('@/assets/img/youtube.png')} style={styles.socialIcon} />
          </View>
        </View>
      </View>

      {/* Modal */}
      <Modal
        visible={visibleDialogo}
        transparent={true}
        animationType="fade"
        onRequestClose={cerrarDialogo}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Ubicación más cercana</Text>
    
            <Text style={styles.modalMessage}>
              Aquí jajapuedes insertar un mapa o la lógica de geolocalización.
            </Text>
            <TouchableOpacity style={styles.closeButton} onPress={cerrarDialogo}>
              <Text style={styles.closeText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};

export default HomeScreen;

