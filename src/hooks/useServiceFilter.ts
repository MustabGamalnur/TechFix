import { useEffect, useMemo, useState } from 'react';
import { ServiceItem, ServiceStatus } from '../context/ServiceContext';

export type FilterOption = 'Semua' | ServiceStatus;

export function useServiceFilter(items: ServiceItem[]) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<FilterOption>('Semua');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [query]);

  const filteredItems = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();

    return items.filter((item) => {
      const matchStatus =
        selectedStatus === 'Semua' || item.status === selectedStatus;
      const matchQuery =
        !q ||
        item.customerName.toLowerCase().includes(q) ||
        item.deviceModel.toLowerCase().includes(q) ||
        item.issue.toLowerCase().includes(q);

      return matchStatus && matchQuery;
    });
  }, [items, debouncedQuery, selectedStatus]);

  return {
    query,
    setQuery,
    selectedStatus,
    setSelectedStatus,
    filteredItems,
  };
}