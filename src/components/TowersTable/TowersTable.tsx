import { TOWERS } from '../../mocks/towerData';
import './TowersTable.scss';

const TowersTable = () => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>City</th>
            <th>Network</th>
            <th>Status</th>
            <th>Signal</th>
          </tr>
        </thead>
        <tbody>
          {TOWERS.map(t => (
            <tr key={t.id}>
              <td>{t.name}</td>
              <td>{t.city}</td>
              <td>{t.networkType}</td>
              <td className={t.status === 'active' ? 'status-active' : 'status-offline'}>
                {t.status}
              </td>
              <td>
                <div className="signal">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={`bar ${i < t.signalStrength ? 'active' : ''}`}
                      style={{ height: `${6 + i * 4}px` }}
                    />
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TowersTable;
