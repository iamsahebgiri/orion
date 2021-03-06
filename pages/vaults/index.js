import DashboardShell from '@/components/DashboardShell';
import VaultDetails from '@/components/VaultDetails';
import { Box, Flex, Heading, Icon, Text } from '@chakra-ui/react';
import { HiFingerPrint } from 'react-icons/hi';

const Vaults = () => {
  return (
    <DashboardShell>
      <Flex width="100%" minH="100vh" px={12} py={4} direction="column" justifyContent="center" >
        <Flex direction="column" alignItems="center">
          <Flex
            alignItems="center"
            rounded="full"
            justifyContent="center"
            h={24}
            w={24}
            bg="gray.100"
          >
            <Icon as={HiFingerPrint} h={8} w={8} color="gray.500" />
          </Flex>
          <Heading size="lg" mt={4} color="gray.800" textAlign="center">No Vaults</Heading>
          <Text color="gray.500" mt={2} textAlign="center">There are no vaults created yet.</Text>
        </Flex>
      </Flex>
      {/* <Flex justifyContent="center">
        <VaultDetails />
      </Flex> */}
    </DashboardShell>
  );
};

export default Vaults;
