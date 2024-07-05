import { siteConfig } from "@/config/site";
import { cn } from "@/lib";
const Logo = ({
  color,
  className,
}: {
  color?: "auto" | "white" | "black" | "default";
  className?: string;
}) => {
  if (!color) color = "default";

  // let style = "";

  // function cStyle(color?: "auto" | "white" | "black" | "default") {
  //   switch (color) {
  //     case "auto":
  //       return (style = "brightness-0 dark:invert");

  //     case "white":
  //       return (style = "brightness-0 invert");

  //     case "black":
  //       return (style = "brightness-0 ");

  //     default:
  //       return (style = "");
  //   }
  // }

  return (
    <h4
      className={cn(
        "min-h-[32px] font-bold tracking-tighter flex gap-2 items-center",
        className
      )}
    >
      <span>{siteConfig.name}</span>
    </h4>
  );
};

export default Logo;
