import {
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Stack
} from '@chakra-ui/react';
import { HiOutlineSearch } from 'react-icons/hi';
import Vault from '@/components/Vault';
import { useAuth } from '@/lib/auth';
import { useEffect, useState } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';

const AllVaults = () => {
  const { user } = useAuth();

  const vaults = useStoreState((state) => state.vaults);
  const vaultsCopy = useStoreState((state) => state.vaultsCopy);
  const loadingVault = useStoreState((state) => state.loadingVault);
  const getAllVaults = useStoreActions((actions) => actions.getAllVaults);
  const setVault = useStoreActions((actions) => actions.setVault);

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (user !== null) {
      getAllVaults(user?.uid);
    }
  }, [user]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const result = vaultsCopy.filter((vault) =>
      vault.url.match(e.target.value)
    );
    setVault(result);
  };

  return (
    <Flex
      width="360px"
      flexDir="column"
      height="100vh"
      bg="gray.100"
      alignItems="center"
      p={4}
      overflowX="scroll"
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
            placeholder="Search vaults"
            value={searchTerm}
            onChange={handleSearch}
          />
        </InputGroup>
      </Flex>
      <Stack>
        {loadingVault ? (
          <Spinner color="messenger.500" />
        ) : (
          vaults.map((vault) => (
            <Vault
              key={vault.vid}
              url={vault.url}
              username={vault.username}
              vid={vault.vid}
            />
          ))
        )}
      </Stack>
    </Flex>
  );
};

export default AllVaults;
