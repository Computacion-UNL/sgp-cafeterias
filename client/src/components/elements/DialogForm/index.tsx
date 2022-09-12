import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";

export interface DialogFormProps<T> {
  buttonComponent: React.ComponentType<T> | React.ForwardRefExoticComponent<T>;
  buttonProps: React.ComponentProps<DialogFormProps<T>["buttonComponent"]>;
  children: (handleClose: () => void) => React.ReactNode;
  title?: string;
  subtitle?: string;
}
export const DialogForm = <T,>(props: DialogFormProps<T>) => {
  const {
    buttonComponent: ButtonComponent,
    buttonProps,
    children,
    title,
    subtitle,
  } = props;

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Fragment>
      <ButtonComponent {...buttonProps} onClick={handleClickOpen} />
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all prose">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-extrabold leading-6 text-gray-900"
                  >
                    {title}
                  </Dialog.Title>
                  <Dialog.Description
                    as="p"
                    className="text-base-content/70 text-sm"
                  >
                    {subtitle}
                  </Dialog.Description>
                  <div className="mt-2">{children(handleClose)}</div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </Fragment>
  );
};
