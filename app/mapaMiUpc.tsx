
import MapaScreen from '@/presentation/screens/MapaScreen/MapaScreen';
import { Stack } from 'expo-router';

export default function mapaMiUpc() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <MapaScreen />
    </>
  );
}