import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  upcDialog: {
    backgroundColor: '#0c2c5c',
    padding: 20,
    borderRadius: 20,
    width: '85%',
    alignItems: 'center',
  },
  upcLogo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  upcTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  upcInfo: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 5,
    textAlign: 'center',
  },
  upcActions: {
    flexDirection: 'row',
    marginTop: 15,
    gap: 20,
  },
  upcButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  upcButtonText: {
    color: '#0c2c5c',
    fontWeight: 'bold',
  },
  upcTitleBox: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#f2f2f2',
  paddingHorizontal: 5,
  paddingVertical: 5,
  borderRadius: 15,
  marginTop: 2,
  marginBottom: 10,
  alignSelf: 'center',
  width: '100%',
},
upcIcon: {
  width: 40,
  height: 40,
  marginRight: 10,
},
upcTextLogo: {
  height: 40,
  width: 120,
},
});
