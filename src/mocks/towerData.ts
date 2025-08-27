import type { CellTower } from '../types/tower';

export const TOWERS: CellTower[] = [
  // Cairo (3)
  {
    id: 'c1',
    name: 'Cairo Tower A',
    city: 'Cairo',
    networkType: '4G',
    status: 'active',
    signalStrength: 4,
  },
  {
    id: 'c2',
    name: 'Cairo Tower B',
    city: 'Cairo',
    networkType: '5G',
    status: 'active',
    signalStrength: 5,
  },
  {
    id: 'c3',
    name: 'Cairo Tower C',
    city: 'Cairo',
    networkType: '4G',
    status: 'offline',
    signalStrength: 2,
  },

  // Alexandria (3)
  {
    id: 'a1',
    name: 'Alexandria Tower A',
    city: 'Alexandria',
    networkType: '5G',
    status: 'active',
    signalStrength: 4,
  },
  {
    id: 'a2',
    name: 'Alexandria Tower B',
    city: 'Alexandria',
    networkType: '4G',
    status: 'offline',
    signalStrength: 1,
  },
  {
    id: 'a3',
    name: 'Alexandria Tower C',
    city: 'Alexandria',
    networkType: '5G',
    status: 'active',
    signalStrength: 5,
  },

  // Hurghada (3)
  {
    id: 'h1',
    name: 'Hurghada Tower A',
    city: 'Hurghada',
    networkType: '4G',
    status: 'active',
    signalStrength: 3,
  },
  {
    id: 'h2',
    name: 'Hurghada Tower B',
    city: 'Hurghada',
    networkType: '4G',
    status: 'offline',
    signalStrength: 1,
  },
  {
    id: 'h3',
    name: 'Hurghada Tower C',
    city: 'Hurghada',
    networkType: '5G',
    status: 'active',
    signalStrength: 4,
  },

  // Luxor (3)
  {
    id: 'l1',
    name: 'Luxor Tower A',
    city: 'Luxor',
    networkType: '5G',
    status: 'offline',
    signalStrength: 2,
  },
  {
    id: 'l2',
    name: 'Luxor Tower B',
    city: 'Luxor',
    networkType: '4G',
    status: 'active',
    signalStrength: 3,
  },
  {
    id: 'l3',
    name: 'Luxor Tower C',
    city: 'Luxor',
    networkType: '5G',
    status: 'active',
    signalStrength: 4,
  },
];
