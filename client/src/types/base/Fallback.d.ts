import { SWRConfiguration } from "swr";

declare namespace FallbackModel {
  /**
   * Fallback for GetInitialProps
   */
  export interface Values {
    fallback: Fallback;
  }

  type Fallback = {
    [key: string]: { data: any };
  };
}

export { FallbackModel };
