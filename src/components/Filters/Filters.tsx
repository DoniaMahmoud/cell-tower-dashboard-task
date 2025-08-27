import type { CellTower } from '../../types/tower';
import './Filters.scss';

type Props = {
  searchValue: string;
  onSearch: (v: string) => void;
  city: 'All' | CellTower['city'];
  onCityFilter: (v: 'All' | CellTower['city']) => void;
};

const Filters = (props: Props) => {
  const { onSearch, searchValue, city, onCityFilter } = props;

  return (
    <div className="filters-container">
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

      <select
        id="city-filter"
        name="cityFilter"
        value={city}
        onChange={e => onCityFilter(e.target.value as Props['city'])}
      >
        <option value="All">All Cities</option>
        <option value="Cairo">Cairo</option>
        <option value="Alexandria">Alexandria</option>
        <option value="Hurghada">Hurghada</option>
        <option value="Luxor">Luxor</option>
      </select>
    </div>
  );
};

export default Filters;
