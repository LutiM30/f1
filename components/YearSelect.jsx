import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { useAtom } from 'jotai';
import { yearAtom } from '@/app/utils/atoms';

const YearSelect = () => {
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1950 },
    (_, i) => currentYear - i
  );

  const [year, setYear] = useAtom(yearAtom);

  return (
    <Select onValueChange={setYear} defaultValue={year}>
      <SelectTrigger className='w-[180px] data-[placeholder]:text-background'>
        <SelectValue placeholder='Select Year' />
      </SelectTrigger>
      <SelectContent>
        {years.map((year, i) => (
          <SelectItem key={`${i}_${year}`} value={year}>
            {year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default YearSelect;
