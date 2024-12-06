import React from 'react';
import PointsBarChart from './PointsBarChart';
import FastestRadarChart from './ui/FastestRadarChart';

const chartConfig = {
  points: { label: 'Points' },
  fastestLap: { label: 'Fastest Lap' },
};

const fastestChartConfig = {
  labels: ['Fastest Lap Time', 'Average Speed'],
};

const YearlyResultChart = ({ activeChart, data }) => {
  return (
    <>
      {data && data.length > 0 ? (
        activeChart === Object.keys(chartConfig)[0] ? (
          <PointsBarChart data={data} chartConfig={chartConfig} />
        ) : (
          <FastestRadarChart config={fastestChartConfig} data={data} />
        )
      ) : (
        <p className='text-center text-muted-foreground'>
          No data available for this race
        </p>
      )}
    </>
  );
};

export default YearlyResultChart;
