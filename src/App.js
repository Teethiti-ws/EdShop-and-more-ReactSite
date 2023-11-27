// import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import AboutPage from "./pages/AboutPage";
import ProductPage from "./pages/ProductPage";
import DetailPage from "./pages/DetailPage";
import HospitalPage from "./pages/hospital/HospitalPage";

import { QueryClient, QueryClientProvider } from "react-query";
import CreatePage from "./pages/category/CreatePage";
import EditPage from "./pages/category/EditPage";
import IndexPage from "./pages/category/IndexPage";

// Notify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UploadPicture from "./pages/UploadPicture";
import MemberPage from "./pages/MemberPage";
import PrivateRoute from "./guard/auth";
import UserStoreProvider from "./context/UserContext";

// redux setup
import { Provider } from "react-redux";
import CartPage from "./pages/CartPage";
import configureStore from "./redux/configureStore";
import PdfReport from "./pages/report/PdfReport";
import ChartReport from "./pages/report/ChartReport";

// const store = createStore(rootReducer);
// redux persist
const { store } = configureStore();

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <UserStoreProvider>
        <QueryClientProvider client={queryClient}>
          <ToastContainer />

          <BrowserRouter>
            <NavBar />
            <Switch>
              <Route exact path="/">
                <Homepage />
              </Route>
              <Route path="/about">
                <AboutPage />
              </Route>
              <Route path="/product">
                <ProductPage />
              </Route>
              {/* FIXME */}
              {/* <Route path="/detail/:id/title/:title"> */}
              <Route path="/detail/:id/:title">
                <DetailPage />
              </Route>
              <Route path="/hospital">
                <HospitalPage />
              </Route>
              <Route path="/upload">
                <UploadPicture />
              </Route>
              <Route path="/cart">
                <CartPage />
              </Route>
              <PrivateRoute path="/member">
                <MemberPage />
              </PrivateRoute>
              <Route path="/login">
                <LoginPage />
              </Route>
              <Route path="/register">
                <RegisterPage />
              </Route>
              <Route path="/pdf">
                <PdfReport />
              </Route>
              <Route path="/chart">
                <ChartReport />
              </Route>
              <Route
                path="/category"
                render={({ match: { url } }) => (
                  <>
                    <Route path={`${url}/`} exact>
                      <IndexPage />
                    </Route>
                    <Route path={`${url}/create`}>
                      <CreatePage />
                    </Route>
                    <Route path={`${url}/edit/:id`}>
                      <EditPage />
                    </Route>
                  </>
                )}
              ></Route>
            </Switch>
            <Footer />
          </BrowserRouter>
        </QueryClientProvider>
      </UserStoreProvider>
    </Provider>
  );
}

export default App;
