import { FC, Suspense } from "react";
import { Outlet } from "react-router-dom";

import { CircularProgress } from "@mui/material";

interface RootLayoutProps {}

const RootLayout: FC<RootLayoutProps> = () => {
  return (
    <div>
      <Suspense fallback={<CircularProgress />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default RootLayout;
