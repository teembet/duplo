import { AppRouting } from "@/components";
import { AppContext } from "@/contexts";
import { StrictMode, Suspense } from "react";
import { RecoilRoot } from "recoil";
import './index.scss';
import SuspenseLoader from "./components/reuseables/Misc/SuspenseLoader";
const App = (): React.ReactElement => {
  return (
    <StrictMode>
      <RecoilRoot>
        <Suspense fallback={<SuspenseLoader />}>
        <AppContext>
          <AppRouting />
        </AppContext>
        </Suspense>
      </RecoilRoot>
    </StrictMode>
  );
};

export default App;
