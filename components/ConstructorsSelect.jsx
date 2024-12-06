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
import { constructorAtom, constructorsListAtom } from '@/app/utils/atoms';
import { useAtom, useAtomValue } from 'jotai';
import { cn } from '@/lib/utils';

const ConstructorsSelect = (props) => {
  const [selected, setSelected] = useAtom(constructorAtom);
  const [open, setOpen] = useState(false);
  const listRef = React.useRef(null);
  const data = useAtomValue(constructorsListAtom);

  const eleid = 'constructorId';

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
              ? data.find((ele) => ele[eleid] === selected).name
              : 'Select Constructor'}
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
                  const name = ele.name;

                  return (
                    <CommandItem
                      key={`${id}_${name}`}
                      value={id}
                      onSelect={(currentValue) => {
                        setSelected(
                          currentValue === selected ? null : currentValue
                        );
                        setOpen(false);
                      }}
                    >
                      {name}
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

export default ConstructorsSelect;
