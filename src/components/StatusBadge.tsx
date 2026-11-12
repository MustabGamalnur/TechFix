import { StyleSheet, Text, View } from 'react-native';
import { ServiceStatus } from '../context/ServiceContext';
import { COLORS, RADIUS, SPACE, TYPO } from '../styles/tokens';

type Props = {
  status: ServiceStatus;
};

export default function StatusBadge({ status }: Props) {
  const badgeStyle =
    status === 'Selesai'
      ? { bg: COLORS.successSoft, text: COLORS.success }
      : status === 'Proses'
      ? { bg: COLORS.primarySoft, text: COLORS.primary }
      : { bg: COLORS.warningSoft, text: COLORS.warning };

  return (
    <View style={[styles.badge, { backgroundColor: badgeStyle.bg }]}>
      <Text style={[styles.label, { color: badgeStyle.text }]}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: SPACE.m,
    paddingVertical: SPACE.xs,
    borderRadius: RADIUS.full,
  },
  label: {
    fontSize: TYPO.caption,
    fontWeight: '700',
  },
});