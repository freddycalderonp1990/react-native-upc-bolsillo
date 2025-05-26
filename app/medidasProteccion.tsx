

import MedidasProteccionScreen from '@/presentation/screens/MedidasProteccion/MedidasProteccionScreen';
import { Stack } from 'expo-router';

export default function medidasProteccion() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <MedidasProteccionScreen />
    </>
  );
}