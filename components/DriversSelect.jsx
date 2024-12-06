'use client';

import React, { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { driverAtom, driversListAtom } from '@/app/utils/atoms';
import { useAtom, useAtomValue } from 'jotai';

const DriversSelect = (props) => {
  const [selected, setSelected] = useAtom(driverAtom);
  const [open, setOpen] = useState(false);

  const listRef = React.useRef(null);
  const data = useAtomValue(driversListAtom);

  const eleid = 'driverId';
  const selectedFullInfo = data.find((ele) => ele[eleid] === selected);
  return (
    <div className='flex justify-center items-center my-4'>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            role='combobox'
            aria-expanded={open}
            className='w-fit justify-between'
            onClick={() => setOpen(true)}
          >
            {selected
              ? selectedFullInfo.givenName + ' ' + selectedFullInfo.familyName
              : 'Select Driver'}
            <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-fit p-0'>
          <Command>
            <CommandInput placeholder='Search drivers...' />
            <CommandList>
              <CommandEmpty>No drivers found.</CommandEmpty>
              <CommandGroup ref={listRef}>
                {data.map((ele, index) => {
                  const id = ele[eleid];

                  const driverName = ele.givenName + ' ' + ele.familyName;
                  const driverHeadshot = ele.headshot_url;

                  return (
                    <CommandItem
                      key={`${id}_${driverName}`}
                      value={id}
                      onSelect={(currentValue) => {
                        setSelected(
                          currentValue === selected ? null : currentValue
                        );
                        setOpen(false);
                      }}
                    >
                      <Avatar>
                        <AvatarImage src={driverHeadshot} alt='@shadcn' />
                        <AvatarFallback>{ele.code}</AvatarFallback>
                      </Avatar>
                      {driverName}
                      <Check
                        className={cn(
                          'ml-auto',
                          selected === id ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DriversSelect;
