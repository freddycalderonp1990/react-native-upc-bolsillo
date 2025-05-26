import ServiciosComunitarioScreen from '@/presentation/screens/ServiciosComunitario/ServiciosComunitarioScreen';
import { Stack } from 'expo-router';

export default function serviciosComunitario() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ServiciosComunitarioScreen />
    </>
  );
}