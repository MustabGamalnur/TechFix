import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { ServiceStatus, useServices } from '../../src/context/ServiceContext';
import { COLORS, RADIUS, SPACE, TYPO } from '../../src/styles/tokens';

const STATUS_LIST: ServiceStatus[] = ['Antrean', 'Proses', 'Selesai'];

export default function CreateScreen() {
  const router = useRouter();
  const { addItem } = useServices();

  const [customerName, setCustomerName] = useState('');
  const [deviceModel, setDeviceModel] = useState('');
  const [issue, setIssue] = useState('');
  const [costText, setCostText] = useState('');
  const [status, setStatus] = useState<ServiceStatus>('Antrean');

  const isValid =
    customerName.trim().length > 0 &&
    deviceModel.trim().length > 0 &&
    issue.trim().length > 0 &&
    Number(costText) > 0;

  const handleSave = () => {
    if (!isValid) return;

    addItem({
      customerName: customerName.trim(),
      deviceModel: deviceModel.trim(),
      issue: issue.trim(),
      estimatedCost: Number(costText),
      status,
      date: new Date().toISOString().split('T')[0],
    });

    setCustomerName('');
    setDeviceModel('');
    setIssue('');
    setCostText('');
    setStatus('Antrean');
    router.replace('/');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Input Unit Servis Baru</Text>

      <Text style={styles.label}>Nama Pelanggan</Text>
      <TextInput
        value={customerName}
        onChangeText={setCustomerName}
        placeholder="Contoh: Budi Santoso"
        style={styles.input}
      />

      <Text style={styles.label}>Tipe Perangkat (HP / Laptop)</Text>
      <TextInput
        value={deviceModel}
        onChangeText={setDeviceModel}
        placeholder="Contoh: Oppo Reno7 Z 5G / Acer Aspire 5"
        style={styles.input}
      />

      <Text style={styles.label}>Keluhan / Tindakan Servis</Text>
      <TextInput
        value={issue}
        onChangeText={setIssue}
        placeholder="Jelaskan kerusakan atau perbaikan..."
        multiline
        style={[styles.input, styles.textArea]}
      />

      <Text style={styles.label}>Estimasi Biaya (Rp)</Text>
      <TextInput
        value={costText}
        onChangeText={setCostText}
        placeholder="Contoh: 350000"
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.label}>Status Awal</Text>
      <View style={styles.statusRow}>
        {STATUS_LIST.map((item) => (
          <Pressable
            key={item}
            onPress={() => setStatus(item)}
            style={[
              styles.statusBtn,
              status === item && styles.statusBtnActive,
            ]}
          >
            <Text
              style={[
                styles.statusText,
                status === item && styles.statusTextActive,
              ]}
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </View>

      <Pressable
        onPress={handleSave}
        disabled={!isValid}
        style={[styles.submitBtn, !isValid && styles.submitDisabled]}
      >
        <Text style={styles.submitText}>Simpan Data Servis</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SPACE.l,
    gap: SPACE.s,
    backgroundColor: COLORS.background,
    flexGrow: 1,
  },
  heading: {
    fontSize: TYPO.h1,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACE.s,
  },
  label: {
    fontSize: TYPO.body,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: 4,
  },
  input: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.m,
    padding: 12,
    fontSize: TYPO.body,
    color: COLORS.text,
  },
  textArea: {
    minHeight: 90,
    textAlignVertical: 'top',
  },
  statusRow: {
    flexDirection: 'row',
    gap: SPACE.s,
    marginTop: 4,
  },
  statusBtn: {
    flex: 1,
    paddingVertical: 10,
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
  statusText: {
    fontWeight: '600',
    color: COLORS.muted,
  },
  statusTextActive: {
    color: '#FFFFFF',
  },
  submitBtn: {
    backgroundColor: COLORS.primary,
    padding: 14,
    borderRadius: RADIUS.m,
    alignItems: 'center',
    marginTop: SPACE.l,
  },
  submitDisabled: {
    opacity: 0.45,
  },
  submitText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: TYPO.title,
  },
});