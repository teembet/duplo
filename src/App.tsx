import { AppRouting } from "@/components";
import { AppContext } from "@/contexts";
import { StrictMode } from "react";
import { RecoilRoot } from "recoil";
const App = (): React.ReactElement => {
  return (
    <StrictMode>
      <RecoilRoot>
        <AppContext>
          <AppRouting />
        </AppContext>
      </RecoilRoot>
    </StrictMode>
  );
};

export default App;
