import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const CustomDrawer = (props: any) => {
  const navigation = useNavigation();

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      {/* Encabezado */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.powerBtn} onPress={() => console.log('Cerrar sesión')}>
          <Ionicons name="power" size={24} color="red" />
        </TouchableOpacity>

        <Image
          source={require('../../assets/images/icon.png')}
          style={styles.avatar}
        />
        <Text style={styles.username}>Usuario</Text>
        <Text style={styles.email}>email@dominio.com</Text>
      </View>

      {/* Menú manual */}
      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('(tabs)')}>
          <Ionicons name="home-outline" size={22} color="#fff" style={styles.icon} />
          <Text style={styles.menuText}>Inicio</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('share/index')}>
          <Ionicons name="share-social-outline" size={22} color="#fff" style={styles.icon} />
          <Text style={styles.menuText}>Compartir App</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('user/index')}>
          <Ionicons name="person-outline" size={22} color="#fff" style={styles.icon} />
          <Text style={styles.menuText}>Registrar Usuario</Text>
        </TouchableOpacity>
      </View>

      {/* Footer con redes sociales */}
      <View style={styles.footer}>
<View style={styles.socialIcons}>
  <TouchableOpacity style={styles.circleIcon} onPress={() => Linking.openURL('https://facebook.com')}>
    <FontAwesome name="facebook" size={20} color="#3b5998" />
  </TouchableOpacity>

  <TouchableOpacity style={styles.circleIcon} onPress={() => Linking.openURL('https://x.com')}>
    <FontAwesome name="twitter" size={20} color="#fff" />
  </TouchableOpacity>

  <TouchableOpacity style={styles.circleIcon} onPress={() => Linking.openURL('https://instagram.com')}>
    <FontAwesome name="instagram" size={20} color="#E1306C" />
  </TouchableOpacity>

  <TouchableOpacity style={styles.circleIcon} onPress={() => Linking.openURL('https://youtube.com')}>
    <FontAwesome name="youtube-play" size={20} color="red" />
  </TouchableOpacity>
</View>
        <Text style={styles.version}>v1.0.0 - 1 Desc</Text>
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'transparent', // transparente para dejar ver el fondo gris oscuro
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
    position: 'relative',
  },
  powerBtn: {
    position: 'absolute',
    top: 15,
    right: 20,
    zIndex: 1,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#ccc',
    marginBottom: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff', // blanco
  },
  email: {
    fontSize: 14,
    color: '#ccc', // gris claro
  },
  menu: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  icon: {
    width: 28,
  },
  menuText: {
    fontSize: 16,
    color: '#fff', // texto blanco para los ítems
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#555', // línea más suave
    paddingVertical: 20,
    alignItems: 'center',
    marginTop: 'auto',
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 10,
    gap: 20,
  },
  
  circleIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // círculo sutil
    justifyContent: 'center',
    alignItems: 'center',
  },
  version: {
    fontSize: 12,
    color: '#aaa', // gris claro
  },
});