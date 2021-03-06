import { Box, Flex, Text } from '@chakra-ui/react';

const Vault = ({ url = 'url', username = 'username' }) => {
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
            src={`https://favicons.githubusercontent.com/${url}.com`}
            alt="Picture of the author"
            width="32"
            height="32"
          />
        </Box>

        <Box ml={2}>
          <Text fontWeight="semibold" color="gray.700">
            {url[0].toUpperCase() + url.substr(1)}
          </Text>
          <Text color="gray.500" fontSize="sm">
            {username}
          </Text>
        </Box>
      </Flex>
      <Box></Box>
    </Flex>
  );
};

export default Vault;
