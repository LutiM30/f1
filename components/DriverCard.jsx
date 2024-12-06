import Image from 'next/image';
import { CardBody, CardContainer, CardItem } from './ui/3d-card';
import Link from 'next/link';
import { cn, unsupportedFlags } from '@/lib/utils';
import ReactCountryFlag from 'react-country-flag';

export default function DriverCard({ driver }) {
  return (
    <CardContainer className='inter-var'>
      <CardBody className='bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-fit sm:w-[20rem] h-1/2 rounded-xl p-6 border  '>
        <CardItem translateZ='100' className='w-fit mt-3 mx-auto'>
          <Image
            src={driver.headshot_url}
            height='800'
            width='800'
            className='h-30 w-full object-cover rounded-xl group-hover/card:shadow-xl'
            alt='thumbnail'
          />
        </CardItem>
        <CardItem
          translateZ='50'
          className='text-xl font-bold text-neutral-600 dark:text-white'
        >
          <p className='text-foreground'>
            {driver.permanentNumber || driver.driver_number}
          </p>{' '}
          {driver.first_name || driver.givenName}{' '}
          {driver.last_name || driver.familyName}{' '}
          <ReactCountryFlag
            countryCode={driver.nationality}
            style={{ fontSize: '1em' }}
          />
        </CardItem>
        <CardItem
          as='p'
          translateZ='60'
          className={cn(
            'text-sm max-w-xs mt-1 dark:text-neutral-300',
            `text-[#${driver.team_colour}]`
          )}
        >
          {driver.team_name}
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}
