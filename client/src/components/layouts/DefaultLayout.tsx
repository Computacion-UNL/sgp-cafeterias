import { PropsWithChildren } from "react";

export const DefaultLayout = (props: PropsWithChildren) => {
  return (
    <div className="h-full">
      <div className="min-h-full flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl w-full space-y-8">
          <div className="hero">
            <div className="hero-content flex-col lg:flex-row-reverse">
              {props.children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
