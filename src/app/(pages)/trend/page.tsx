import { redirect, RedirectType } from 'next/navigation';

export default async function Page() {
  
  redirect(process.env.TRENDS_URL, RedirectType.push);

  return (
    <div className='flex flex-col gap-1 pt-0.5 min-h-screen'>
      <div className="m-auto font-bold text-2xl">
        Redirecting...
      </div>
    </div>
  )
}
