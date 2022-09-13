import MainView from "./components/main-view/main-view";
import Container from "react-bootstrap/Container";
import Provider from "react-redux";
import store from "./store";

function App() {
  return (
    <Container>
      <Provider store={store}>
        <MainView />
      </Provider>
    </Container>
  );
}

export default App;
