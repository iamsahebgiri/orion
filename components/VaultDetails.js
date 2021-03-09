import { deleteVaultById } from '@/lib/db';
import getStrengthColor from '@/utils/getStrengthColor';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  Stack,
  Text,
  Tooltip,
  useClipboard,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import { formatDistance, parseISO } from 'date-fns';
import { useStoreActions } from 'easy-peasy';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';
import UpdateVaultDrawer from './UpdateVaultDrawer';

const MyInputGroup = ({ content, label }) => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const { hasCopied, onCopy } = useClipboard(content);
  const toast = useToast();

  useEffect(() => {
    if (hasCopied) {
      toast({
        title: 'Successfully copied!',
        description: `${content} copied to your clipboard`,
        status: 'success',
        duration: 2000,
        isClosable: true
      });
    }
  }, [hasCopied]);

  return (
    <FormControl id={content}>
      <FormLabel>{label}</FormLabel>
      <InputGroup size="md">
        <Input
          pr="4.5rem"
          type="text"
          value={content}
          isReadOnly
          bgColor="white"
          focusBorderColor="messenger.500"
        />
        <InputRightElement width="4.5rem">
          <Tooltip label="Copy to clipboard" hasArrow>
            <Button h="1.75rem" size="sm" onClick={onCopy}>
              {hasCopied ? 'Copied' : 'Copy'}
            </Button>
          </Tooltip>
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
};

const MyPasswordInput = ({ content, label }) => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const { hasCopied, onCopy } = useClipboard(content);
  const toast = useToast();

  useEffect(() => {
    if (hasCopied) {
      toast({
        title: 'Successfully copied!',
        description: `${content} copied to your clipboard`,
        status: 'success',
        duration: 2000,
        isClosable: true
      });
    }
  }, [hasCopied]);

  return (
    <FormControl id={content}>
      <FormLabel>{label}</FormLabel>
      <InputGroup size="md">
        <Input
          pr="9rem"
          type={show ? 'text' : 'password'}
          value={content}
          isReadOnly
          bgColor="white"
          focusBorderColor="messenger.500"
        />
        <InputRightElement width="9rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? 'Hide' : 'Show'}
          </Button>
          <Tooltip label="Copy to clipboard" hasArrow>
            <Button h="1.75rem" size="sm" ml="0.5rem" onClick={onCopy}>
              {hasCopied ? 'Copied' : 'Copy'}
            </Button>
          </Tooltip>
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
};

const VaultDetails = ({ vault }) => {
  const { note, password, url, username, vid, createdAt } = vault;
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const onCloseDialog = () => setIsOpenDialog(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const deleteVault = useStoreActions((action) => action.deleteVault);

  const toast = useToast();
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  return (
    <>
      <Flex width="100%" minH="100vh" px={12} py={4} direction="column">
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
                src={`https://favicons.githubusercontent.com/${url}.com`}
                alt={url}
                width="32"
                height="32"
              />
            </Box>
            <Box ml={2}>
              <Text fontWeight="semibold" fontSize="2xl" color="gray.700">
                {url[0].toUpperCase() + url.substr(1)}
              </Text>
            </Box>
          </Flex>
          <Box>
            <Button leftIcon={<HiOutlinePencil />} onClick={onOpen}>
              Edit
            </Button>
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

        {/* <Flex bg="messenger.50" mt={8} p={4} rounded="md" alignItems="center">
          <Icon
            as={HiInformationCircle}
            h={5}
            w={5}
            mr={2}
            color="messenger.600"
          />
          <Text color="messenger.600">
            Click on the item to copy it to clipboard.
          </Text>
        </Flex> */}
        <SimpleGrid mt={8} columns={[1, 1, 2]} spacing="40px">
          <Stack p={8} spacing={5} bg="gray.100" rounded="md">
            <Box>
              <Heading size="md" color="gray.800">
                Vault information
              </Heading>
              <Text color="gray.500">
                created{' '}
                {formatDistance(new Date(), parseISO(createdAt), {
                  addSuffix: true
                })}
              </Text>
            </Box>

            <MyInputGroup content={username} label="Username" />

            <MyPasswordInput content={password} label="Password" />

            <FormControl id="email">
              <FormLabel>Strength</FormLabel>
              <Flex
                height="2"
                bg={getStrengthColor(password)}
                rounded="full"
              ></Flex>
            </FormControl>

            <MyInputGroup content={`https://${url}.com`} label="Website" />
          </Stack>

          <Box p={8} bg="gray.100" rounded="md">
            <Text fontWeight="bold" color="gray.800">
              Note
            </Text>
            <Text color="gray.600">{note}</Text>
          </Box>
        </SimpleGrid>
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
              <Button
                colorScheme="red"
                onClick={() => {
                  setDeleting(true);
                  deleteVaultById(vid)
                    .then(() => {
                      deleteVault(vid);
                      toast({
                        title: 'Vault successfully deleted!',
                        status: 'success',
                        duration: 2000
                      });
                      setDeleting(false);
                      console.log('Document successfully deleted!');
                      onCloseDialog();
                      router.replace('/vaults');
                    })
                    .catch((error) => {
                      console.error('Error removing document: ', error);
                      onCloseDialog();
                    });
                }}
                ml={3}
                isLoading={deleting}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      {/* Edit Dialog */}
      <UpdateVaultDrawer isOpen={isOpen} onClose={onClose} vault={vault} />
    </>
  );
};

export default VaultDetails;
