import "@/styles/globals.css";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const styles = {
  global: (props) => ({
    body: {
      bg: mode("#fefefe", "#1d1d1d")(props),
    },
    "*::placeholder": {
      color: mode("gray.500", "whiteAlpha.400")(props),
      fontSize: "14px",
    },
  }),
};

const theme = extendTheme({ styles });

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ChakraProvider>
  );
}
