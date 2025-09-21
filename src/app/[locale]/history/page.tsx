import HistoryContent from '@/components/history/HistoryContent';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { ROUTES } from '@/lib/routes';

export default async function HistoryPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect(ROUTES.signin);
  }

  const requests = (
    await prisma.history.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        method: true,
        url: true,
        createdAt: true
      }
    })
  ).map((r) => ({
    ...r,
    createdAt: r.createdAt ? r.createdAt.toISOString() : null
  }));

  return <HistoryContent requests={requests} />;
}
