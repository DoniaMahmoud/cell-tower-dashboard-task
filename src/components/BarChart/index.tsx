import { useCallback, useEffect, useRef } from 'react';
import { select, axisBottom, axisLeft, format, max, rollups, scaleBand, scaleLinear } from 'd3';
import type { CellTower } from '../../types/tower';
import './BarChart.scss';

type Props = { towers: CellTower[] };

type BarData = {
  city: string;
  count: number;
};

const MARGINS = { top: 70, right: 30, bottom: 50, left: 60 };
const BAR_COLOR = '#4a90e2';

const BarChart = (props: Props) => {
  const { towers } = props;
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const drawChart = useCallback(() => {
    const container = containerRef.current;

    if (!towers.length || !container) {
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

    if (!svgRef.current) return;

    // --- D3 setup ---
    const svg = select(svgRef.current);
    svg.selectAll('*').remove(); // clear old chart before re-rendering

    // Get container width & height for responsiveness
    const width = container.clientWidth;
    const height = container.clientHeight;

    svg.attr('viewBox', `0 0 ${width} ${height}`).attr('preserveAspectRatio', 'xMidYMid meet');

    // Inner drawing area
    const innerWidth = width - MARGINS.left - MARGINS.right;
    const innerHeight = height - MARGINS.top - MARGINS.bottom;

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
    const chart = svg.append('g').attr('transform', `translate(${MARGINS.left},${MARGINS.top})`);

    // Draw bars
    chart
      .selectAll('rect')
      .data(data)
      .join('rect')
      .attr('x', d => x(d.city)!)
      .attr('y', d => y(d.count))
      .attr('width', x.bandwidth())
      .attr('height', d => innerHeight - y(d.count))
      .attr('fill', BAR_COLOR);

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

    // Remove any existing tooltip
    select(container).selectAll('.tooltip').remove();

    // Add labels on hover each bar
    const tooltip = select(container)
      .append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('visibility', 'hidden')
      .style('background', '#1e293b')
      .style('color', '#fff')
      .style('padding', '5px 8px')
      .style('border-radius', '4px');

    chart
      .selectAll<SVGRectElement, BarData>('rect')
      .on('mouseover', (_, d) => {
        tooltip.style('visibility', 'visible').text(`${d.city}: ${d.count}`);
      })
      .on('mousemove', event => {
        tooltip.style('top', event.pageY - 28 + 'px').style('left', event.pageX + 'px');
      })
      .on('mouseout', () => {
        tooltip.style('visibility', 'hidden');
      });

    // Add chart title
    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', MARGINS.top / 2)
      .attr('text-anchor', 'middle')
      .style('fill', '#f8fafc')
      .style('font-weight', 'bold')
      .style('font-size', `${Math.max(12, width / 25)}px`) // scale with width
      .text('Towers Count by City');
  }, [towers]);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      drawChart();
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [drawChart]);

  useEffect(() => {
    drawChart();
  }, [drawChart]);

  return (
    <div
      ref={containerRef}
      className="bar-chart-container"
      style={{ width: '100%', height: '100%' }}
    >
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        role="img"
        aria-label="Bar chart showing towers count by city"
      />
    </div>
  );
};

export default BarChart;
