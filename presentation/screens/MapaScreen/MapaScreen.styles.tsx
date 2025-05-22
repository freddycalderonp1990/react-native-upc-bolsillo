import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
      floatingButtonContainer: {
    position: 'absolute',
    left: 20,
    bottom: 130,
    zIndex: 2,
  },
    floatingButton: {
    backgroundColor: '#0c2c5c',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#fff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
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

 });
