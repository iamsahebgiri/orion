import DashboardShell from '@/components/DashboardShell';
import { Flex, Heading } from '@chakra-ui/react';

const Settings = () => {
  return (
    <DashboardShell>
      <Flex>
        <Heading size="md">Settings</Heading>
      </Flex>
    </DashboardShell>
  );
};

export default Settings;
