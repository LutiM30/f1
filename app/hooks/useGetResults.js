import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAtomValue, useSetAtom } from 'jotai';
import {
  constructorAtom,
  constructorsListAtom,
  constructorStandingsAtom,
  driverAtom,
  driversListAtom,
  driverStandingsAtom,
  yearAtom,
} from '../utils/atoms';
import queryString from 'query-string';

const useGetResults = () => {
  const year = useAtomValue(yearAtom);
  const constructorId = useAtomValue(constructorAtom);
  const driverId = useAtomValue(driverAtom);

  const setDriverStandings = useSetAtom(driverStandingsAtom);
  const setConstructorStandings = useSetAtom(constructorStandingsAtom);

  const setDriversList = useSetAtom(driversListAtom);
  const setConstructorsList = useSetAtom(constructorsListAtom);

  const [yearResultData, setYearResultData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchResult = async () => {
    setLoading(true);
    const queryObj = { year, constructorId, driverId };

    Object.keys(queryObj).forEach((key) =>
      !queryObj[key] ? delete queryObj[key] : ''
    );
    try {
      const response = await axios.get(
        `/api/f1/results?${queryString.stringify(queryObj)}`
      );

      const results = response.data.data;

      if (results.driverStandings && driverId) {
        setDriverStandings(
          results.driverStandings.MRData.StandingsTable.StandingsLists
        );
      }

      if (results.constructorStandings && constructorId) {
        setConstructorStandings(
          results?.constructorStandings?.MRData?.StandingsTable?.StandingsLists
        );
      }

      setYearResultData(results.yearResult.Races);
      setDriversList(results.driversList.Drivers);
      setConstructorsList(results.constructorsList.Constructors);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResult();
  }, [year, constructorId, driverId]);

  return { yearResultData, loading, error };
};

export default useGetResults;
