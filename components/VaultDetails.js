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
  Input,
  Flex,
  Stack,
  SimpleGrid,
  Text,
  Icon,
  Tooltip,
  useClipboard,
  useToast
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import {
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineInformationCircle,
  HiInformationCircle,
  HiUserCircle,
  HiKey,
  HiGlobeAlt
} from 'react-icons/hi';

const InfoItem = ({ content, icon }) => {
  const { hasCopied, onCopy } = useClipboard(content);
  const toast = useToast();


  useEffect(() => {
    if (hasCopied) {
      toast({
        title: 'Copied successfully.',
        description: `${content} copied to your clipboard`,
        status: 'success',
        duration: 2000,
        isClosable: true
      });
    }
  }, [hasCopied]);

  return (
    <Box>
      <Flex alignItems="center">
        <Icon as={icon} mr={2} h={5} w={5} color="gray.600" />
        <Tooltip label="Copy to clipboard" hasArrow>
          <Text
            color="gray.700"
            _hover={{ color: 'gray.700', cursor: 'pointer' }}
            onClick={onCopy}
          >
            {content}
          </Text>
        </Tooltip>
      </Flex>
    </Box>
  );
};

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

        <Flex bg="messenger.50" my={8} p={4} rounded="md" alignItems="center">
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
        </Flex>
        <SimpleGrid columns={[1, 1, 2]} spacing="40px">
          <Stack p={8} spacing={5} bg="gray.100" rounded="md">
            <InfoItem label="Username" content={username} icon={HiUserCircle} />
            <InfoItem label="Password" content={password} icon={HiKey} />
            <InfoItem
              label="Website"
              content={`https://${url}.com`}
              icon={HiGlobeAlt}
            />
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
