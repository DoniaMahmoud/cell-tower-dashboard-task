import { useEffect, useRef } from 'react';
import { select, axisBottom, axisLeft, format, max, rollups, scaleBand, scaleLinear } from 'd3';
import type { CellTower } from '../../types/tower';
import './BarChart.scss';

type Props = { towers: CellTower[] };

const BarChart = (props: Props) => {
  const { towers } = props;
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!towers.length) {
      const svg = select(svgRef.current);
      svg.selectAll('*').remove();
      return;
    }

    // Group towers by city and count how many per city
    const towersByCity = rollups(
      towers,
      v => v.length, // count towers
      d => d.city // group by city
    );

    // Convert to array of objects
    const data = towersByCity.map(([city, count]) => ({
      city,
      count,
    }));

    const drawChart = () => {
      if (!svgRef.current) return;

      // --- D3 setup ---
      const svg = select(svgRef.current);
      svg.selectAll('*').remove(); // clear old chart before re-rendering

      // Get container width & height for responsiveness
      const width = svgRef.current?.clientWidth || 600;
      const height = svgRef.current?.clientHeight || 400;
      const margin = { top: 70, right: 30, bottom: 50, left: 60 };

      svg.attr('viewBox', `0 0 ${width} ${height}`).attr('preserveAspectRatio', 'xMidYMid meet');

      // Inner drawing area
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;

      // Create scales
      const x = scaleBand()
        .domain(data.map(d => d.city)) // cities as categories
        .range([0, innerWidth])
        .padding(0.2);

      const y = scaleLinear()
        .domain([0, max(data, d => d.count)!]) // max tower count
        .nice()
        .range([innerHeight, 0]);

      // Create a group for chart contents
      const chart = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

      // Draw bars
      chart
        .selectAll('rect')
        .data(data)
        .join('rect')
        .attr('x', d => x(d.city)!)
        .attr('y', d => y(d.count))
        .attr('width', x.bandwidth())
        .attr('height', d => innerHeight - y(d.count))
        .attr('fill', '#4a90e2');

      // Add x-axis
      chart
        .append('g')
        .attr('transform', `translate(0, ${innerHeight})`)
        .call(axisBottom(x))
        .selectAll('text')
        .attr('transform', 'rotate(-45)')
        .style('text-anchor', 'end')
        .attr('dx', '-.8em')
        .attr('dy', '.15em');

      // Add y-axis
      chart.append('g').call(axisLeft(y).ticks(5).tickFormat(format('d')));

      // Add labels on top of each bar
      chart
        .selectAll('.label')
        .data(data)
        .enter()
        .append('text')
        .attr('x', d => x(d.city)! + x.bandwidth() / 2)
        .attr('y', d => y(d.count) - 5)
        .attr('text-anchor', 'middle')
        .text(d => d.count)
        .style('fill', '#ffffff');

      // Add chart title
      svg
        .append('text')
        .attr('x', width / 2)
        .attr('y', margin.top / 2)
        .attr('text-anchor', 'middle')
        .style('font-size', '16px')
        .text('Towers Count by City')
        .style('fill', '#ffffff');
    };

    drawChart();

    const handleResize = () => {
      drawChart();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [towers]);

  return (
    <div className="bar-chart-container" style={{ width: '100%', height: '100%' }}>
      <svg ref={svgRef} width="100%" height="100%" />
    </div>
  );
};

export default BarChart;
