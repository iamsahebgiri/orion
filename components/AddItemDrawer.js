import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  FormLabel,
  FormControl,
  FormErrorMessage,
  InputLeftAddon,
  InputRightAddon,
  Select,
  Textarea,
  IconButton,
  Stack,
  Box,
  Input,
  InputGroup,
  Button
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/lib/auth';
import { createVault } from '@/lib/db';

const AddItemDrawer = ({ isOpen, onClose }) => {
  const { user, loading } = useAuth();
  const { register, handleSubmit, watch, errors, formState } = useForm();
  const onSubmit = (data) => {
    const vault = {
      ...data,
      user: user.name,
      userId: user.uid,
      createdAt: new Date().toISOString()
    };
    return new Promise((resolve) => {
      createVault(vault)
        .then(() => {
          console.log('Document successfully added!');
          resolve();
          onClose();
        })
        .catch((error) => {
          console.error('Error creating document: ', error);
          resolve();
          onClose();
        });
    });
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">
              Add a new account
            </DrawerHeader>
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
                    <Input
                      name="password"
                      placeholder="Eg. pass123"
                      type="password"
                      ref={register({ required: true })}
                    />
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

export default AddItemDrawer;
