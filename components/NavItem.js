import Link from 'next/link';
import { Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const NavItem = (props) => {
  const { nav, children } = props;
  const router = useRouter();
  const isActive = router.pathname.startsWith(`/${nav.href}`);
  return (
    <Link href={nav.href} {...props}>
      <Flex
        p="3"
        borderBottom="2px solid"
        borderColor={isActive ? 'whatsapp.500' : 'transparent'}
        _hover={{
          cursor: 'pointer'
        }}
      >
        <Text
          fontWeight="500"
          fontSize="sm"
          color={isActive ? 'gray.900' : 'gray.600'}
        >
          {children}
        </Text>
      </Flex>
    </Link>
  );
};

export default NavItem;
