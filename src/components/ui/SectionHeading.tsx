import type { ReactNode } from "react";

type Props = {
  eyebrow?: ReactNode;
  title: ReactNode;
  id?: string;
  as?: "h1" | "h2";
  align?: "start" | "center";
  /** Light text for dark (indigo) sections. */
  tone?: "default" | "inverse";
  className?: string;
  size?: "md" | "lg";
};

/** Eyebrow + display heading pair used at the top of most sections. */
export function SectionHeading({
  eyebrow,
  title,
  id,
  as: Tag = "h2",
  align = "start",
  tone = "default",
  size = "lg",
  className = "",
}: Props) {
  const sizes =
    size === "lg"
      ? "text-[34px] min-[480px]:text-[38px] md:text-[54px] xl:text-[58px]"
      : "text-[32px] min-[480px]:text-[36px] md:text-[44px]";
  return (
    <div
      className={`flex flex-col gap-1 md:gap-2 ${align === "center" ? "items-center text-center" : ""} ${className}`}
    >
      {eyebrow ? (
        <p className={`eyebrow m-0 ${tone === "inverse" ? "!text-marigold" : ""}`}>{eyebrow}</p>
      ) : null}
      <Tag
        id={id}
        className={`m-0 font-display font-normal leading-[1.06] ${sizes} ${
          tone === "inverse" ? "text-ivory" : "text-indigo"
        }`}
      >
        {title}
      </Tag>
    </div>
  );
}
