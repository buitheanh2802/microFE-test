import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
const Package1 = React.lazy(() => import("./app"));
const Package4 = React.lazy(() => import("package4/app"));

const configurations = () => {
  const element = document.querySelector("#root");
  if (!element) return;
  const root = createRoot(element);
  // console.log(App);
  root.render(
    <React.Fragment>
      <React.Suspense fallback="loading...">
        <Package1 />
      </React.Suspense>
      <React.Suspense fallback="loading...">
        <Package4 />
      </React.Suspense>
    </React.Fragment>
  );
};

// init app;
configurations();

export default configurations;
