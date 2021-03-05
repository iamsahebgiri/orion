import DashboardShell from '@/components/DashboardShell';
import { Flex, Heading } from '@chakra-ui/react';

const Appearance = () => {
  return (
    <DashboardShell>
      <Flex>
        <Heading size="md">Themes</Heading>
      </Flex>
    </DashboardShell>
  );
};

export default Appearance;
