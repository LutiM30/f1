import axios from 'axios';
import { NextResponse } from 'next/server';
import { F1_API_URL } from '../../utils/apiHelpers';

// Create a rate limiter utility
const createRateLimiter = (requestsPerSecond = 4, requestsPerHour = 500) => {
  let requestCount = 0;
  let hourlyRequestCount = 0;
  let lastRequestTime = 0;
  let hourStartTime = Date.now();

  return {
    async wait() {
      const now = Date.now();

      if (now - hourStartTime >= 3600000) {
        hourlyRequestCount = 0;
        hourStartTime = now;
      }

      if (hourlyRequestCount >= requestsPerHour) {
        const waitTime = 3600000 - (now - hourStartTime);
        console.warn(
          `Hourly limit reached. Waiting ${waitTime / 1000} seconds.`
        );
        await new Promise((resolve) => setTimeout(resolve, waitTime));
      }

      if (now - lastRequestTime < 1000 / requestsPerSecond) {
        const waitTime = 1000 / requestsPerSecond - (now - lastRequestTime);
        await new Promise((resolve) => setTimeout(resolve, waitTime));
      }

      requestCount++;
      hourlyRequestCount++;
      lastRequestTime = Date.now();
    },
  };
};

const rateLimiter = createRateLimiter(4, 500);

export async function GET(request) {
  try {
    await rateLimiter.wait();

    const { searchParams } = new URL(request.url);
    const year = searchParams.get('year');
    const driverId = searchParams.get('driverId');
    const constructorId = searchParams.get('constructorId');

    if (!year) {
      return NextResponse.json(
        {
          status: 400,
          error: 'Year is required',
        },
        { status: 400 }
      );
    }

    try {
      let driverStandings = null;
      let constructorStandings = null;

      const yearResponse = await axios.get(`${F1_API_URL}${year}/results.json`);
      const driversResponse = await axios.get(
        `${F1_API_URL}${year}/drivers.json`
      );
      const constructorsResponse = await axios.get(
        `${F1_API_URL}${year}/constructors.json`
      );

      if (driverId) {
        driverStandings = await axios.get(
          `${F1_API_URL}${year}/drivers/${driverId}/driverstandings.json`
        );
      }

      if (constructorId) {
        constructorStandings = await axios.get(
          `${F1_API_URL}${year}/constructors/${constructorId}/constructorstandings.json`
        );
      }

      const combinedData = {
        driverStandings: driverStandings?.data,
        constructorStandings: constructorStandings?.data,

        yearResult: yearResponse.data.MRData.RaceTable,
        driversList: driversResponse.data.MRData.DriverTable,
        constructorsList: constructorsResponse.data.MRData.ConstructorTable,
      };

      return NextResponse.json({
        status: 200,
        data: combinedData,
      });
    } catch (error) {
      console.warn(`Error fetching data for year ${year}:`, error);
      return null;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        return NextResponse.json(
          {
            status: 200,
            data: [],
            message: 'No drivers found, but application can continue.',
          },
          { status: 200 }
        );
      }

      return NextResponse.json(
        {
          status: error.response?.status || 500,
          error: 'API request failed',
          message: error.message,
        },
        { status: error.response?.status || 500 }
      );
    }

    console.error('Unexpected error:', error);
    return NextResponse.json(
      {
        status: 500,
        error: 'Unexpected error occurred',
        message: String(error),
      },
      { status: 500 }
    );
  }
}

export async function POST() {
  return NextResponse.json(
    {
      status: 405,
      message: 'Method Not Allowed',
    },
    { status: 405 }
  );
}
