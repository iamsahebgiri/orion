import Container from '@/components/Container';
import { useAuth } from '@/lib/auth';
import {
  Button,
  Flex,
  Heading,
  Icon,
  Link as ChakraLink,
  Stack,
  Text
} from '@chakra-ui/react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  HiOutlineLockClosed,
  HiOutlineGlobeAlt,
  HiFingerPrint
} from 'react-icons/hi';

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
          <Heading color="gray.700" textAlign="center">
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

        <Flex py={24} justifyContent="space-around">
          <Stack>
            <Flex
              h={10}
              w={10}
              bg="messenger.500"
              rounded="full"
              alignItems="center"
              justifyContent="center"
            >
              <Icon as={HiOutlineLockClosed} color="white" h={6} w={6} />
            </Flex>
            <Heading size="md" color="gray.800">
              End-to-End Encrypted
            </Heading>
            <Text color="gray.600" maxW="xs">
              Your private information is protected with end-to-end encryption
              before it ever leaves your device.
            </Text>
          </Stack>
          <Stack>
            <Flex
              h={10}
              w={10}
              bg="whatsapp.500"
              rounded="full"
              alignItems="center"
              justifyContent="center"
            >
              <Icon as={HiOutlineGlobeAlt} color="white" h={6} w={6} />
            </Flex>
            <Heading size="md" color="gray.800">
              Global Access
            </Heading>
            <Text color="gray.600" maxW="xs">
              Access Orion from anywhere, with any platform anytime.
            </Text>
          </Stack>
          <Stack>
            <Flex
              h={10}
              w={10}
              bg="red.500"
              rounded="full"
              alignItems="center"
              justifyContent="center"
            >
              <Icon as={HiFingerPrint} color="white" h={6} w={6} />
            </Flex>
            <Heading size="md" color="gray.800">
              Log in and go
            </Heading>
            <Text color="gray.600" maxW="xs">
              Once you save a password in Orion, you'll always have it when you
              need it; logging in is fast and easy.
            </Text>
          </Stack>
        </Flex>
      </Container>
    </>
  );
};

export default Home;
