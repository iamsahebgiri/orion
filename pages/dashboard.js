import { useEffect } from 'react';
import DashboardShell from '@/components/DashboardShell';
import { useAuth } from '@/lib/auth';
import {
  Button,
  Box,
  Flex,
  Text,
  Stack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton
} from '@chakra-ui/react';

import {
  HiOutlinePencilAlt,
  HiOutlineDuplicate,
  HiDotsVertical,
  HiOutlineTrash
} from 'react-icons/hi';

const Vault = () => {
  return (
    <Flex
      bg="white"
      p={4}
      rounded="md"
      shadow="sm"
      justifyContent="space-between"
      width={['full', 'sm']}
    >
      <Flex>
        <Box>
          <img
            src="https://favicons.githubusercontent.com/google.com"
            alt="Picture of the author"
            width="32"
            height="32"
          />
        </Box>

        <Box ml={2}>
          <Text fontWeight="semibold" fontSize="xl" color="gray.800">
            Google
          </Text>
          <Text color="gray.500" fontSize="sm">
            sahebgiri578
          </Text>
        </Box>
      </Flex>
      <Box>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HiDotsVertical />}
            size="sm"
            variant="ghost"
          />
          <MenuList>
            <MenuItem icon={<HiOutlineDuplicate size={18} />}>
              Copy password
            </MenuItem>
            <MenuItem icon={<HiOutlineDuplicate size={18} />}>
              Copy username
            </MenuItem>
            <MenuItem icon={<HiOutlinePencilAlt size={18} />}>Edit</MenuItem>
            <MenuItem icon={<HiOutlineTrash size={18} />}>Delete</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
};

const Dashboard = () => {
  // const auth = useAuth();

  // useEffect(() => {
  //   console.log(auth?.user);
  // }, [auth]);

  return (
    <DashboardShell>
      <Flex flexDir={['column', 'flex-start']} width="full">
        <Flex justifyContent="flex-end">
          <Button colorScheme="messenger" width={['full', '180px']}>
            Add Item
          </Button>
        </Flex>

        <Stack mt={[2, 6]}>
          <Vault />
          <Vault />
          <Vault />
          <Vault />
          <Vault />
          <Vault />
        </Stack>
      </Flex>
    </DashboardShell>
  );
};

export default Dashboard;
