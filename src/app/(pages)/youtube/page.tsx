import ComponentVideo from '@/components/(youtube)/video';

const URL_YOUTUBE = 'https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=KR&key=';

async function getYoutubeList() {
  const res = await fetch(
    URL_YOUTUBE + process.env.YOUTUBE_KEY,
    {
      headers: {
        'Content-type': 'application/json;',
      },
      cache: 'no-cache'
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data from youtube.');
  }

  return res.json();
}

export default async function Page() {
  const dataYoutube = await getYoutubeList();

  return (
    <>
      <ComponentVideo dataVideo={dataYoutube.items} />
    </>
  )
}
