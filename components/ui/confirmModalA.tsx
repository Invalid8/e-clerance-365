import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { ReactElement, ReactNode } from "react";

import { cn } from "@/lib";

type btnProps = {
  className?: string;
  func?: (e?: any) => void;
  text?: string | ReactElement | ReactNode | ReactElement[] | ReactNode[];
  loading?: boolean;
};

const ConfirmModalA = ({
  isOpen,
  onClose,
  btnOrderByClose,
  confirm,
  cancel,
  title,
  btnContainerClassName,
  size,
  placement,
  className,
  name,
  children,
}: {
  isOpen: boolean;
  onClose: (value?: any) => any;
  btnOrderByClose?: boolean;
  confirm?: btnProps;
  cancel?: btnProps;
  title?: string;
  btnContainerClassName?: string;
  className?: string;
  name?: string;
  children?: string | ReactElement | ReactNode | ReactElement[] | ReactNode[];
  size?:
    | "xl"
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "full"
    | undefined;
  placement?:
    | "center"
    | "auto"
    | "top"
    | "top-center"
    | "bottom"
    | "bottom-center"
    | undefined;
}) => {
  return (
    <Modal
      className={cn("p-4 sm:p-6 md:p-8", className)}
      id={name ? name : `modal-a-${Date.now()}`}
      isOpen={isOpen}
      placement={placement ? placement : "center"}
      scrollBehavior="inside"
      size={size ? size : "lg"}
      onClose={onClose}
    >
      <ModalContent>
        {(onClose) => (
          <div className="fiv">
            {title && (
              <ModalBody>
                <p className="text-center font-[16px]">{title}</p>
              </ModalBody>
            )}
            <ModalFooter>
              {children
                ? children
                : confirm &&
                  cancel && (
                    <div
                      className={cn(
                        "flex w-full justify-center gap-3",
                        !btnOrderByClose && "flex-row-reverse",
                        btnContainerClassName
                      )}
                    >
                      <Button
                        className={cn(
                          "bg-primary-500 text-white rounded-sm",
                          confirm.className
                        )}
                        isLoading={confirm.loading}
                        onPress={confirm.func}
                      >
                        {confirm.text ? confirm.text : "Comfirm"}
                      </Button>
                      <Button
                        className={cn("rounded-sm", confirm.className)}
                        onPress={cancel.func || onClose}
                      >
                        {cancel.text ? cancel.text : "Cancel"}
                      </Button>
                    </div>
                  )}
            </ModalFooter>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ConfirmModalA;
