import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import PageNotFound from "@/components/reuseables/Misc/PageNotFound";
import useAuthentication from "@/store/authentication";
import routerRoutes from "@/components/router/routes/index.routes";
import { RouteSignal } from "@/components/router/types";
/** Application Router Component */
const AppRouter = (): JSX.Element => {
  const [store] = useAuthentication();
  const { isAuthenticated } = store;

  const getPermissibleRoutes = () => {
    const publicRoutes = routerRoutes.find(
      ({ id }) => id === RouteSignal.PUBLIC
    );
    console.log(publicRoutes);
    // if (!isAuthenticated) {
    //   return [publicRoutes];
    // }
    const privateRoutes = routerRoutes.find(
      ({ id }) => id === RouteSignal.PRIVATE
    );

    return [publicRoutes, privateRoutes] as RouteObject[];
  };
  const t = getPermissibleRoutes();
  console.log(t, "t");
  return (
    <RouterProvider
      router={createBrowserRouter([
        ...getPermissibleRoutes(),
        {
          path: "*",
          element: <PageNotFound />,
          id: "404",
        },
      ])}
    />
  );
};

export default AppRouter;
