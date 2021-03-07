import { useAuth } from '@/lib/auth';
import {
  Box,
  Flex,
  Icon,
  Tooltip,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Portal,
  useDisclosure
} from '@chakra-ui/react';
import React from 'react';
import { HiOutlinePlus } from 'react-icons/hi';
import AddItemDrawer from './AddItemDrawer';
import AllVaults from './AllVaults';

const DashboardShell = (props) => {
  const auth = useAuth();

  const { isOpen, onOpen, onClose } = useDisclosure();
  
  return (
    <Box>
      <Flex position="fixed" zIndex={1}>
        <Flex
          width={['100vw', '64px']}
          flexDir={['row', 'column']}
          height={['64px', '100vh']}
          bg="gray.800"
          alignItems="center"
          justifyContent="space-between"
          pb={4}
        >
          <Box>
            <Box height="64px" width="64px">
              <img
                src="/assets/orion-dashboard.png"
                height="64px"
                width="64px"
              />
            </Box>
            <Tooltip
              hasArrow
              label="Add Vault"
              aria-label="Add Vault"
              placement="right"
            >
              <Flex
                alignItems="center"
                justifyContent="center"
                height="64px"
                width="64px"
                onClick={onOpen}
                _hover={{ cursor: 'pointer' }}
              >
                <Icon as={HiOutlinePlus} h={8} w={8} color="gray.300" />
              </Flex>
            </Tooltip>
          </Box>
          <Menu>
            <MenuButton>
              <img
                style={{
                  borderRadius: '25px'
                }}
                height="40px"
                width="40px"
                src={auth?.user?.photoUrl}
                alt={auth?.user?.name}
              />
            </MenuButton>
            <Portal>
              <MenuList>
                <MenuGroup title="Account">
                  <MenuItem fontSize="sm" onClick={() => auth.signout()}>
                    Sign Out
                  </MenuItem>
                </MenuGroup>
              </MenuList>
            </Portal>
          </Menu>
        </Flex>

        <AllVaults />
      </Flex>
      <Flex ml="424px">
        {props.children}
      </Flex>

      {/* Add Item Drawer */}
      <AddItemDrawer isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default DashboardShell;
