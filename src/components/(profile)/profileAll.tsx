'use client';

import React from 'react';
import { Divider } from '@nextui-org/react';
import ComponentProfile from '@/components/(profile)/profile';
import ComponentTag from '@/components/(profile)/tag';
import ComponentSummary from '@/components/(profile)/summary';
import ComponentHistory from '@/components/(profile)/history';
import { iProfileAll } from '@/shared/interface/profile';

export default async function ComponentProfileAll({
  dataProfileAll
}: {
  dataProfileAll: iProfileAll
}) {
  return (
    <>
      <ComponentProfile dataProfile={dataProfileAll.profile} />
      <Divider className="my-2" />
      <ComponentTag dataTags={dataProfileAll.tags} />
      <Divider className="my-2" />
      <ComponentSummary dataSummary={dataProfileAll.summary} />
      <Divider className="my-2" />
      <ComponentHistory dataHistory={dataProfileAll.history} />
    </>
  )
}
