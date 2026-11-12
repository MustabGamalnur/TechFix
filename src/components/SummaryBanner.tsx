import { StyleSheet, Text, View } from 'react-native';
import { COLORS, RADIUS, SPACE, TYPO } from '../styles/tokens';

type Props = {
  totalUnits: number;
  completedUnits: number;
  estimatedRevenue: number;
};

export default function SummaryBanner({
  totalUnits,
  completedUnits,
  estimatedRevenue,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.statBox}>
        <Text style={styles.statLabel}>Total Unit</Text>
        <Text style={styles.statValue}>{totalUnits}</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.statBox}>
        <Text style={styles.statLabel}>Selesai</Text>
        <Text style={styles.statValue}>{completedUnits}</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.statBoxWide}>
        <Text style={styles.statLabel}>Estimasi Biaya</Text>
        <Text style={styles.statValue}>
          Rp {estimatedRevenue.toLocaleString('id-ID')}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.l,
    padding: SPACE.m,
    marginBottom: SPACE.m,
    alignItems: 'center',
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statBoxWide: {
    flex: 1.6,
    alignItems: 'center',
  },
  divider: {
    width: 1,
    height: 28,
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  statLabel: {
    color: '#DBEAFE',
    fontSize: TYPO.caption,
    marginBottom: 2,
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: TYPO.title,
    fontWeight: '700',
  },
});