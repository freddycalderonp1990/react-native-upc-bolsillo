import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const FooterRedes = () => {
  return (
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
  );
};

export default FooterRedes;

const styles = StyleSheet.create({
  footer: {
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
