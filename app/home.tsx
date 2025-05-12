import { Ionicons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const onToggleDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };


  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onToggleDrawer}>
   
        <TouchableOpacity onPress={onToggleDrawer}>
  <Ionicons name="menu" size={24} color="#fff" />
</TouchableOpacity>
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <Image source={require('@/assets/images/icon.png')} style={styles.logo} />
          <Text style={styles.title}>MI UPC</Text>
        </View>
        <TouchableOpacity>
          <Image
            source={require('@/assets/images/icon.png')} // ícono de notificación
            style={styles.notificationIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Bienvenida */}
      <View style={styles.welcomeBox}>
        <Image source={require('@/assets/images/icon.png')} style={styles.userIcon} />
        <View>
          <Text style={styles.welcomeText}>BIENVENID@</Text>
          <Text style={styles.dateText}>Hoy es Domingo 11 de Mayo del 2025</Text>
        </View>
      </View>

      {/* Acciones principales */}
      <View style={styles.grid}>
        <TouchableOpacity style={styles.card}>
          <Image source={require('@/assets/icon/icon_mi_upc.png')} style={styles.cardIcon} />
          <Text style={styles.cardText}>ENCUENTRA LA UPC MÁS CERCANA</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Image source={require('@/assets/img/fono.png')} style={styles.cardIcon} />
          <Text style={styles.cardText}>BOTÓN DE EMERGENCIA</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Image source={require('@/assets/images/icon.png')} style={styles.cardIcon} />
          <Text style={styles.cardText}>SERVICIOS DE POLICÍA COMUNITARIA</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Image source={require('@/assets/images/icon.png')} style={styles.cardIcon} />
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
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#0c2c5c',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  menuIcon: {
    width: 25,
    height: 25,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logo: {
    width: 30,
    height: 30,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  notificationIcon: {
    width: 25,
    height: 25,
  },
  welcomeBox: {
    margin: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    padding: 15,
    borderRadius: 20,
  },
  userIcon: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  welcomeText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  dateText: {
    color: '#0c2c5c',
    marginTop: 5,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    rowGap: 20,
    marginHorizontal: 10,
    marginTop: 10,
  },
  card: {
    width: 160,
    height: 140,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    padding: 10,
  },
  cardIcon: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  cardText: {
    textAlign: 'center',
    fontWeight: '600',
    color: '#0c2c5c',
    fontSize: 13,
  },
  footer: {
  marginTop: 'auto',
  paddingVertical: 20,
  alignItems: 'center',
  backgroundColor: '#001f4b',
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
},
socialRow: {
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  width: '100%',
  paddingHorizontal: 20,
},
socialIconBox: {
  width: 60,
  height: 60,
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  borderRadius: 20,
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: 'rgba(255, 255, 255, 0.3)',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
},
socialIcon: {
  width: 30,
  height: 30,
  resizeMode: 'contain',
},

});