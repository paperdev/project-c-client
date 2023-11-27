'use client';

import React from 'react';
import { Navbar, NavbarBrand, NavbarContent, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, User } from '@nextui-org/react';
import { useRouter, usePathname } from 'next/navigation';
import SubHeader from '@/components/subHeader';
import dataProfile from '@/shared/data/json/profile.json';
import { ThemeSwitcher } from './ThemeSwitcher';
import { LuGhost } from 'react-icons/lu';
import Paper from '@mui/material/Paper';

// TODO:
const profileMenuItems = [
  'Profile',
  'Activity',
  'Analytics',
  'Help',
  'Log Out',
];

const URL_PROFILE = '/home';

export default function Header({
  title,
}: {
  title: string
}) {
  const router = useRouter();
  const currentUrl = usePathname();
  const currentMenuName = currentUrl.charAt(1).toLocaleUpperCase() + currentUrl.slice(2);

  const onClickProfile = () => {
    router.push(URL_PROFILE);
  }

  const onClickProfileMenu = (event: React.MouseEvent) => {
    if (!event || !event.currentTarget) {
      return;
    }
    if ('help' === event.currentTarget.innerHTML.toLocaleLowerCase()) {
      router.push('youtube');
    }
  }

  return (
    <>
    <Paper elevation={2}>
      <Navbar>
        <NavbarBrand className='gap-2'>
          <LuGhost className='paper-icon-width paper-icon-height text-secondary-500' />
        </NavbarBrand>

        <NavbarContent className='gap-4 sm:flex' justify='center'>
          <div className='font-bold text-secondary-500'>{currentMenuName}</div>
        </NavbarContent>

        <NavbarContent as='div' justify='end'>
          <ThemeSwitcher />
          <Dropdown placement='bottom-end'>
            <DropdownTrigger>
              <Avatar
                isBordered
                as='button'
                className='transition-transform'
                color='secondary'
                size='sm'
                src={dataProfile.profile.avatar}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label='Profile' variant='flat'>
              {profileMenuItems.map((item, index) => (
                <DropdownItem key={`${item}-${index}`} textValue={item}>
                  {
                    0 === index
                      ?
                      <>
                        <User
                          name={dataProfile.profile.name}
                          description={dataProfile.profile.email}
                          avatarProps={{
                            src: dataProfile.profile.avatar,
                            size: 'sm',
                          }}
                          onClick={onClickProfile}
                        />
                      </>
                      :
                      <>
                        <div onClick={(event: React.MouseEvent) => { onClickProfileMenu(event); }} className={index === profileMenuItems.length - 1 ? 'text-danger-500' : 'text-foreground-500'}>{item}</div>
                      </>
                  }
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>

      </Navbar>
      </Paper>
    </>
  );
}