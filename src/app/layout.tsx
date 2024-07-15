import '@/css/globals.css';
import 'animate.css';
import TemplateHome from '@/components/template/home';
import { Providers } from './providers';
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  appLinks: {
    ios: {
      url: process.env.APPSTORE_URL,
      app_store_id: process.env.APPSTORE_ID,
    },
    // TODO: android
    // android: {
    //   package: 'com.example.android/package',
    //   app_name: 'app_name_android',
    // },
    web: {
      url: process.env.TRENDS_URL,
      should_fallback: true,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning={true}>
      <head>
        <meta name='apple-itunes-app' content={`app-id=${process.env.APPSTORE_ID}`} />
      </head>
      <body>
        <Providers>
          <TemplateHome>
            {children}
          </TemplateHome>
        </Providers>

        {
          // vercel analytics
          process.env.SERVER_TYPE === 'prod' && <Analytics/>
        }
      </body>
    </html>
  );
}
