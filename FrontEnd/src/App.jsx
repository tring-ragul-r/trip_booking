import { createContext, useState } from "react";
import Layout from "./component/layout/Layout";

export const userContext = createContext();

function App() {
const [userData,setUserData] = useState();
  return <>
  <userContext.Provider value={{userData,setUserData}}>
  <Layout/>
  </userContext.Provider>
  </>;
}

export default App;
