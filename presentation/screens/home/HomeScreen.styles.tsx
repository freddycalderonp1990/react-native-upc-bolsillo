import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 80,
    paddingBottom:20,
    backgroundColor: '#0c2c5c',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
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
  justifyContent: 'center', // centra horizontalmente
  alignItems: 'center',     // centra verticalmente si hay espacio
  gap: 20,                  // espaciado entre ítems (React Native 0.71+)
  paddingVertical: 20,
},
card: {
  width: 160,
  height: 140,
  backgroundColor: '#e0e0e0',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 15,
  padding: 10,
  margin: 10, // separa entre cards
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 12,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#0A84FF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  closeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  background: {
  flex: 1,
  resizeMode: 'cover',
  justifyContent: 'center',
},

});
