import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
     backgroundColor: 'transparent', // <- clave// fondo semitransparente para no ocultar totalmente la imagen
  },
  listContent: {
    paddingHorizontal: 30,
    paddingVertical: 0,
    flexGrow: 1,
  },
itemContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: 'transparent', 
  borderRadius: 12,
  padding: 2,

},
  itemIcon: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  itemText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0c2c5c',
    flexShrink: 1,
  },
  separatorLine: {
    height: 1,
    backgroundColor: '#0c2c5c',
    marginVertical: 15,
  },
    loadingOverlay: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 999,
},
loadingText: {
  color: '#fff',
  marginTop: 10,
  fontSize: 16,
},


modalOverlay: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 10,
},
modalContainer: {
  width: '85%',
  backgroundColor: '#fff',
  borderRadius: 20,
  padding: 20,
  alignItems: 'center',
},
modalTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 10,
  textAlign: 'center',
},
modalImage: {
  width: 150,
  height: 150,
  resizeMode: 'contain',
  marginBottom: 15,
},
closeButton: {
  backgroundColor: '#0c2c5c',
  paddingVertical: 8,
  paddingHorizontal: 20,
  borderRadius: 10,
},
closeText: {
  color: '#fff',
  fontWeight: 'bold',
},

});
