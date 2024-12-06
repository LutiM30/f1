'use client';
import { useEffect, useState } from 'react';

import PointsBarChart from './PointsBarChart.jsx';
import YearSelect from './YearSelect.jsx';
import DriversSelect from './DriversSelect.jsx';
import ConstructorsSelect from './ConstructorsSelect.jsx';
import FastestRadarChart from './ui/FastestRadarChart.jsx';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion.jsx';
import { Separator } from './ui/separator.jsx';
import useGetResults from '@/app/hooks/useGetResults.js';
import WorldMap from './ui/world-map.jsx';
import Loading from './ui/Loading.jsx';

const chartConfig = {
  points: { label: 'Points' },
  fastestLap: { label: 'Fastest Lap' },
};

const fastestChartConfig = {
  labels: ['Fastest Lap Time', 'Average Speed'],
};

const start = {
  lat: 43.4794047,
  lng: -80.5205838,
  label: 'Conestoga College Waterloo Campus',
};

const Results = () => {
  const { yearResultData, loading, error } = useGetResults();
  const [chartData, setChartData] = useState([]);
  const [activeChart, setActiveChart] = useState(Object.keys(chartConfig)[0]);
  const [dots, setDots] = useState([]);

  useEffect(() => {
    if (
      yearResultData &&
      Array.isArray(yearResultData) &&
      yearResultData.length > 0
    ) {
      const newDots = [];
      const addNewDot = (lat, lng, label) =>
        newDots.push({ start, end: { lat, lng, label } });
      const barchartData = yearResultData
        .map((result) => {
          if (result && result.Results && Array.isArray(result.Results)) {
            const results = result.Results.map((res) => ({
              driver:
                res.Driver && res.Constructor
                  ? `${res.Driver.givenName || ''} ${
                      res.Driver.familyName || ''
                    } | ${res.Constructor.name || ''}`
                  : 'Unknown',
              points: parseInt(res.points || '0', 10),
              fastestLapTime:
                res.FastestLap && res.FastestLap.Time
                  ? res.FastestLap.Time.time
                  : '0',
              fastestLapAvgSpeed:
                res.FastestLap && res.FastestLap.AverageSpeed
                  ? parseFloat(res.FastestLap.AverageSpeed.speed)
                  : 0,
              fastestLapAvgSpeedUnits:
                res.FastestLap && res.FastestLap.AverageSpeed
                  ? res.FastestLap.AverageSpeed.units
                  : 'kmph',
            }));

            addNewDot(
              Number(result.Circuit.Location.lat),
              Number(result.Circuit.Location.long),
              result.Circuit.circuitName
            );
            return {
              results,
              raceName: result.raceName || 'Unknown Race',
              date: result.date || new Date().toISOString(),
            };
          }
          return null;
        })
        .filter(Boolean); // Remove any null entries
      setDots(newDots);
      setChartData(barchartData);
    } else {
      setChartData([]);
    }
  }, [yearResultData]);

  if (loading)
    return (
      <div className='flex items-center justify-center '>
        <Loading />
      </div>
    );
  if (error)
    return (
      <p className='text-center text-destructive'>
        Error loading drivers. Please try again later.
      </p>
    );
  console.log({ dots });

  return (
    <div className='flex flex-col items-center bg-background text-foreground p-4 rounded-lg space-y-4'>
      <div className='flex flex-wrap gap-2 items-center justify-center w-full'>
        <YearSelect />
        <DriversSelect />
        <ConstructorsSelect />
      </div>
      <Separator className='w-full' />
      <WorldMap dots={dots} />
      <Separator className='w-full' />
      {chartData.length > 0 ? (
        <Accordion type='single' collapsible className='w-full'>
          {chartData.map((result, index) => (
            <AccordionItem value={result.raceName} key={result.raceName}>
              <AccordionTrigger className='text-lg font-semibold'>
                {result.raceName}
                <Separator className='mx-3' orientation='vertical' />
                {new Date(result.date).toDateString()}
              </AccordionTrigger>
              <AccordionContent>
                <div className='flex flex-wrap gap-2 items-center justify-center mb-4'>
                  {Object.keys(chartConfig).map((key) => (
                    <button
                      key={key}
                      onClick={() => setActiveChart(key)}
                      className={`px-4 py-2 rounded-md transition-colors ${
                        activeChart === key
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                      }`}
                    >
                      {chartConfig[key].label}
                    </button>
                  ))}
                </div>
                <div className='rounded-md'>
                  {result.results && result.results.length > 0 ? (
                    activeChart === Object.keys(chartConfig)[0] ? (
                      <PointsBarChart
                        data={result.results}
                        chartConfig={chartConfig}
                      />
                    ) : (
                      <FastestRadarChart
                        config={fastestChartConfig}
                        data={result.results}
                      />
                    )
                  ) : (
                    <p className='text-center text-muted-foreground'>
                      No data available for this race
                    </p>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <p className='text-center text-muted-foreground'>
          No race data available for the selected criteria
        </p>
      )}
    </div>
  );
};

export default Results;
