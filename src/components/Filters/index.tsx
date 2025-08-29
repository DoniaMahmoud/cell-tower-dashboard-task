import type { CellTower } from '../../types/tower';
import './Filters.scss';

type Props = {
  towers: CellTower[];
  searchValue: string;
  onSearch: (v: string) => void;
  city: 'all' | CellTower['city'];
  onCityFilter: (v: 'all' | CellTower['city']) => void;
  status: 'all' | CellTower['status'];
  onStatusFilter: (v: 'all' | CellTower['status']) => void;
};

const Filters = (props: Props) => {
  const { towers, onSearch, searchValue, city, onCityFilter, status, onStatusFilter } = props;

  // Dynamically generate unique cities and statuses
  const uniqueCities = Array.from(new Set(towers.map(t => t.city))).sort();
  const uniqueStatuses = Array.from(new Set(towers.map(t => t.status))).sort();

  return (
    <div className="filters-container">
      {/* Search Input */}
      <div className="search-input">
        <input
          id="tower-search"
          type="text"
          name="towerSearch"
          value={searchValue}
          placeholder="Search by tower name"
          onChange={e => onSearch(e.target.value)}
        />
        {searchValue && <button onClick={() => onSearch('')}>✕</button>}
      </div>

      {/* City Filter */}
      <select
        id="city-filter"
        name="cityFilter"
        value={city}
        onChange={e => onCityFilter(e.target.value as Props['city'])}
      >
        <option value="all">All Cities</option>
        {uniqueCities.map(c => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      {/* Status Filter */}
      <select
        id="status-filter"
        name="statusFilter"
        value={status}
        onChange={e => onStatusFilter(e.target.value as Props['status'])}
      >
        <option value="all">All Statuses</option>
        {uniqueStatuses.map(s => (
          <option key={s} value={s}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filters;
