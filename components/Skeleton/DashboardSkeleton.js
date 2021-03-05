import {  Flex, Skeleton } from '@chakra-ui/react';

const DashboardSkeleton = () => {
  return (
    <>
      <Flex p={3} direction="row-reverse">
        <Skeleton height="40px" width="160px" rounded="md" />
        <Skeleton height="40px" width="80px" rounded="md" mr={3} />
      </Flex>
      <Skeleton height="130px" rounded="md" m={3} />
      <Skeleton height="130px" rounded="md" m={3} />
      <Skeleton height="130px" rounded="md" m={3} />
    </>
  );
};

export default DashboardSkeleton;
