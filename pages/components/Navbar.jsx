import React, { useEffect, useState } from "react";
import { BiBook } from "react-icons/bi";
import { BsCloudSun, BsFillCloudMoonFill } from "react-icons/bs";
import { MdKeyboardArrowDown } from "react-icons/md";
import {
  Box,
  Button,
  Divider,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { setFontStyle } from "@/redux/features/fontSlice";
import { lora, inter, inconsolata } from "@/styles/fonts";

const Navbar = () => {
  const dispatch = useDispatch();
  const [font, setFont] = useState(inter);
  const fontStyle = useSelector((state) => state.font);
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("white", "#1d1d1d");
  const textColor = useColorModeValue("gray.600", "gray.400");

  const handleChange = (value) => {
    dispatch(setFontStyle(value));
  };

  useEffect(() => {
    if (fontStyle.font === "inter") {
      setFont(inter);
    } else if (fontStyle.font === "lora") {
      setFont(lora);
    } else if (fontStyle.font === "inconsolata") {
      setFont(inconsolata);
    }
  }, [fontStyle]);

  return (
    <header className={font.className}>
      <Box maxW={["100%", "2xl"]} m="auto" px={2}>
        <Box
          py={2}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            <Icon as={BiBook} w={[8, 10]} h={[8, 10]} />
          </Box>

          <Box display="flex" gap={2}>
            <Box display="flex" alignItems="center">
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<MdKeyboardArrowDown />}
                  variant="link"
                  style={{ textDecoration: "none" }}
                  color={textColor}
                  fontSize="sm"
                >
                  Fonts Style
                </MenuButton>
                <MenuList bg={bgColor}>
                  <MenuItem
                    fontSize="sm"
                    className={lora.className}
                    onClick={() => handleChange("lora")}
                    bg={bgColor}
                  >
                    Serif
                  </MenuItem>
                  <MenuItem
                    fontSize="sm"
                    className={inter.className}
                    onClick={() => handleChange("inter")}
                    bg={bgColor}
                  >
                    Sans Serif
                  </MenuItem>
                  <MenuItem
                    fontSize="sm"
                    className={inconsolata.className}
                    onClick={() => handleChange("inconsolata")}
                    bg={bgColor}
                  >
                    Mono
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>

            <Box height="30px">
              <Divider orientation="vertical" colorScheme="blackAlpha" />
            </Box>

            <Box display="flex" alignItems="end" gap={2}>
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
    </header>
  );
};

export default Navbar;
