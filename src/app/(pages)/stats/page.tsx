import React from 'react';
import ComponentStats from '@/components/(stats)/stats';
import { iHistory } from '@/shared/interface/history';

async function getHistory() {
  const res = await fetch(
    process.env.PROFILE_URL_HISTORY,
    {
      headers: {
        'Content-type': 'application/json;',
      },
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Page() {
  let dataHistory = await getHistory();
  
  if ('github' === process.env.SERVER_TYPE) {
    dataHistory = dataHistory.history;
  }

  const sortedData: any = [];
  const monthPerYear = 12;
  dataHistory.map((history: iHistory) => {
    let totalMonth =
      history.endYear - history.beginYear > 0
        ? (history.endYear - history.beginYear) * monthPerYear
        : 0;
    totalMonth +=
      history.endMonth - history.beginMonth >= 0
        ? history.endMonth - history.beginMonth
        : -(history.beginMonth - history.endMonth);
    sortedData.push({
      value: totalMonth,
      name: history.companyName,
      period: `${history.beginYear}-${history.beginMonth} ~ ${history.endYear}-${history.endMonth}`,
    });
  });
  sortedData.sort((a: any, b: any) => b.value - a.value);

  return (
    <>
      <ComponentStats sortedData={sortedData} />
    </>
  );
}
