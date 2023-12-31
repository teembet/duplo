declare module "*.svg" {
  import * as React from "react";

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const content: any;
  export default content;
}
