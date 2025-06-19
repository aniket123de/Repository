import PageRefreshLoader from '~/components/PageRefreshLoader';

export default function FytLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <PageRefreshLoader pageName="FYT" />
      {children}
    </div>
  );
}
