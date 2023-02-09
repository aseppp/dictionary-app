import React from "react";
import { BiBook } from "react-icons/bi";
import { BsCloudSun, BsFillCloudMoonFill } from "react-icons/bs";
import { Box, Button, Divider, Icon, useColorMode } from "@chakra-ui/react";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Box maxW={["100%", "2xl"]} m="auto" px={1}>
        <Box
          py={2}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            <Icon as={BiBook} w={[8, 10]} h={[8, 10]} />
          </Box>

          <Box display="flex" gap={3}>
            <Box height="30px">
              <Divider orientation="vertical" colorScheme="blackAlpha" />
            </Box>

            <Box>
              <Button variant="link" size="sm" onClick={toggleColorMode}>
                {colorMode === "light" ? (
                  <Icon w={[5, 6]} h={[5, 6]} as={BsCloudSun} color="black" />
                ) : (
                  <Icon w={6} h={6} as={BsFillCloudMoonFill} />
                )}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Navbar;
