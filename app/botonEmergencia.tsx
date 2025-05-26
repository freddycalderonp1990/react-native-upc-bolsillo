
import BotonEmergenciaScreen from '@/presentation/screens/BotonEmergencia/BotonEmergenciaScreen';
import { Stack } from 'expo-router';

export default function botonEmergencia() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <BotonEmergenciaScreen />
    </>
  );
}