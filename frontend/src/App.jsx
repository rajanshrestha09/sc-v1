import { ThemeProvider } from "./components/theme-provider";
import { Header } from "./components";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "./storeconfig/loginSlice";

function App() {
  const status = useSelector((state)=> state.login.status)
  const dispatch = useDispatch()
  async function fetchData(){
    dispatch(loginStart())
    try {
      const response = await fetch("/api/v1/users/current-user", {
      method: "GET",
      });
      const user = await response.json();
      if(user.statusCode === 200){
        dispatch(loginSuccess(user.data))
      }
      } catch (error) {
        dispatch(loginFailure())
      }
  }

  useEffect(() => {
   fetchData()
  }, [status]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Header />
      <Outlet />
    </ThemeProvider>
  );
}

export default App;
