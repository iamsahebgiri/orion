import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { createVault } from '@/lib/db';
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  InputRightElement,

  Stack,
  Textarea
} from '@chakra-ui/react';
import { useStoreActions } from 'easy-peasy';
import { useForm } from 'react-hook-form';

const AddVaultDrawer = ({ isOpen, onClose }) => {
  const { user, loading } = useAuth();
  const { register, handleSubmit, errors, formState } = useForm();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const addVault = useStoreActions((action) => action.addVault);
  const onSubmit = (data) => {
    const vault = {
      ...data,
      user: user.name,
      userId: user.uid,
      createdAt: new Date().toISOString()
    };
    return new Promise((resolve) => {
      const vid = createVault(vault);
      addVault({ vid, ...data });
      resolve();
      onClose();
    });
  };

  return (
    <Drawer isOpen={isOpen} placement="right" size="sm" onClose={onClose}>
      <DrawerOverlay>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">Add a new vault</DrawerHeader>
            <DrawerBody>
              <Stack spacing="24px">
                <Box>
                  <FormControl isInvalid={errors.username} isRequired>
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <Input
                      name="username"
                      placeholder="Eg. iamsahebgiri"
                      ref={register({ required: true })}
                    />
                    <FormErrorMessage>
                      {errors.username && errors.username.message}
                    </FormErrorMessage>
                  </FormControl>
                </Box>

                <Box>
                <FormControl isInvalid={errors.password} isRequired>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <InputGroup size="md">
                      <Input
                        pr="4.5rem"
                        name="password"
                        placeholder="Eg. pass123"
                        type={show ? 'text' : 'password'}
                        ref={register({ required: true })}
                      />
                      <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                          {show ? 'Hide' : 'Show'}
                        </Button>
                      </InputRightElement>
                    </InputGroup>

                    <FormErrorMessage>
                      {errors.password && errors.password.message}
                    </FormErrorMessage>
                  </FormControl>
                </Box>

                <Box>
                  <FormControl isInvalid={errors.url} isRequired>
                    <FormLabel htmlFor="url">Website</FormLabel>
                    <InputGroup>
                      <InputLeftAddon>https://</InputLeftAddon>
                      <Input
                        id="url"
                        name="url"
                        placeholder="domain"
                        ref={register({ required: true })}
                      />
                      <InputRightAddon>.com</InputRightAddon>
                    </InputGroup>

                    <FormErrorMessage>
                      {errors.url && errors.url.message}
                    </FormErrorMessage>
                  </FormControl>
                </Box>

                <Box>
                  <FormLabel htmlFor="note">Note</FormLabel>
                  <Textarea
                    ref={register}
                    name="note"
                    placeholder="Anything sweet.."
                  />
                </Box>
              </Stack>
            </DrawerBody>

            <DrawerFooter borderTopWidth="1px">
              <Button mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                colorScheme="messenger"
                isLoading={formState.isSubmitting}
              >
                Save
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </form>
      </DrawerOverlay>
    </Drawer>
  );
};

export default AddVaultDrawer;
