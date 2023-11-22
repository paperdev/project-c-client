'use client';

import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import { Switch } from '@nextui-org/react';
import { LuSun, LuMoon } from 'react-icons/lu';

export function ThemeSwitcher(props: any) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isSelected, setIsSelected] = useState(theme === 'dark' ? true : false);

  const onChange = (event: React.ChangeEvent<any>) => {
    event.target.checked ? setTheme('dark') : setTheme('light');
  }

  useEffect(() => {
    setMounted(true);
  }, [])

  if (!mounted) return null;

  return (
    <Switch
      isSelected={isSelected}
      onValueChange={setIsSelected}
      onChange={(event: React.ChangeEvent<any>) => { onChange(event); }}
      size="md"
      color="primary"
      startContent={<LuSun />}
      endContent={<LuMoon />}
    >
    </Switch>
  )
};