import React, { useEffect } from "react";
import store from "./redux/configureStore";
import { ThemeProvider, styled } from "styled-components";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { Provider } from "react-redux";
import { GlobalStyle } from "./style/GlobalStyle";
import { defaultTheme } from "./style/theme";
import Board from "./components/Board";
import ControlBox from "./components/ControlBox";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 100px 0px;
`;

function App() {
  let persistor = persistStore(store);

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <GlobalStyle />
            <Container>
              <Board />
              <ControlBox />
            </Container>
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </>
  );
}

export default App;
