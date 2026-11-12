import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import StatusBadge from '../../src/components/StatusBadge';
import { ServiceStatus, useServices } from '../../src/context/ServiceContext';
import { COLORS, RADIUS, SPACE, TYPO } from '../../src/styles/tokens';

const STATUS_OPTIONS: ServiceStatus[] = ['Antrean', 'Proses', 'Selesai'];

export default function DetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { getById, updateStatus, deleteItem } = useServices();

  const item = getById(id);

  if (!item) {
    return (
      <View style={styles.center}>
        <Text>Data servis tidak ditemukan.</Text>
      </View>
    );
  }

  const handleDelete = () => {
    deleteItem(item.id);
    router.back();
  };

  return (
    <>
      <Stack.Screen options={{ title: item.deviceModel }} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>{item.deviceModel}</Text>
            <StatusBadge status={item.status} />
          </View>

          <Text style={styles.meta}>Pelanggan: {item.customerName}</Text>
          <Text style={styles.meta}>Tanggal Masuk: {item.date}</Text>
          <Text style={styles.cost}>
            Estimasi Biaya: Rp {item.estimatedCost.toLocaleString('id-ID')}
          </Text>

          <View style={styles.divider} />
          <Text style={styles.sectionLabel}>Detail Keluhan & Perbaikan</Text>
          <Text style={styles.issue}>{item.issue}</Text>
        </View>

        <Text style={styles.sectionLabel}>Perbarui Status Pengerjaan</Text>
        <View style={styles.statusRow}>
          {STATUS_OPTIONS.map((status) => (
            <Pressable
              key={status}
              onPress={() => updateStatus(item.id, status)}
              style={[
                styles.statusBtn,
                item.status === status && styles.statusBtnActive,
              ]}
            >
              <Text
                style={[
                  styles.statusBtnText,
                  item.status === status && styles.statusBtnTextActive,
                ]}
              >
                {status}
              </Text>
            </Pressable>
          ))}
        </View>

        <Pressable onPress={handleDelete} style={styles.deleteBtn}>
          <Text style={styles.deleteText}>Hapus Data Servis</Text>
        </Pressable>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SPACE.l,
    gap: SPACE.m,
    backgroundColor: COLORS.background,
    flexGrow: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.l,
    padding: SPACE.l,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: SPACE.s,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: SPACE.s,
  },
  title: {
    fontSize: TYPO.h2,
    fontWeight: '700',
    color: COLORS.text,
    flex: 1,
  },
  meta: {
    fontSize: TYPO.body,
    color: COLORS.muted,
  },
  cost: {
    fontSize: TYPO.title,
    fontWeight: '700',
    color: COLORS.primary,
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACE.s,
  },
  sectionLabel: {
    fontSize: TYPO.body,
    fontWeight: '700',
    color: COLORS.text,
  },
  issue: {
    fontSize: TYPO.body,
    color: COLORS.text,
    lineHeight: 22,
  },
  statusRow: {
    flexDirection: 'row',
    gap: SPACE.s,
  },
  statusBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: RADIUS.m,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
  },
  statusBtnActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  statusBtnText: {
    fontWeight: '600',
    color: COLORS.text,
  },
  statusBtnTextActive: {
    color: '#FFFFFF',
  },
  deleteBtn: {
    marginTop: SPACE.l,
    padding: 14,
    borderRadius: RADIUS.m,
    borderWidth: 1,
    borderColor: COLORS.danger,
    alignItems: 'center',
  },
  deleteText: {
    color: COLORS.danger,
    fontWeight: '700',
  },
});