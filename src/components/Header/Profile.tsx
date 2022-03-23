import { Flex, Box, Avatar, Text } from "@chakra-ui/react";

export function Profile(){
    return(
        <Flex align="center">
            <Box mr="4" textAlign="right">
                <Text>José Romary Brandão</Text>
                <Text color="gray.300" fontSize="small">
                    joseromarybrandao@gmail.com
                </Text>
            </Box>

            <Avatar
                size="md"
                name="Jose Romary Brandão" src="https://github.com/jjromary.png"
            >
            </Avatar>

        </Flex>
    )
}