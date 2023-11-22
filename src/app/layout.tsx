import '@/css/globals.css';
import 'animate.css';
import TemplateHome from '@/components/template/home';
import { Providers } from "./providers";
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning={true}>
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
