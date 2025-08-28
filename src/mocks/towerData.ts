import type { CellTower } from '../types/tower';

export const TOWERS: CellTower[] = [
  // Cairo (2)
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

  // Alexandria (4)
  {
    id: 'a1',
    name: 'Alexandria Tower A',
    city: 'Alexandria',
    networkType: '5G',
    status: 'offline',
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
  {
    id: 'a4',
    name: 'Alexandria Tower D',
    city: 'Alexandria',
    networkType: '5G',
    status: 'active',
    signalStrength: 5,
  },

  // Hurghada (5)
  {
    id: 'h1',
    name: 'Hurghada Tower A',
    city: 'Hurghada',
    networkType: '4G',
    status: 'offline',
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
  {
    id: 'h4',
    name: 'Hurghada Tower D',
    city: 'Hurghada',
    networkType: '5G',
    status: 'active',
    signalStrength: 2,
  },
  {
    id: 'h5',
    name: 'Hurghada Tower E',
    city: 'Hurghada',
    networkType: '5G',
    status: 'active',
    signalStrength: 1,
  },

  // Luxor (1)
  {
    id: 'l1',
    name: 'Luxor Tower A',
    city: 'Luxor',
    networkType: '5G',
    status: 'offline',
    signalStrength: 2,
  },
];
