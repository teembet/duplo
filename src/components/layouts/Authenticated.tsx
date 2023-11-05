import { Suspense, lazy, useState } from "react";
import { Stack } from "@mui/material";
import useDeviceType from "@/hooks/useDeviceType";
import useRouterLocationListener from "@/hooks/useLocationListener";

import SkeletonLoader from "../reuseables/Page/SkeletonLoader";

const Navigation = lazy(
  () => import("@/components/reuseables/Page/Navigation")
);
const Header = lazy(() => import("@/components/reuseables/Page/Header"));

/** Authenticated routes use this layout */
const Authenticated = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  // Setup router listener
  useRouterLocationListener();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isMobile } = useDeviceType();

  return (
    <div className="min-h-screen flex flex-row items-start justify-start bg-gray-background">
      <Suspense
        fallback={
          !isMobile && (
            <Stack
              gap={6}
              px={2.5}
              py={4}
              sx={{ width: "100%", maxWidth: "200px" }}
            >
              <SkeletonLoader variant="rectangular" width="100%" height={100} />
              {Array.from(Array(6).keys()).map((item) => (
                <SkeletonLoader
                  key={item}
                  variant="rectangular"
                  width="100%"
                  height={40}
                />
              ))}
            </Stack>
          )
        }
      >
        <Navigation sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </Suspense>

      <div className="flex-grow min-h-screen flex flex-col !min-w-0">
        <Suspense
          fallback={
            <Stack px={2.5} py={2}>
              <SkeletonLoader
                variant="rectangular"
                height={60}
                sx={{ width: "100%" }}
              />
            </Stack>
          }
        >
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </Suspense>
        <Suspense
          fallback={
            <Stack
              px={2.5}
              py={4}
              sx={{ display: "flex", alignItems: "center", height: "100vh" }}
            >
              <SkeletonLoader
                variant="rectangular"
                height={200}
                sx={{ width: "100%", height: "100%" }}
              />
            </Stack>
          }
        >
          <div className="px-2 py-0 lg:px-0 lg:!pr-4">{children}</div>
        </Suspense>
        <footer className="mt-auto bg-transparent" />
      </div>
    </div>
  );
};

export default Authenticated;
