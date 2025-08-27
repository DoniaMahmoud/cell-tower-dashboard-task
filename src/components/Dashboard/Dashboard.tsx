import { TOWERS } from '../../mocks/towerData';
import TowersTable from '../TowersTable/TowersTable';
import SummaryCard from '../SummaryCards/SummaryCard';
import Title from '../Title/Title';
import './Dashboard.scss';
import Filters from '../Filters/Filters';
import { useMemo, useState } from 'react';
import type { CellTower } from '../../types/tower';

const Dashboard = () => {
  const towers = TOWERS;

  const [searchValue, setSearchValue] = useState('');
  const [cityFilter, setCityFilter] = useState<'All' | CellTower['city']>('All');

  const filteredTowers = useMemo(() => {
    return towers.filter(tower => {
      const query = searchValue.trim().toLowerCase();
      const towerName = tower.name.toLowerCase();
      const matchesNames = towerName.includes(query);
      const matchesCity = cityFilter === 'All' || tower.city === cityFilter;

      return matchesNames && matchesCity;
    });
  }, [cityFilter, searchValue, towers]);

  const totalTowers = towers.length;
  const activeTowers = towers.filter(tower => tower.status === 'active').length;
  const averageSignal = Math.round(
    towers.reduce((sum, tower) => sum + tower.signalStrength, 0) / totalTowers
  );

  return (
    <div className="dashboard-container">
      <Title />

      <div className="summary-cards">
        <SummaryCard title="Total Towers" count={totalTowers} />
        <SummaryCard title="Active Towers" count={activeTowers} />
        <SummaryCard title="Average Signal" count={averageSignal} />
      </div>

      <Filters
        searchValue={searchValue}
        onSearch={setSearchValue}
        city={cityFilter}
        onCityFilter={setCityFilter}
      />

      <TowersTable towers={filteredTowers} />
    </div>
  );
};

export default Dashboard;
