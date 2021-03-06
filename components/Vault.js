import { Box, Flex, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Vault = ({ url = 'url', username = 'username', vid = '1' }) => {
  const router = useRouter();
  const isSelected = router.asPath.split('/')[2] === vid;
  return (
    <Link href={`/vaults/${vid}`}>
      <Flex
        p={4}
        rounded="md"
        shadow="sm"
        justifyContent="space-between"
        width="320px"
        _hover={{ cursor: 'pointer' }}
        bg={isSelected ? 'messenger.500' : 'white'}
      >
        <Flex alignItems="center">
          <Box>
            <img
              src={`https://favicons.githubusercontent.com/${url}.com`}
              alt="Picture of the author"
              width="32"
              height="32"
            />
          </Box>

          <Box ml={2}>
            <Text fontWeight="semibold" color={isSelected? 'gray.50' :"gray.700"}>
              {url[0].toUpperCase() + url.substr(1)}
            </Text>
            <Text color={isSelected? 'gray.200' :"gray.500"} fontSize="sm">
              {username}
            </Text>
          </Box>
        </Flex>
        <Box></Box>
      </Flex>
    </Link>
  );
};

export default Vault;
