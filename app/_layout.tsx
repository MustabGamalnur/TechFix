import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ServiceProvider } from '../src/context/ServiceContext';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ServiceProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="detail/[id]"
            options={{ title: 'Detail Servis' }}
          />
        </Stack>
      </ServiceProvider>
    </SafeAreaProvider>
  );
}