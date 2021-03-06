import { useAuth } from '@/lib/auth';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import {
  HiOutlinePencil,
  HiOutlineSearch,
  HiOutlineTrash,
  HiOutlinePlus
} from 'react-icons/hi';
import AddItemDrawer from './AddItemDrawer';

const Vault = (props) => {
  return (
    <Flex
      bg="white"
      p={4}
      rounded="md"
      shadow="sm"
      justifyContent="space-between"
      width="320px"
    >
      <Flex alignItems="center">
        <Box>
          <img
            src="https://favicons.githubusercontent.com/adobe.com"
            alt="Picture of the author"
            width="32"
            height="32"
          />
        </Box>

        <Box ml={2}>
          <Text fontWeight="semibold" color="gray.700">
            Adobe
          </Text>
          <Text color="gray.500" fontSize="sm">
            iamsahebgiri
          </Text>
        </Box>
      </Flex>
      <Box></Box>
    </Flex>
  );
};

const DashboardShell = (props) => {
  const { user, loading } = useAuth();
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const onCloseDialog = () => setIsOpenDialog(false);
  const { isOpen, onOpen, onClose} = useDisclosure();

  const navs = [
    {
      name: 'My Vault',
      href: 'dashboard'
    },
    {
      name: 'Secure Notes',
      href: 'appearance'
    },
    {
      name: 'Settings',
      href: 'settings'
    }
  ];
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
        >
          <Box>
            <Box height="64px" width="64px">
              <img
                src="/assets/orion-dashboard.png"
                height="64px"
                width="64px"
              />
            </Box>
            <Tooltip hasArrow label="Add Item" aria-label="Add Item" placement="right">
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
            {/* <Button onClick={onOpen}>A</Button> */}
          </Box>
          <img
            style={{
              borderRadius: '25px'
            }}
            height="40px"
            width="40px"
            src={user?.photoUrl}
            alt={user?.name}
          />
        </Flex>
        <Flex
          width="360px"
          flexDir="column"
          height="100vh"
          bg="gray.100"
          alignItems="center"
          p={4}
        >
          <Flex py={4}>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={
                  <Icon size="21px" as={HiOutlineSearch} color="gray.400" />
                }
              />
              <Input
                bg="white"
                width="320px"
                placeholder="Search password"
                focusBorderColor="messenger.500"
              />
            </InputGroup>
          </Flex>
          <Stack>
            <Vault />
            <Vault />
            <Vault />
            <Vault />
          </Stack>
        </Flex>
      </Flex>
      <Flex ml="424px" justifyContent="center">
        <Flex width="100%" px={12} py={4} direction="column">
          <Flex
            alignItems="center"
            width="100%"
            borderBottomWidth="1px"
            py={4}
            justifyContent="space-between"
          >
            <Flex alignItems="center">
              <Box>
                <img
                  src="https://favicons.githubusercontent.com/google.com"
                  alt="Picture of the author"
                  width="32"
                  height="32"
                />
              </Box>
              <Box ml={2}>
                <Text fontWeight="semibold" fontSize="2xl" color="gray.700">
                  Google
                </Text>
              </Box>
            </Flex>
            <Box>
              <Button leftIcon={<HiOutlinePencil />}>Edit</Button>
              <Button
                leftIcon={<HiOutlineTrash />}
                ml={5}
                colorScheme="red"
                onClick={() => setIsOpenDialog(true)}
              >
                Delete
              </Button>
            </Box>
          </Flex>
          <Stack py={6}>
            <Box>
              <Text fontWeight="bold">Username</Text>
              <Text>iamsahebgiri</Text>
            </Box>
            <Box>
              <Text fontWeight="bold">Password</Text>
              <Text>iamsahebgiri</Text>
            </Box>
            <Box>
              <Text fontWeight="bold">Website</Text>
              <Text>iamsahebgiri.now.sh</Text>
            </Box>
          </Stack>
          <Divider />
          <Box>
            <Text fontWeight="bold">Note</Text>
            <Text>
              The BIOS in modern PCs initializes and tests the system hardware
              components, and loads a boot loader from a mass storage device
              which then initializes an operating system.
            </Text>
          </Box>
        </Flex>
      </Flex>
      {/* Delete Password Dialog */}
      <AlertDialog isOpen={isOpenDialog} onClose={onCloseDialog} isCentered>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Password
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete password?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onCloseDialog}>Cancel</Button>
              <Button colorScheme="red" onClick={onCloseDialog} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      {/* Add Item Drawer */}
      <AddItemDrawer isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default DashboardShell;
