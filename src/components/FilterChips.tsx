import { Pressable, StyleSheet, Text, View } from 'react-native';
import { FilterOption } from '../hooks/useServiceFilter';
import { COLORS, RADIUS, SPACE, TYPO } from '../styles/tokens';

type Props = {
  selected: FilterOption;
  onSelect: (option: FilterOption) => void;
};

const OPTIONS: FilterOption[] = ['Semua', 'Antrean', 'Proses', 'Selesai'];

export default function FilterChips({ selected, onSelect }: Props) {
  return (
    <View style={styles.row}>
      {OPTIONS.map((option) => {
        const isActive = selected === option;
        return (
          <Pressable
            key={option}
            onPress={() => onSelect(option)}
            style={[styles.chip, isActive && styles.chipActive]}
          >
            <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
              {option}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: SPACE.s,
    marginBottom: SPACE.m,
  },
  chip: {
    paddingHorizontal: SPACE.m,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  chipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  chipText: {
    fontSize: TYPO.caption,
    fontWeight: '600',
    color: COLORS.muted,
  },
  chipTextActive: {
    color: '#FFFFFF',
  },
});