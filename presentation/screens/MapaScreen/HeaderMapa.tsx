import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const HeaderMapa = () => {
  const router = useRouter();

  return (
    <LinearGradient
      colors={['#0c2c5c', '#1f3b70']}
      style={styles.headerContainer}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Encuentra la Upc más cercana</Text>
    </LinearGradient>
  );
};

export default HeaderMapa;

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 10, // para status bar
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0c2c5c',
    elevation: 4,
    zIndex: 1,
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    textAlign: 'center',
    marginRight: 30, // compensar ícono izquierdo
  },
});
