import { Flex, SimpleGrid, Skeleton, SkeletonCircle } from '@chakra-ui/react';

const VaultDetailsSkeleton = () => {
  return (
    <Flex width="100%" minH="100vh" px={12} py={8} direction="column">
      {/* top bar */}
      <Flex justifyContent="space-between">
        <Flex>
          <SkeletonCircle size="8" mr="4" />
          <Skeleton width="32" rounded="md" height="8" />
        </Flex>

        <Flex>
          <Skeleton width="24" rounded="md" height="8" />
          <Skeleton width="24" rounded="md" ml="4" height="8" />
        </Flex>
      </Flex>

      {/* Bottom  */}
      <SimpleGrid mt={16} columns={[1, 1, 2]} spacing="40px">
        <Skeleton height="56" rounded="md" />
        <Skeleton height="56" rounded="md" />
      </SimpleGrid>
    </Flex>
  );
};

export default VaultDetailsSkeleton;
