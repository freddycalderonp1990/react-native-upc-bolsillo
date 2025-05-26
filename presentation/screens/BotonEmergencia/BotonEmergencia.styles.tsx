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
  backgroundColor: 'transparent',  // semitransparente
  borderRadius: 12,
  padding: 2,
  elevation: 2,
  gap: 20,
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


card: {
  backgroundColor: '#fff',
  borderRadius: 20,
  padding: 20,
  margin: 20,
  elevation: 5,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
},
label: {
  fontWeight: 'bold',
  marginBottom: 8,
  fontSize: 15,
},
dropdownContainer: {
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 10,
  padding: 12,

  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 5,
},
dropdownText: {
  fontSize: 16,
},
clearIcon: {
  fontSize: 18,
  color: 'red',
},

placeholderText: {
  color: '#888',
  flex: 1,
},

imageButton: {
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 10,
  padding: 12,
  marginTop: 10,
},
imageIcon: {
  width: 24,
  height: 24,
  marginRight: 10,
  tintColor: '#0c2c5c',
},
imageText: {
  color: '#0c2c5c',
  fontWeight: 'bold',
},




inputBox: {
  flexDirection: 'row',
  alignItems: 'flex-start',
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 10,
  padding: 10,
  backgroundColor: '#fff',
  minHeight: 80,
  marginBottom: 10,
},

textInput: {
  flex: 1,
  fontSize: 14,
  color: '#000',
  paddingLeft: 10,
  paddingRight: 10,
  textAlignVertical: 'top', // Importante para multiline
},
inputIcon: {
  marginTop: 4,
},



charCounter: {
  fontSize: 12,
  color: '#888',
  alignSelf: 'flex-end',
},






previewContainer: {
  marginTop: 10,
  alignItems: 'center',
},
previewLabel: {
  fontSize: 14,
  color: '#0c2c5c',
  fontWeight: 'bold',
  marginBottom: 5,
},
imagePreviewBox: {
  borderRadius: 10,
  overflow: 'hidden',
  borderWidth: 1,
  borderColor: '#ccc',
},
previewImage: {
  width: 150,
  height: 150,
  resizeMode: 'cover',
},



});
