import React, { createContext, useContext, useMemo, useState } from 'react';

export type ServiceStatus = 'Antrean' | 'Proses' | 'Selesai';

export type ServiceItem = {
  id: number;
  customerName: string;
  deviceModel: string;
  issue: string;
  estimatedCost: number;
  status: ServiceStatus;
  date: string;
};

type ServiceContextType = {
  items: ServiceItem[];
  addItem: (item: Omit<ServiceItem, 'id'>) => void;
  updateStatus: (id: number, status: ServiceStatus) => void;
  deleteItem: (id: number) => void;
  getById: (id: string | number) => ServiceItem | undefined;
};

const ServiceContext = createContext<ServiceContextType | null>(null);

const INITIAL_ITEMS: ServiceItem[] = [
  {
    id: 101,
    customerName: 'Rizky Pratama',
    deviceModel: 'Asus ROG Zephyrus G14',
    issue: 'Ganti thermal paste & bersihkan kipas overheating',
    estimatedCost: 250000,
    status: 'Proses',
    date: '2026-11-12',
  },
  {
    id: 102,
    customerName: 'Siti Nurhaliza',
    deviceModel: 'Samsung Galaxy A54',
    issue: 'Penggantian unit layar OLED retak',
    estimatedCost: 850000,
    status: 'Antrean',
    date: '2026-11-12',
  },
  {
    id: 103,
    customerName: 'Dimas Anggara',
    deviceModel: 'Lenovo ThinkPad T480',
    issue: 'Upgrade RAM 16GB & instal ulang sistem operasi',
    estimatedCost: 450000,
    status: 'Selesai',
    date: '2026-11-11',
  },
];

export function ServiceProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ServiceItem[]>(INITIAL_ITEMS);

  const addItem = (newItem: Omit<ServiceItem, 'id'>) => {
    setItems((prev) => [
      {
        id: Date.now(),
        ...newItem,
      },
      ...prev,
    ]);
  };

  const updateStatus = (id: number, status: ServiceStatus) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
  };

  const deleteItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const getById = (id: string | number) => {
    return items.find((item) => item.id === Number(id));
  };

  const value = useMemo(
    () => ({
      items,
      addItem,
      updateStatus,
      deleteItem,
      getById,
    }),
    [items]
  );

  return (
    <ServiceContext.Provider value={value}>
      {children}
    </ServiceContext.Provider>
  );
}

export function useServices() {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error('useServices harus digunakan di dalam ServiceProvider');
  }
  return context;
}