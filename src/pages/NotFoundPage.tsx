import { Typography } from "@mui/material";

import { useRouteError } from "react-router-dom";

interface RouteError {
  statusText?: string;
  message?: string;
}

const NotFoundPage: React.FC = () => {
  const error = useRouteError() as RouteError;
  console.log(error);
  return (
    <div className="flex  flex-col items-center justify-center">
      <Typography variant="h1">Oops!</Typography>
      <Typography variant="h5">
        Sorry, an unexpected error has occured
      </Typography>

      <Typography>
        <i>{error.statusText || error.message}</i>
      </Typography>
    </div>
  );
};

export default NotFoundPage;
