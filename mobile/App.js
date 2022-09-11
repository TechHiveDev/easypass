import { Provider } from "react-redux";
import store from "./src/Store/app.store";
import AppNavigator from "./src/Navigators/App.navigator";

// ==============================================================

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
