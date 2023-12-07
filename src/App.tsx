import { CssBaseline } from "@mui/material";

import { Toaster } from "sonner";
import Router from "./router";

const App = () => {
  return (
    <>
      <div className="p-0 m-0">
        <CssBaseline />
        <Toaster expand visibleToasts={9} />
        <Router />
      </div>
    </>
  );
};

export default App;
