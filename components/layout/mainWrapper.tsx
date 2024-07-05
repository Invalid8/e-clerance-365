import { cn } from "@/lib";

export default function MainWrapper({
  children,
  className,
  disableCustomBar,
}: {
  children?: React.ReactNode;
  className?: string;
  disableCustomBar?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 p-4 pb-6 md:p-6  w-full h-full overflow-auto",
        "custom-scroll-bar",
        disableCustomBar && className
      )}
      id="main-wrapper"
    >
      {children}
    </div>
  );
}
