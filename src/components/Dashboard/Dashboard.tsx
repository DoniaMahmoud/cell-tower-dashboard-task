import { TOWERS } from '../../mocks/towerData';
import TowersTable from '../TowersTable/TowersTable';
import SummaryCard from '../SummaryCards/SummaryCard';
import Title from '../Title/Title';
import './Dashboard.scss';

const Dashboard = () => {
  const towers = TOWERS;

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
      <TowersTable />
    </div>
  );
};

export default Dashboard;
