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
  InputLeftAddon,
  InputRightAddon,
  Select,
  Textarea,
  IconButton,
  Stack,
  Box,
  Input,
  InputGroup,
  Button,

} from '@chakra-ui/react';
import { useAuth } from '@/lib/auth';

const AddItemDrawer = ({ isOpen, onClose }) => {
    const { user, loading } = useAuth();
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Add a new account</DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="username">Username</FormLabel>
                <Input id="username" placeholder="Please enter user name" />
              </Box>

              <Box>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  id="password"
                  placeholder="Please enter password"
                  type="password"
                />
              </Box>

              <Box>
                <FormLabel htmlFor="url">Website</FormLabel>
                <InputGroup>
                  <InputLeftAddon>http://</InputLeftAddon>
                  <Input
                    type="url"
                    id="url"
                    placeholder="Please enter domain"
                  />
                  <InputRightAddon>.com</InputRightAddon>
                </InputGroup>
              </Box>

              <Box>
                <FormLabel htmlFor="desc">Note</FormLabel>
                <Textarea id="desc" />
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="messenger"
              onClick={() => {
                const newVault = {
                  user: user.name,
                  userId: user.uid,

                  createdAt: new Date().toISOString()
                };
                console.log('newVault', newVault);
              }}
            >
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default AddItemDrawer;
