export default function Body({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className='paper-body'>
        {children}
      </div>
    </>
  );
}

