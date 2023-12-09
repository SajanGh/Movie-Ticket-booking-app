import { FC, Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { CircularProgress } from "@mui/material";
import Navbar from "../components/Navbar";
import MovieSlider from "../components/MovieSlider";

interface RootLayoutProps {}

const RootLayout: FC<RootLayoutProps> = () => {
  const location = useLocation();

  return (
    <div>
      <div>
        <Navbar />
        {location.pathname === "/" && <MovieSlider />}
      </div>
      <div>
        <Suspense fallback={<CircularProgress />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default RootLayout;
