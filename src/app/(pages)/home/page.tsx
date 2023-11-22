import ComponentProfileAll from '@/components/(profile)/profileAll';
import { iProfileAll } from '@/shared/interface/profile';

async function getPofileAll() {
  const res = await fetch(
    process.env.PROFILE_URL,
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
  const profileAll: iProfileAll= await getPofileAll();

  return (
    <>
      <ComponentProfileAll dataProfileAll={profileAll} />
    </>
  )
}
