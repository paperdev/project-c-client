import Header from '@/components/header';
import Body from '@/components/body';
import Footer from '@/components/footer';

const PageTitle = 'Welcome';
export default function TemplateHome({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className='paper-default-view'>
        <Header title={PageTitle} />
        <Body>
          {children}
        </Body>
        <Footer/>
      </div>
    </>
  );
}
