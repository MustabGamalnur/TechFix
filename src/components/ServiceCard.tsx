import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ServiceItem } from '../context/ServiceContext';
import { COLORS, RADIUS, SPACE, TYPO } from '../styles/tokens';
import StatusBadge from './StatusBadge';

type Props = {
  item: ServiceItem;
  onPress: () => void;
};

export default function ServiceCard({ item, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.deviceRow}>
          <Ionicons name="hardware-chip-outline" size={18} color={COLORS.primary} />
          <Text style={styles.device} numberOfLines={1}>
            {item.deviceModel}
          </Text>
        </View>
        <StatusBadge status={item.status} />
      </View>

      <Text style={styles.customer}>{item.customerName}</Text>
      <Text style={styles.issue} numberOfLines={2}>
        {item.issue}
      </Text>

      <View style={styles.bottomRow}>
        <Text style={styles.date}>{item.date}</Text>
        <Text style={styles.cost}>
          Rp {item.estimatedCost.toLocaleString('id-ID')}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.m,
    padding: SPACE.m,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 6,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: SPACE.s,
  },
  deviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  device: {
    fontSize: TYPO.title,
    fontWeight: '700',
    color: COLORS.text,
    flex: 1,
  },
  customer: {
    fontSize: TYPO.caption,
    fontWeight: '600',
    color: COLORS.primary,
  },
  issue: {
    fontSize: TYPO.body,
    color: COLORS.muted,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  date: {
    fontSize: TYPO.caption,
    color: COLORS.muted,
  },
  cost: {
    fontSize: TYPO.body,
    fontWeight: '700',
    color: COLORS.text,
  },
});