import React from "react";
import { ITypographyProps } from "./TypographyType";

const Typography: React.FC<ITypographyProps> = ({
  as = "p",
  className,
  children,
  ...remProps
}) => {
  return (
    <>
      {as === "h1" && (
        <h1 className={[className].join(" ")} {...remProps}>
          {children}
        </h1>
      )}
      {as === "h2" && (
        <h2 className={[className].join(" ")} {...remProps}>
          {children}
        </h2>
      )}
      {as === "h3" && (
        <h3 className={[className].join(" ")} {...remProps}>
          {children}
        </h3>
      )}
      {as === "h4" && (
        <h4 className={[className].join(" ")} {...remProps}>
          {children}
        </h4>
      )}
      {as === "h5" && (
        <h5 className={[className].join(" ")} {...remProps}>
          {children}
        </h5>
      )}
      {as === "h6" && (
        <h6 className={[className].join(" ")} {...remProps}>
          {children}
        </h6>
      )}
      {as === "p" && (
        <p className={[className].join(" ")} {...remProps}>
          {children}
        </p>
      )}
      {as === "span" && (
        <span className={[className].join(" ")} {...remProps}>
          {children}
        </span>
      )}
    </>
  );
};

export default Typography;
