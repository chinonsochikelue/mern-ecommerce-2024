import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}) {
  return (
    <div
      className={cn(
        "rounded-md bg-gradient-to-r from-muted via-muted-foreground/20 to-muted animate-shimmer bg-[length:200%_100%]",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton }
