import PageRefreshLoader from '~/components/PageRefreshLoader';

export default function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageRefreshLoader pageName="Team" />
      {children}
    </>
  );
}
