'use client';

import React from 'react';
import { Tabs, Tab } from '@nextui-org/react';
import Paper from '@mui/material/Paper';
import { LuHome, LuMessagesSquare, LuBarChartBig } from 'react-icons/lu';
import { usePathname, useRouter } from 'next/navigation';

// TODO:
const pageMenuItems = [
  {
    name: 'Home',
    href: 'home',
    icon: <LuHome />,
  },
  {
    name: 'Chat',
    href: 'chat',
    icon: <LuMessagesSquare />,
  },
  // {
  //   name: 'Post',
  //   href: 'post',
  //   icon: <LuAperture />,
  // },
  {
    name: 'Trend',
    href: 'trend',
    icon: <LuBarChartBig />,
  },
  // {
  //   name: 'Stats',
  //   href: 'stats',
  //   icon: <LuBarChartBig />,
  // }
];

export default function Footer() {
  const router = useRouter();
  const currentUrl = usePathname();
  const currentMenuName = currentUrl.charAt(1).toLocaleUpperCase() + currentUrl.slice(2);

  const onSelectionChange = (key: string) => {
    router.replace(key.toLocaleLowerCase());
  }

  return (
    <>
      <Paper elevation={2}>
        <Tabs
                  selectedKey={currentMenuName}
          color='secondary'
          radius='md'
          variant='light'
          fullWidth={true}
          className='flex justify-center h-16'
          onSelectionChange={onSelectionChange}
        >
          {pageMenuItems.map((item) => (
            <Tab
              key={item.name}
              className='h-14'
              title={
                <div className='flex items-center gap-2 font-bold text-base'>
                  {item.icon}
                  <div>{item.name}</div>
                </div>
              }
            />
          ))}
        </Tabs>
      </Paper>
    </>
  );
}