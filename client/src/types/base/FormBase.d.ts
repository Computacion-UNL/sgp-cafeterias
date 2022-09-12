declare namespace IFormBase {
  export type Dialog<T = {}> = T & {
    handleClose: () => void;
  };

  export type Step = {
    handleNext: () => void;
    handleBack: () => void;
  };
}

export { IFormBase };
