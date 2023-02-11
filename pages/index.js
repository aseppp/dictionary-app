import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Navbar from "./components/Navbar";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { getWords } from "@/redux/features/wordSlice";
import { useDispatch, useSelector } from "react-redux";
import { lora, inter, inconsolata, lobster } from "@/styles/fonts";
import {
  Alert,
  AlertIcon,
  Box,
  Divider,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  ListItem,
  Text,
  UnorderedList,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";

export default function Home() {
  const dispatch = useDispatch();
  const [param, setParam] = useState("");
  const [font, setFont] = useState(inter);
  const [audio, setAudio] = useState([]);
  const textColor = useColorModeValue("gray.600", "gray.400");
  const definitionColor = useColorModeValue("gray.700", "gray.300");
  const word = useSelector((state) => state.word);
  const wordData = word.data?.[0];
  const fontStyle = useSelector((state) => state.font);
  const { handleSubmit } = useForm();
  const useAbleAudio = audio.slice(0, 1);

  const handleChange = (e) => {
    setParam(e.target.value);
  };

  const onSubmit = () => {
    dispatch(getWords(param));
  };

  const filterAudio = () => {
    const result = word?.data[0]?.phonetics;
    for (let i = 0; i < result.length; i++) {
      const filtered = result.filter((e) => {
        return e.audio !== "";
      });
      setAudio(filtered);
    }
  };

  const audioPlay = () => {
    new Audio(useAbleAudio[0]?.audio).play();
  };

  useEffect(() => {
    if (word.data) {
      filterAudio();
    }
  }, [word.data]);

  useEffect(() => {
    if (fontStyle.font === "inter") {
      setFont(inter);
    } else if (fontStyle.font === "lora") {
      setFont(lora);
    } else if (fontStyle.font === "inconsolata") {
      setFont(inconsolata);
    }
  }, [fontStyle]);

  console.log(wordData);

  return (
    <>
      <Head>
        <title>Dictionary App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1d1d1d" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className={font.className}>
        <Box p={2} maxW={["100%", "2xl"]} m="auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box my={2}>
              <InputGroup>
                <InputGroup>
                  <InputRightElement
                    pointerEvents="none"
                    children={<BiSearchAlt color="gray.300" />}
                  />
                  <Input
                    type="text"
                    placeholder="Search keywords here"
                    colorScheme="#5773ff"
                    focusBorderColor="#5773ff"
                    variant="filled"
                    onChange={handleChange}
                    required
                  />
                </InputGroup>
              </InputGroup>
            </Box>
          </form>

          {word.status === "idle" ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="70vh"
            >
              <Text>Start your journey by search in textbox</Text>
            </Box>
          ) : null}

          {word.loading && (
            <Box
              padding="6"
              display="flex"
              alignItems="center"
              justifyContent="center"
              height="80vh"
            >
              <Image
                src={"/loader.gif"}
                width={200}
                height={200}
                alt="loading"
              />
            </Box>
          )}

          {word.data && (
            <Box>
              <Box my={5}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <VStack spacing={2} alignItems="flex-start">
                    <Text
                      fontSize={["4xl", "5xl"]}
                      fontWeight="extrabold"
                      className={font.className}
                    >
                      {word?.data[0]?.word}
                    </Text>
                    <Text
                      color="#5773ff"
                      fontSize={["md", "lg"]}
                      fontWeight="bold"
                    >
                      {word?.data[0]?.phonetic}
                    </Text>
                  </VStack>

                  <Box>
                    <Box cursor="pointer" onClick={() => audioPlay()}>
                      <Image
                        src="/microphone.png"
                        width={80}
                        height={80}
                        alt="mic"
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Box my={2} display="flex" alignItems="center" gap={3}>
                <Text className={lobster.className} fontSize={["lg", "20px"]}>
                  noun
                </Text>

                <Box width="100%">
                  <Divider orientation="horizontal" />
                </Box>
              </Box>

              <Box my={8}>
                <Text fontSize={["md", "lg"]} color={textColor} my={3}>
                  Definitions
                </Text>

                <UnorderedList mx={8} color={definitionColor} spacing={2}>
                  {word?.data[0]?.meanings[0] &&
                    word?.data[0]?.meanings[0]?.definitions?.map(
                      (item, key) => (
                        <ListItem key={key}>{item.definition}</ListItem>
                      )
                    )}
                </UnorderedList>

                <Box>
                  <Box display="flex" alignItems="center" gap={5} my={5}>
                    <Text fontSize={["md", "lg"]} color={textColor}>
                      Synonyms
                    </Text>

                    <Box display="flex" gap={1} flexWrap="wrap">
                      {word?.data[0]?.meanings[0] &&
                        word?.data[0]?.meanings[0]?.synonyms?.map(
                          (item, key) => (
                            <Box key={key}>
                              <Text
                                color={"#5773ff"}
                                fontWeight="bold"
                                display="flex"
                              >
                                {item},
                              </Text>
                            </Box>
                          )
                        )}
                    </Box>
                  </Box>

                  <Box display="flex" alignItems="center" gap={5}>
                    <Text fontSize={["md", "lg"]} color={textColor}>
                      Antonyms
                    </Text>

                    <Box display="flex" gap={1}>
                      {word?.data[0]?.meanings[0] &&
                        word?.data[0]?.meanings[0]?.antonyms?.map(
                          (item, key) => (
                            <Box key={key}>
                              <Text
                                color={"#5773ff"}
                                fontWeight="bold"
                                display="flex"
                              >
                                {item},
                              </Text>
                            </Box>
                          )
                        )}
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Box my={2} display="flex" alignItems="center" gap={3}>
                <Text className={lobster.className} fontSize={["lg", "20px"]}>
                  verb
                </Text>

                <Box width="100%">
                  <Divider orientation="horizontal" />
                </Box>
              </Box>

              <Box my={8}>
                <Text fontSize={["md", "lg"]} color={textColor} my={3}>
                  Definitions
                </Text>

                <UnorderedList mx={8} color={definitionColor} spacing={2}>
                  {word?.data[0]?.meanings &&
                    word?.data[0]?.meanings[1]?.definitions?.map(
                      (item, key) => (
                        <Box key={key}>
                          <ListItem>{item.definition}</ListItem>
                          <Text color={"gray.500"}>{item.example}</Text>
                        </Box>
                      )
                    )}
                </UnorderedList>
              </Box>

              <Box width="100%">
                <Divider orientation="horizontal" />
              </Box>

              <Box p={2} maxW={["100%", "2xl"]} m="auto">
                <HStack spacing={3}>
                  <Text>Source</Text>
                  <Link href={word?.data ? word?.data[0]?.sourceUrls[0] : "/"}>
                    <Text textDecoration="underline">
                      {word?.data ? word?.data[0]?.sourceUrls[0] : ""}
                    </Text>
                  </Link>
                </HStack>
              </Box>
            </Box>
          )}

          {word.error && (
            <Alert status="error">
              <AlertIcon />
              {word.error.title}
            </Alert>
          )}
        </Box>
      </main>
    </>
  );
}
