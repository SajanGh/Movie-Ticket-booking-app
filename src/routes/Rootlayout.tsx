import { FC, Suspense } from "react";
import { Outlet } from "react-router-dom";

import { LinearProgress } from "@mui/material";

interface RootLayoutProps {}

const RootLayout: FC<RootLayoutProps> = () => {
  return (
    <div>
      <div className="container flex">
        Hello
      </div>
      <Suspense fallback={<LinearProgress />}>
        <div>
          <Outlet />
        </div>
      </Suspense>
    </div>
  );
};

export default RootLayout;
