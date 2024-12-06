'use client';
import React from 'react';
import {
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';

const FastestRadarChart = ({ data }) => {
  const processedData = data.map((item) => {
    const timeToSeconds = (timeStr) => {
      if (!timeStr || timeStr === '0') return 0;
      const [minutes, seconds] = timeStr.split(':').map(parseFloat);
      return (minutes || 0) * 60 + (seconds || 0);
    };

    return {
      ...item,
      driver: item.driver.split('|')[0].trim(), // Only show driver name
      fastestLapTime: timeToSeconds(item.fastestLapTime),
      fastestLapAvgSpeed: parseFloat(item.fastestLapAvgSpeed) || 0,
    };
  });

  return (
    <ChartContainer
      config={{
        fastestLapTime: {
          label: 'Fastest Lap Time',
          color: 'hsl(var(--chart-2))',
        },
        fastestLapAvgSpeed: {
          label: 'Average Speed',
          color: 'hsl(var(--chart-3))',
        },
      }}
      className='mx-auto aspect-square w-full max-w-3xl bg-card text-card-foreground rounded-lg p-6 shadow-md'
    >
      <RadarChart
        data={processedData}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
        className='w-full h-full'
      >
        <PolarGrid stroke='hsl(var(--muted-foreground))' strokeOpacity={0.4} />
        <PolarAngleAxis
          dataKey='driver'
          tick={{
            fill: 'hsl(var(--foreground))',
            fontSize: 12,
          }}
          strokeOpacity={0.4}
        />
        <Radar
          name='Fastest Lap Time'
          dataKey='fastestLapTime'
          stroke='hsl(var(--chart-2))'
          fill='hsl(var(--chart-2))'
          fillOpacity={0.3}
        />
        <Radar
          name='Average Speed'
          dataKey='fastestLapAvgSpeed'
          stroke='hsl(var(--chart-3))'
          fill='hsl(var(--chart-3))'
          fillOpacity={0.3}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              formatter={(value, name) => {
                if (name === 'Fastest Lap Time') {
                  const minutes = Math.floor(value / 60);
                  const seconds = (value % 60).toFixed(3);
                  return `${minutes}:${seconds.padStart(6, '0')}`;
                }
                return `${value.toFixed(3)} km/h`;
              }}
            />
          }
        />
        <ChartLegend />
      </RadarChart>
    </ChartContainer>
  );
};

export default FastestRadarChart;
