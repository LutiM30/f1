'use client';

import { useState, useEffect } from 'react';
import { TrendingUp } from 'lucide-react';
import { LabelList, RadialBar, RadialBarChart, PolarAngleAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { cn } from '@/lib/utils';
import { useAtomValue } from 'jotai';
import { driversListAtom } from '@/app/utils/atoms';

const chartConfig = {
  points: {
    label: 'Points',
    color: 'hsl(var(--chart-1))',
  },
  position: {
    label: 'Position',
    color: 'hsl(var(--chart-2))',
  },
  wins: {
    label: 'Wins',
    color: 'hsl(var(--chart-3))',
  },
  pointsFill: {
    label: 'Points in %',
    color: 'hsl(var(--chart-3))',
  },
  positionFill: {
    label: 'Position in %',
    color: 'hsl(var(--chart-3))',
  },
  winsFill: {
    label: 'Wins in %',
    color: 'hsl(var(--chart-3))',
  },
};

const MAX_POINTS = 672;
const MAX_WINS = 22;
const TOTAL_RACES = 22;

export function F1DriverPerformanceChart({ driverData, season }) {
  const [chartData, setChartData] = useState([]);
  const NUM_DRIVERS = useAtomValue(driversListAtom)?.length;

  useEffect(() => {
    if (driverData && driverData.length > 0) {
      const processedData = driverData.map((round, index) => ({
        round: index + 1,
        points: Number(round.points),
        pointsFill: (Number(round.points) / MAX_POINTS) * 100,
        position: Number(round.position),
        positionFill:
          ((NUM_DRIVERS - Number(round.position) + 1) / NUM_DRIVERS) * 100,
        wins: Number(round.wins),
        winsFill: (Number(round.wins) / MAX_WINS) * 100,
      }));

      setChartData(processedData);
    }
  }, [driverData]);

  const latestRound = chartData[chartData.length - 1];
  const driverName =
    driverData[0]?.Driver?.givenName + ' ' + driverData[0]?.Driver?.familyName;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className={cn(
            'grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl'
          )}
        >
          <p className='label'>{"Driver's"} Performance</p>
          <div className='grid gap-1.5'>
            {payload.map((load) => (
              <div
                className={cn(
                  'flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground',
                  'items-center'
                )}
                key={load.dataKey}
              >
                <div
                  className={cn(
                    'shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg] h-2.5 w-2.5'
                  )}
                  style={{
                    '--color-bg': load.color,
                    '--color-border': load.color,
                  }}
                />
                <div
                  className={cn(
                    'flex flex-1 justify-between leading-none',
                    'items-center'
                  )}
                >
                  <div className='grid gap-2.5'>
                    <span className='text-muted-foreground'>
                      {load.name === 'pointsFill'
                        ? 'Points'
                        : load.name === 'positionFill'
                        ? 'Position'
                        : load.name === 'winsFill'
                        ? 'Wins'
                        : 'Label'}
                    </span>
                  </div>
                  {load.value && (
                    <span className='font-mono font-medium tabular-nums text-foreground'>
                      {/* points position wins */}
                      {load.name === 'pointsFill'
                        ? `${load.payload.points} / ${MAX_POINTS}`
                        : load.name === 'positionFill'
                        ? `${load.payload.position} / ${NUM_DRIVERS}`
                        : load.name === 'winsFill'
                        ? `${load.payload.wins} / ${TOTAL_RACES}`
                        : 'Value'}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <Card className='w-full max-w-lg'>
      <CardHeader className='items-center pb-2'>
        <CardTitle>{driverName} Performance</CardTitle>
        <CardDescription>{season} Season</CardDescription>
      </CardHeader>
      <CardContent className='flex justify-center items-center pb-1'>
        <div className='w-full max-w-[400px]'>
          <ChartContainer config={chartConfig} className='h-[400px] w-full'>
            <RadialBarChart
              width={400}
              height={400}
              data={chartData}
              startAngle={180}
              endAngle={0}
              innerRadius='30%'
              outerRadius='80%'
            >
              <PolarAngleAxis
                type='number'
                domain={[0, TOTAL_RACES]}
                angleAxisId={0}
                tick={false}
              />

              <ChartTooltip content={<CustomTooltip />} hideLabel={true} />

              <RadialBar
                dataKey='pointsFill'
                angleAxisId={0}
                fill='var(--color-points)'
                maxBarSize={20}
              />
              <RadialBar
                dataKey='positionFill'
                angleAxisId={0}
                fill='var(--color-position)'
                maxBarSize={20}
              />
              <RadialBar
                dataKey='winsFill'
                angleAxisId={0}
                fill='var(--color-wins)'
                maxBarSize={20}
              />
              <LabelList
                dataKey='round'
                position='outside'
                fill='var(--foreground)'
                fontSize={10}
              />
            </RadialBarChart>
          </ChartContainer>
        </div>
      </CardContent>
      <CardFooter className='flex-col gap-2 text-sm'>
        <div className='flex items-center gap-2 font-medium leading-none'>
          Current Position: {latestRound?.position}
          <TrendingUp className='h-4 w-4' />
        </div>
        <div className='leading-none text-muted-foreground'>
          Total Points: {latestRound?.points} | Wins: {latestRound?.wins}
        </div>
      </CardFooter>
    </Card>
  );
}
