import { useEffect, useState } from 'react';
import DashboardShell from '@/components/DashboardShell';
import Vault from '@/components/Vault';
import VaultDetails from '@/components/VaultDetails';
import { useStoreActions } from 'easy-peasy';
import { useRouter } from 'next/router';
import { getVaultById } from '@/lib/db';

const SingleVault = () => {
  const router = useRouter();

  const [vault, setVault] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (router?.query?.vid) {
      getVaultById(router?.query?.vid)
        .then((doc) => {
          setVault(doc.data());
          setLoading(false);
        })
        .catch((error) => {
          console.log('Error getting documents: ', error);
          setLoading(false);
        });
    }
  }, [router]);
  return (
    <DashboardShell>
      {!loading && <VaultDetails vault={vault} />}
    </DashboardShell>
  );
};

export default SingleVault;
