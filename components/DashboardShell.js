import { LincTreeFavIcon } from '@/components/LincTree';
import NavItem from '@/components/NavItem';
import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Portal,
  Divider,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  Input,
  Stack,
  Text,
  Button,
  Icon
} from '@chakra-ui/react';

import {
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineSearch
} from 'react-icons/hi';

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
  const auth = useAuth();
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)
  

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
            <Box height="64px" width="64px"></Box>
            <Box height="64px" width="64px"></Box>
            <Box height="64px" width="64px"></Box>
          </Box>
          <img
            style={{
              borderRadius: '25px'
            }}
            height="40px"
            width="40px"
            src={auth?.user?.photoUrl}
            alt={auth?.user?.name}
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
              <Input bg="white" width="320px" placeholder="Search password" />
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
            borderBottom="1px"
            py={4}
            borderBottomColor="gray.100"
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
              <Button leftIcon={<HiOutlineTrash />} ml={5} colorScheme="red" onClick={() => setIsOpen(true)}>
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
            <Text>The BIOS in modern PCs initializes and tests the system hardware components, and loads a boot loader from a mass storage device which then initializes an operating system.</Text>
          </Box>
        </Flex>
      </Flex>
      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Password
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onClose} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default DashboardShell;
