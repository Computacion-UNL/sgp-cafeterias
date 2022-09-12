import {
  CheckIcon,
  CloudUploadIcon,
  InformationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/outline";
import { formatBytes } from "@lib";
import classNames from "classnames";
import {
  ChangeEventHandler,
  FC,
  Fragment,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import { useController, UseControllerProps } from "react-hook-form";
import PerfectScrollbar from "react-perfect-scrollbar";

export type DropzoneFieldProps<TFormValues> = UseControllerProps<TFormValues> &
  DropzoneProps & {};

export type DropzoneFieldComponent = <TFormValues>(
  props: DropzoneFieldProps<TFormValues>
) => React.ReactElement;

export const DropzoneField: DropzoneFieldComponent = (props) => {
  const {
    name,
    control,
    defaultValue,
    rules,
    shouldUnregister,
    multiple = true,
    ...rest
  } = props;

  const {
    field: { onChange, ref, value, ...field },
  } = useController({
    name,
    control,
    defaultValue,
    rules,
    shouldUnregister,
  });

  return (
    <Dropzone
      {...rest}
      multiple={multiple}
      onChange={(e) => {
        onChange(multiple ? e.target.files : e.target.files?.[0]);
      }}
      value={
        (multiple
          ? Array.from(value as DropzoneFilePreview[])
          : value
          ? [value]
          : undefined) as DropzoneFilePreview[]
      }
      {...field}
    />
  );
};

export interface DropzoneProps extends DropzoneOptions {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: DropzoneFilePreview[];
  helperText?: React.ReactNode;
}

export interface DropzoneFilePreview extends File {
  preview: string;
}

export const Dropzone: FC<DropzoneProps> = (props) => {
  const { onChange, value, helperText, ...rest } = props;

  const [files, setFiles] = useState<DropzoneFilePreview[]>([]);

  const {
    isDragActive,
    isDragAccept,
    isDragReject,
    getRootProps,
    getInputProps,
  } = useDropzone({
    useFsAccessApi: false,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      );
    },
    ...rest,
  });

  const thumbs = files.map((file) => (
    <div key={file.name} className="p-4">
      <img
        className="max-w-full w-full h-full object-cover rounded-md"
        src={file.preview}
        alt={file.name}
        loading="lazy"
      />
    </div>
  ));

  useEffect(() => {
    if (value) {
      setFiles(
        value.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      );
    }
  }, [value]);

  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    // eslint-disable-next-line
    [value]
  );

  return (
    <Fragment>
      <div>
        <div
          {...getRootProps({
            className: "dropzone relative flex flex-col outline-none",
          })}
        >
          <input {...getInputProps({ onChange })} />

          <div className="py-12 px-4 cursor-pointer transition-all ease-in-out delay-200 text-center text-neutral flex items-center justify-center flex-col border-dashed border-2 border-gray-400 rounded-lg bg-base-200 hover:border-primary hover:text-base-content">
            {isDragAccept && (
              <div>
                <DropzoneIcon className="text-success">
                  <CheckIcon />
                </DropzoneIcon>

                <span>¡Todos los archivos serán subidos!</span>
              </div>
            )}
            {isDragReject && (
              <div>
                <DropzoneIcon className="text-error">
                  <XCircleIcon />
                </DropzoneIcon>
                <span>¡Algunos archivos no serán aceptados!</span>
              </div>
            )}
            {!isDragActive && (
              <div>
                <DropzoneIcon className="text-primary">
                  <CloudUploadIcon />
                </DropzoneIcon>

                <span>
                  Arrastra y suelta archivos aquí{" "}
                  <span>({helperText || "Cualquier tipo de archivo"})</span>
                  {rest.maxSize && rest.maxSize !== Infinity && (
                    <span> (Tamaño max.: {formatBytes(rest.maxSize)})</span>
                  )}
                </span>
              </div>
            )}

            <p>o</p>

            <button type="button" className="btn btn-primary">
              Buscar Archivos
            </button>
          </div>
        </div>
      </div>

      <div className="py-3 px-5 mt-2 bg-base-100">
        <p className="font-bold">Archivos subidos</p>

        {files.length <= 0 && (
          <p className="text-neutral text-xs">
            ¡Los archivos cargados aparecerán aquí!
          </p>
        )}

        {files.length > 0 && (
          <div>
            <div className="alert alert-success shadow-lg">
              <div>
                <InformationCircleIcon className="stroke-current flex-shrink-0 h-6 w-6" />
                <span>
                  ¡Has subido <b>{thumbs.length}</b>{" "}
                  {thumbs.length !== 1 ? "archivos" : "archivo"}!
                </span>
              </div>
            </div>

            <div className="w-28 h-28">
              <PerfectScrollbar>{thumbs}</PerfectScrollbar>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export const DropzoneIcon = (
  props: PropsWithChildren<{ className?: string }>
) => {
  const { children, className } = props;

  return (
    <div
      className={classNames(
        "h-20 w-20 mx-auto items-center justify-center border-none mb-4 transition-all ease-in-out delay-200 scale-100 shadow-sm rounded-full hover:scale-110",
        className
      )}
    >
      {children}
    </div>
  );
};
