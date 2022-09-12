import { FieldPath } from "react-hook-form";

declare namespace ErrorModel {
  /**
   * Responses
   */
  export interface Base<T> {
    message: string;
    field?: FieldPath<T>;
  }

  export interface Response<T = undefined> {
    errors: Base<T>[];
  }
}

export { ErrorModel };
