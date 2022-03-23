import { Flex, Input, Text, Icon, HStack, Box, Avatar } from "@chakra-ui/react";
import { RiNavigationLine, RiNotificationLine, RiSearchLine, RiUserAddLine } from "react-icons/ri";
import { NotificationsNav } from "./NotificationNav";
import { Profile } from "./Profile";
import { SearchBox } from "./SearchBox";
import { Logo } from "./Logo";

export function Header() {
  return (
    <Flex
      as="header"
      w="100%"
      maxWidth={1480}
      h="20"
      mx="auto" // margin horizontal - eixo X
      mt="4"
      px="6" //padding horizontal - eixo X
      align="center"
    >
      <Logo />
      <SearchBox />

      <Flex align="center" ml="auto" >
        <NotificationsNav />

        <Profile />

      </Flex>
    </Flex>
  );
}
