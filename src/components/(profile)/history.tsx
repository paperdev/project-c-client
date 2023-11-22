'use client';

import React from 'react';
import { Divider } from '@nextui-org/react';
import { iHistory } from '@/shared/interface/history';

export default function ComponentHistory({
  dataHistory
}: {
  dataHistory: iHistory[]
}) {
  return (
    <>
      <div className='paper-profile-layout'>
        <div className='paper-profile-layout-title'>
          History
        </div>
        <div>
          {
            dataHistory.map((history, index) => {
              return (
                <div key={index} className='mx-auto'>
                  {
                    (index !== 0) && <hr className='h-px bg-base-300 border-0'></hr>
                  }
                  <div className='ml-2 flex-shrink-0 flex flex-col'>
                    <div className='font-semibold text-primary-300'>{history.companyName}</div>
                    <div className='mt-1 ml-2 text-warning-500 text-sm'>{`${history.beginYear}-${history.beginMonth}`} ~ {`${history.endYear}-${history.endMonth}`}</div>
                  </div>
                  <div className='paper-profile-layout-contents'>
                    {
                      history.description.map((description, index) => {
                        return (
                          <div key={index}>
                            • {description}<br />
                          </div>
                        )
                      })
                    }
                  </div>

                  <Divider className="my-4" />
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  )
}