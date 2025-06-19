import PageRefreshLoader from '~/components/PageRefreshLoader';

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageRefreshLoader pageName="Community" />
      {children}
    </>
  );
}
