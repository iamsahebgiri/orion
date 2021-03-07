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
  Stack,
  Text
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';

const VaultDetails = ({ vault }) => {
  const { note, password, url, username } = vault;
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const onCloseDialog = () => setIsOpenDialog(false);
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
            <Text>{username}</Text>
          </Box>
          <Box>
            <Text fontWeight="bold">Password</Text>
            <Text>{password}</Text>
          </Box>
          <Box>
            <Text fontWeight="bold">Website</Text>
            <Text>https://{url}.com</Text>
          </Box>
        </Stack>

        <Divider />

        <Box>
          <Text fontWeight="bold">Note</Text>
          <Text>{note}</Text>
        </Box>
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
    </>
  );
};

export default VaultDetails;
