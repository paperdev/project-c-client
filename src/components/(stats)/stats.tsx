'use client';

import React from 'react';
import ComponentChart from '@/components/chart';
import { ECElementEvent } from 'echarts/core';

export default async function ComponentStats({
  sortedData,
}: {
  sortedData: any;
}) {
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => {
        return `${params.data.period}<br/> ${params.name}: ${params.data.value} months (${params.percent}%)<br/>`;
      },
    },
    legend: {
      top: '5%',
      left: 'center',
    },
    series: [
      {
        // name: 'Period',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 25,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: sortedData,
      },
    ],
  };

  const onEvents = {
    click: (params: ECElementEvent) => {},
    legendselectchanged: () => {},
  };

  return (
    <>
      <ComponentChart option={option} events={onEvents} />
    </>
  );
}
