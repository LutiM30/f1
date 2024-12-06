'use client';
import React from 'react';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { Bar, BarChart, XAxis, YAxis } from 'recharts';

const PointsBarChart = ({ data, chartConfig }) => {
  return (
    <ChartContainer
      config={chartConfig}
      className='h-[750px] w-full max-w-3xl bg-card text-card-foreground rounded-lg  p-4'
    >
      <BarChart
        data={data}
        layout='vertical'
        margin={{
          left: 20,
          right: 20,
          top: 20,
          bottom: 20,
        }}
      >
        <XAxis type='number' stroke='hsl(var(--muted-foreground))' />
        <YAxis
          dataKey='driver'
          type='category'
          tickLine={false}
          axisLine={false}
          width={200}
          stroke='hsl(var(--muted-foreground))'
        />
        <ChartTooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className='bg-white p-2 border border-gray-300 rounded shadow'>
                  <p>{payload[0].payload.driver}</p>
                  <p>Points: {payload[0].value}</p>
                </div>
              );
            }
            return null;
          }}
        />
        <Bar
          dataKey='points'
          fill='hsl(var(--chart-1))'
          radius={[0, 5, 5, 0]}
        />
      </BarChart>
    </ChartContainer>
  );
};

export default PointsBarChart;
