export interface CellTower {
  id: string;
  name: string;
  city: 'Cairo' | 'Alexandria' | 'Hurghada' | 'Luxor';
  networkType: '4G' | '5G';
  status: 'active' | 'offline';
  signalStrength: number;
}
