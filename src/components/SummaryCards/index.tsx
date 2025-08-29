import './SummaryCard.scss';

type Props = {
  title: string;
  count: number;
};

const SummaryCard = (props: Props) => {
  const { title, count } = props;
  return (
    <div className="summary-card">
      <div className="summary-card-title">{title}</div>
      <div className="summary-card-count">{count}</div>
    </div>
  );
};

export default SummaryCard;
