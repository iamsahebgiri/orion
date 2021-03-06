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
import { getVaultByUserId } from '@/lib/db';

const AllVaults = () => {
  const { user } = useAuth();
  const [vaults, setVaults] = useState(null);
  const [vaultsCopy, setVaultsCopy] = useState(null);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (user !== null) {
      getVaultByUserId(user?.uid)
        .then((querySnapshot) => {
          let data = [];
          querySnapshot.forEach((doc) => {
            data.push(doc.data());
            // console.log(doc.id, ' -> ', doc.data());
          });
          setVaultsCopy(data);
          setVaults(data);
          setLoading(false);
          console.log(vaults);
        })
        .catch((error) => {
          console.log('Error getting documents: ', error);
          setLoading(false);
        });
    }
  }, [user]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const result = vaultsCopy.filter((vault) =>
      vault.url.match(e.target.value)
    );
    setVaults(result);
    console.log(result);
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
            focusBorderColor="messenger.500"
            value={searchTerm}
            onChange={handleSearch}
          />
        </InputGroup>
      </Flex>
      <Stack>
        {loading ? (
          <Spinner color="messenger.500" />
        ) : (
          vaults.map((vault) => (
            <Vault
              key={vault.createdAt}
              url={vault.url}
              username={vault.username}
            />
          ))
        )}
      </Stack>
    </Flex>
  );
};

export default AllVaults;
