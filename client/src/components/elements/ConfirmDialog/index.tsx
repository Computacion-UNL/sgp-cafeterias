import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";

export interface ConfirmDialogProps<T> {
  buttonComponent: React.ComponentType<T> | React.ForwardRefExoticComponent<T>;
  buttonProps: React.ComponentProps<ConfirmDialogProps<T>["buttonComponent"]>;
  children: React.ReactNode;
  disagreeText?: string;
  agreeText?: string;
  title: string;
  content: React.ReactNode;
  onConfirm?: Function;
  formId?: string;
}

export const ConfirmDialog = <T,>(props: ConfirmDialogProps<T>) => {
  const {
    buttonComponent: ButtonComponent,
    buttonProps,
    children,
    disagreeText,
    agreeText,
    title,
    content,
    onConfirm,
    formId,
  } = props;

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = () => {
    if (onConfirm) onConfirm();
    handleClose();
  };

  return (
    <Fragment>
      <ButtonComponent {...buttonProps} onClick={handleClickOpen}>
        {children}
      </ButtonComponent>

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
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all prose">
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
                    {content}
                  </Dialog.Description>

                  <div className="mt-4 flex gap-2">
                    <button
                      type="button"
                      className="btn btn-ghost ml-auto"
                      onClick={handleClose}
                    >
                      {disagreeText}
                    </button>

                    <button
                      autoFocus
                      type="submit"
                      className="btn btn-primary"
                      onClick={onSubmit}
                      form={formId}
                    >
                      {agreeText}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </Fragment>
  );
};

ConfirmDialog.defaultProps = {
  disagreeText: "Cancelar",
  agreeText: "Confirmar",
};
