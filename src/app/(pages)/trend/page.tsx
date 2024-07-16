import { redirect, RedirectType } from 'next/navigation';
import { Image, Link } from '@nextui-org/react';

export default async function Page() {
  // redirect(process.env.TRENDS_URL, RedirectType.push);

  let linkStyle = {
    display: 'inline-block',
    overflow: 'hidden',
    borderRadius: '13px',
    width: '250px',
    height: '83px',
  }

  let imageStyle = {
    borderRadius: '13px',
    width: '250px',
    height: '83px',
  }

  return (
    <div className='flex flex-col gap-1 pt-0.5 h-screen bg-gradient-to-r from-cyan-500 to-blue-500'>
      <div className='mx-auto font-bold text-4xl text-white overscroll-none'>

        <div className='mt-4 flex justify-center '>
          New launch alert.
        </div>
        <div className='mt-4 flex justify-center'>
          Ready. Set. Get.
        </div>

        <div className='mt-4 flex justify-center'>
          <Image src='https://tools-qr-production.s3.amazonaws.com/output/apple-toolbox/b6983c42212db1a9c98d046d287fbab2/5306846f9d950733d6f8fec4d48df63c.png' />
        </div>
        
        <div className='mt-4 flex justify-center'>
          <Link isExternal href={process.env.APPSTORE_URL} style={linkStyle}>
            <Image src='https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83&amp;releaseDate=1720742400' alt='Download on the App Store' style={imageStyle} />
          </Link>
        </div>
        
      </div>
    </div>
  );
}
