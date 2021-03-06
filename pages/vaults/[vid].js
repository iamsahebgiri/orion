import DashboardShell from "@/components/DashboardShell";
import { useRouter } from "next/router";

const SingleVault = () => {
    const router =  useRouter();
    return (
        <DashboardShell>
          {router.query.vid}
        </DashboardShell>
    )
}

export default SingleVault;
