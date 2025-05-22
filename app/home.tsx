import HomeScreen from '@/presentation/screens/home/HomeScreen';
import { Stack } from 'expo-router';


export default function HomePage() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <HomeScreen />
    </>
  );
}