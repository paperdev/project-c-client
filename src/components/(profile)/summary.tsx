import { iSummary } from '@/shared/interface/summary';

export default function ComponentSummary({
  dataSummary
}: {
  dataSummary: iSummary
}) {
  return (
    <>
      <div className='paper-profile-layout'>
        <div className='paper-profile-layout-title'>
          Summary
        </div>
        <div className='paper-profile-layout-contents'>
          {dataSummary.contents}
        </div>
      </div>
    </>
  )
}
