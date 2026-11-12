import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, RADIUS, SPACE, TYPO } from '../../src/styles/tokens';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Ionicons name="construct" size={44} color={COLORS.primary} />
        <Text style={styles.title}>TechFix Tracker</Text>
        <Text style={styles.subtitle}>
          Aplikasi Manajemen Antrean & Servis Perangkat
        </Text>

        <View style={styles.divider} />

        <Text style={styles.infoTitle}>Identitas Pengembang</Text>
        <Text style={styles.infoText}>Mochammad Mustab Gamalnur AS</Text>
        <Text style={styles.infoText}>Program Studi Teknik Informatika</Text>
        <Text style={styles.infoText}>Universitas Muhammadiyah Sukabumi</Text>

        <View style={styles.divider} />

        <Text style={styles.infoTitle}>Implementasi Teknis</Text>
        <Text style={styles.infoText}>
          • Expo Router (Bottom Tabs & Stack Dynamic Route)
        </Text>
        <Text style={styles.infoText}>
          • State Management (useState & useContext)
        </Text>
        <Text style={styles.infoText}>
          • Optimasi Hooks (useEffect, useMemo, useCallback, useRef)
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACE.l,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.l,
    padding: SPACE.xl,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    gap: SPACE.s,
  },
  title: {
    fontSize: TYPO.h1,
    fontWeight: '700',
    color: COLORS.text,
  },
  subtitle: {
    fontSize: TYPO.body,
    color: COLORS.muted,
    textAlign: 'center',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACE.m,
  },
  infoTitle: {
    fontSize: TYPO.body,
    fontWeight: '700',
    color: COLORS.primary,
    alignSelf: 'flex-start',
  },
  infoText: {
    fontSize: TYPO.body,
    color: COLORS.text,
    alignSelf: 'flex-start',
  },
});