declare namespace FilterModel {
  /**
   * Options for select filter
   */
  export type Option = {
    label: string;
    value: string;
  };

  /**
   * Options object
   */
  export type Options = {
    label: string;
    items: Option[];
  };

  /**
   * Filter items
   */
  export type Items = {
    [key: string]: any;
  };
}

export { FilterModel };
