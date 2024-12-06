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
import { useAtomValue } from 'jotai';
import {
  constructorAtom,
  constructorStandingsAtom,
  driverAtom,
  driverStandingsAtom,
} from '@/app/utils/atoms/index.js';
import YearlyResultChart from './YearlyResultChart.jsx';
import { F1DriverPerformanceChart } from './StandingChart.jsx';

const chartConfig = {
  points: { label: 'Points' },
  fastestLap: { label: 'Fastest Lap' },
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

  const driverId = useAtomValue(driverAtom);
  const constructorId = useAtomValue(constructorAtom);

  const driverStandings = useAtomValue(driverStandingsAtom);
  const constructorStandings = useAtomValue(constructorStandingsAtom);

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
      <div className='flex items-center justify-center min-h-screen'>
        <Loading />
      </div>
    );
  if (error)
    return (
      <p className='text-center text-destructive'>
        Error loading drivers. Please try again later.
      </p>
    );

  return (
    <div className='flex flex-col items-center bg-background text-foreground p-4 rounded-lg space-y-4'>
      <WorldMap dots={dots} />

      <Separator className='w-full' />
      <div className='flex flex-wrap gap-2 items-center justify-center w-full'>
        <YearSelect />
        <DriversSelect />
      </div>
      <>
        {driverId && driverStandings && driverStandings?.length > 0 ? (
          <>
            <Separator className='w-full' />
            <div className='flex flex-1 flex-row items-center justify-center'>
              {driverStandings?.map((standing, key) => (
                <F1DriverPerformanceChart
                  key={'driver-' + key}
                  driverData={standing.DriverStandings}
                  round={standing.round}
                  season={standing.season}
                  cardTitle='Driver'
                />
              ))}
            </div>
          </>
        ) : (
          <></>
        )}
      </>
      <>
        {constructorId &&
        constructorStandings &&
        constructorStandings?.length > 0 ? (
          <>
            <Separator className='w-full' />
            <F1DriverPerformanceChart />
          </>
        ) : (
          <></>
        )}
      </>
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
                  <YearlyResultChart
                    activeChart={activeChart}
                    data={result.results}
                  />
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
