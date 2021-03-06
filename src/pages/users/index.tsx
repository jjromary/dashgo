import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Link,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from "@chakra-ui/react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Sidebar } from "../../components/SideBar";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import NextLink from "next/link";
import { getUsers, useUsers } from "../../services/hooks/useUsers";
import { useQuery } from "react-query";
import { api } from "../../services/api";
import { useState } from "react";
import { queryClient } from "../../services/queryClient";
import { GetServerSideProps } from "next";

export default function UserList({ users }) {
  const [page, setPage] = useState(1);
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const { data, isLoading, error, isFetching } = useUsers(page, {
    initialData: users,
  });

  async function handlePrefetchUser(userId: string) {
    await queryClient.prefetchQuery(["user", userId], async () => {
      const response = await api.get(`users/${userId}`);

      return response.data;
    });
  }

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p={["4", "6", "8"]} mr="2">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
              {!isLoading && isFetching && (
                <Spinner size="sm" color="gray.500" ml="4" />
              )}
            </Heading>
            <NextLink href="/users/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Criar novo
              </Button>
            </NextLink>
          </Flex>

          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Falha ao obter dados dos usuários</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={["4", "4", "6"]} color="gray.300" width="8">
                      <Checkbox colorScheme="pink" />
                    </Th>
                    <Th>Usuários</Th>
                    {isWideVersion && <Th>Data de cadastro</Th>}
                    <Th width="8"></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.users.map((user) => {
                    return (
                      <>
                        <Tr key={user.id}>
                          <Td px={["4", "4", "6"]}>
                            <Checkbox colorScheme="pink" />
                          </Td>
                          <Td>
                            <Box>
                              <Link
                                color="purple.400"
                                onMouseEnter={() => handlePrefetchUser(user.id)}
                              >
                                <Text fontWeight="bold">{user.name}</Text>
                              </Link>
                              <Text fontSize="sm" color="gray.300">
                                {user.email}
                              </Text>
                            </Box>
                          </Td>
                          {isWideVersion && <Td>{user.createdAt}</Td>}
                          <Td>
                            {isWideVersion && (
                              <Button
                                as="a"
                                size="sm"
                                fontSize="sm"
                                colorScheme="purple"
                                leftIcon={
                                  <Icon as={RiPencilLine} fontSize="16" />
                                }
                              >
                                Editar
                              </Button>
                            )}
                          </Td>
                        </Tr>
                      </>
                    );
                  })}
                </Tbody>
              </Table>

              <Pagination
                totalCountOfRegister={data.totalCount}
                currentPage={page}
                onPageChange={setPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}

// export const getServerSideProps: GetServerSideProps = async () => {
//   const { users, totalCount } = await getUsers(1);

//   return {
//     props: {
//       users,
//     },
//   };
// };

