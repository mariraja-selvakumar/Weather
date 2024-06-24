import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import CustomLoader from "./components/CustomLoader";
import "./App.css";

const Weather = lazy(() => import("./pages/weather/Weather"));

const App = () => (
  <Suspense fallback={<CustomLoader />}>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Weather />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </Suspense>
);

export default App;
