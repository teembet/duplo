import { ReactNode, useLayoutEffect } from "react";
import { useAppStorage } from "@/hooks";
import useAuthentication from "@/store/authentication";
import { AuthenticationState } from "@/store/authentication/types";
import { isEmpty } from "lodash";

/** Determine if token has expired */
// export const isTokenExpired = (token: string): boolean => {
// 	const decodedToken: JwtPayload = jwtDecode(token);
// 	return !decodedToken || decodedToken.exp * 1000 < Date.now();
// };
/** Setup the provider to house `{children}` */
const AuthenticationChecker = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [store, { resetAuthentication }] = useAuthentication();
  const { isAuthenticated } = store;
  const { getFromStore } = useAppStorage();

  /** Run async check for admin user data */
  const checkAdminUserValidity = async () => {
    const data = await getFromStore("authentication");
    // Get state from store
    const { authentication = {} } = (data && JSON.parse(data)) ?? {};
    const { token = "", user } = authentication as AuthenticationState;
    // If token exists and token is not expired, continue the session
    if (isEmpty(user)) {
      resetAuthentication();
    }
  };

  // Check admin user validity
  useLayoutEffect(() => {
    checkAdminUserValidity();
  }, []);

  return <>{children}</>;
};

export default AuthenticationChecker;
