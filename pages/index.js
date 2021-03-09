import Container from '@/components/Container';
import { useAuth } from '@/lib/auth';
import {
  Button,
  Flex,
  Heading,
  Link as ChakraLink,
  Stack,
  Text
} from '@chakra-ui/react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();
  const auth = useAuth();
  return (
    <>
      <Head>
        <title>Orion - Never forget your password again. </title>
      </Head>
      <Container>
        <Flex alignItems="center" justifyContent="space-between">
          <Heading>orion</Heading>
          <Stack direction="row" spacing={4}>
            <ChakraLink as={Link} href="/">
              Features
            </ChakraLink>
            <ChakraLink as={Link} href="/">
              Team
            </ChakraLink>
            <ChakraLink as={Link} href="/">
              About us
            </ChakraLink>
          </Stack>
        </Flex>

        <Flex direction="column" alignItems="center" mt={16} py={16}>
          <Heading
            color="gray.700"
            textAlign="center"
          >
            Never forget your password again.
          </Heading>
          <Text mt={3} color="gray.600" textAlign="center">
            Orion puts your digital life at your fingertips, simply and
            securely.
          </Text>
          <Button
            colorScheme="messenger"
            isLoading={auth.loading.google}
            onClick={() => auth.signinWithGoogle('/vaults')}
            my={6}
          >
            Continue with Google
          </Button>
        </Flex>
        <Flex alignItems="center" justifyContent="center">
          <img src="/assets/device-hero-desktop.png" />
        </Flex>

        <Flex>
          <Flex h={8} w={8} bg="red" rounded="full">

          </Flex>
        </Flex>
      </Container>
    </>
  );
};

export default Home;
