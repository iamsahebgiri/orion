import DashboardShell from '@/components/DashboardShell';
import VaultDetailsSkeleton from '@/components/Skeleton/VaultDetailsSkeleton';
import VaultDetails from '@/components/VaultDetails';
import { getVaultById } from '@/lib/db';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const SingleVault = () => {
  const router = useRouter();

  const [vault, setVault] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (router?.query?.vid) {
      setLoading(true);
      getVaultById(router?.query?.vid)
        .then((doc) => {
          setVault(doc.data());
        })
        .catch((error) => {
          console.log('Error getting documents: ', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [router]);

  return (
    <DashboardShell>
      {loading ? <VaultDetailsSkeleton /> : <VaultDetails vault={vault} />}
    </DashboardShell>
  );
};

export default SingleVault;
