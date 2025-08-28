import React, { useEffect, useRef, useCallback } from 'react';
import * as d3 from 'd3';
import type { CellTower } from '../../types/tower';
import './PieChart.scss';

type Props = { towers: CellTower[] };
type PieData = { status: string; value: number };

const PieChart: React.FC<Props> = ({ towers }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const drawChart = useCallback(() => {
    const container = containerRef.current;
    if (!towers.length || !container) {
      const svg = d3.select(svgRef.current);
      svg.selectAll('*').remove();
      return;
    }

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = container.clientWidth;
    const height = container.clientHeight;
    const margin = 40;
    const radius = Math.min(width, height) / 2 - margin;

    const counts = d3.rollups(
      towers,
      v => v.length,
      d => d.status
    );
    const map = new Map(counts);
    const dataset: PieData[] = [
      { status: 'active', value: map.get('active') ?? 0 },
      { status: 'offline', value: map.get('offline') ?? 0 },
    ].filter(d => d.value > 0); // Don't show slices with 0 value

    if (dataset.length === 0) return;

    const total = d3.sum(dataset, d => d.value);

    const g = svg.append('g').attr('transform', `translate(${width / 2}, ${height / 2})`);

    const color = d3
      .scaleOrdinal<string>()
      .domain(dataset.map(d => d.status))
      .range(['#16a34a', '#ef4444', '#f59e0b']); // Added a potential third color

    const pie = d3
      .pie<PieData>()
      .sort(null) // Do not sort, keep order from dataset
      .value(d => d.value);

    const path = d3
      .arc<d3.PieArcDatum<PieData>>()
      .outerRadius(radius)
      .innerRadius(radius * 0.5); // Make it a donut chart

    const arcs = g.selectAll('.arc').data(pie(dataset)).enter().append('g').attr('class', 'arc');

    arcs
      .append('path')
      .attr('d', path)
      .attr('fill', d => color(d.data.status) as string)
      .attr('stroke', '#1e293b') // A dark background color for stroke
      .style('stroke-width', '2px');

    arcs
      .append('text')
      .attr('transform', d => `translate(${path.centroid(d)})`)
      .attr('dy', '0.35em')
      .style('text-anchor', 'middle')
      .style('fill', '#fff')
      .style('font-weight', 'bold')
      .style('font-size', `${Math.max(12, width / 30)}px`) // scale with width
      .text(d => {
        const percentage = (d.data.value / total) * 100;
        // Only show label if the slice is large enough to avoid clutter
        return percentage > 5 ? `${percentage.toFixed(1)}%` : '';
      });

    // Add a title
    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', margin / 2 + 10)
      .attr('text-anchor', 'middle')
      .style('font-size', '18px')
      .style('fill', '#f8fafc')
      .style('font-weight', 'bold')
      .style('font-size', `${Math.max(12, width / 25)}px`) // scale with width
      .text('Tower Status Distribution');

    // Add a legend
    const legendData = color.domain();

    // Scale legend item width dynamically based on chart width
    const legendItemWidth = Math.max(60, width / (legendData.length * 2));
    const legendWidth = legendData.length * legendItemWidth;
    const legendStartX = (width - legendWidth) / 2;

    const legendFontSize = Math.max(10, width / 30); // responsive font size
    const rectSize = Math.max(10, width / 30); // responsive rect size

    const legend = svg
      .append('g')
      .attr('class', 'legend')
      .attr('transform', `translate(0, ${height - margin / 2})`);

    const legendItems = legend
      .selectAll('.legend-item')
      .data(legendData)
      .enter()
      .append('g')
      .attr('class', 'legend-item')
      .attr('transform', (_, i) => `translate(${legendStartX + i * legendItemWidth}, 0)`);

    // Color box
    legendItems
      .append('rect')
      .attr('width', rectSize)
      .attr('height', rectSize)
      .attr('rx', 3)
      .attr('fill', color);

    // Text label
    legendItems
      .append('text')
      .attr('x', rectSize + 5)
      .attr('y', rectSize - 2)
      .style('fill', '#f8fafc')
      .style('text-transform', 'capitalize')
      .style('font-size', `${legendFontSize}px`)
      .text(d => d);
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
  }, [towers, drawChart]);

  return (
    <div ref={containerRef} className="pie-chart-container">
      <svg ref={svgRef} aria-label="Pie chart showing the distribution of tower statuses" />
    </div>
  );
};

export default PieChart;
