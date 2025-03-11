import { createContext, useState } from "react";
import Layout from "./component/layout/Layout";
import {ToastContainer} from "react-toastify"
export const userContext = createContext();

function App() {
const [userData,setUserData] = useState();
  return <>
  <userContext.Provider value={{userData,setUserData}}>
    <ToastContainer autoClose={1900}/>
  <Layout/>
  </userContext.Provider>
  </>;
}

export default App;
