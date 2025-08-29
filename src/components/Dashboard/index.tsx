import { useMemo, useState } from 'react';
import { TOWERS } from '../../mocks/towerData';
import type { CellTower } from '../../types/tower';
import SummaryCard from '../SummaryCards';
import Filters from '../Filters';
import BarChart from '../BarChart';
import PieChart from '../PieChart';
import TowersTable from '../TowersTable';
import Title from '../Title';
import './Dashboard.scss';

const Dashboard = () => {
  const towers = TOWERS;

  const [searchValue, setSearchValue] = useState('');
  const [cityFilter, setCityFilter] = useState<'all' | CellTower['city']>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | CellTower['status']>('all');

  const filteredTowers = useMemo(() => {
    const searchQuery = searchValue.trim().toLowerCase();
    const selectedCity = cityFilter.toLowerCase();
    const selectedStatus = statusFilter.toLowerCase();

    return towers.filter(({ name, city, status }) => {
      const towerName = name.toLowerCase();
      const towerCity = city.toLowerCase();
      const towerStatus = status.toLowerCase();

      const matchesName = !searchQuery || towerName.includes(searchQuery);
      const matchesCity = selectedCity === 'all' || towerCity === selectedCity;
      const matchesStatus = selectedStatus === 'all' || towerStatus === selectedStatus;

      return matchesName && matchesCity && matchesStatus;
    });
  }, [cityFilter, searchValue, statusFilter, towers]);

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
        status={statusFilter}
        onStatusFilter={setStatusFilter}
        towers={towers}
      />

      <TowersTable towers={filteredTowers} />

      <div className="charts">
        <div className="chart-card">
          <BarChart towers={towers} />
        </div>
        <div className="chart-card">
          <PieChart towers={towers} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
