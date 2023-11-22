'use client';

import React, { useState } from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, User, Link } from '@nextui-org/react';
import { usePathname, useRouter } from 'next/navigation';
import SubHeader from '@/components/subHeader';
import dataProfile from '@/shared/data/json/profile.json';
import { ThemeSwitcher } from './ThemeSwitcher';

// TODO:
const pageMenuItems = [
  'Home',
  'Chat',
  'Post',
  'Stats',
];

// TODO:
const profileMenuItems = [
  'Profile',
  'Activity',
  'Analytics',
  'Help',
  'Log Out',
];

const URL_PROFILE = '/home';

function PageMenu({
  pageMenuItems,
}: {
  pageMenuItems: string[],
}) {
  const currentUrl = usePathname();
  const currentMenuName = currentUrl.charAt(1).toLocaleUpperCase() + currentUrl.slice(2);

  return (
    <>
      {pageMenuItems.map((item: string, index: number) => (
        <NavbarMenuItem key={`${item}-${index}`}>
          <Link
            underline={currentMenuName === item ? 'always' : 'none'}
            color={currentMenuName === item ? 'secondary' : 'foreground'}
            className={`w-full ${currentMenuName === item ? 'font-bold' : ''}`}
            href={item.toLocaleLowerCase()}
            size='lg'
          >
            {item}
          </Link>
        </NavbarMenuItem>
      ))}
    </>
  )
}

export default function Header({
  title,
}: {
  title: string
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const onClickProfile = () => {
    router.push(URL_PROFILE);
  }

  return (
    <>
      <Navbar onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className='sm:hidden'
          />
          <NavbarBrand>
            <div className='font-bold text-inherit'>{title}</div>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className='hidden sm:flex gap-4' justify='center'>
          <PageMenu pageMenuItems={pageMenuItems} />
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
                        <div className={index === profileMenuItems.length - 1 ? 'text-danger-500' : 'text-foreground-500'}>{item}</div>
                      </>
                  }
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>

        <NavbarMenu>
          <PageMenu pageMenuItems={pageMenuItems} />
        </NavbarMenu>
      </Navbar>
    </>
  );
}