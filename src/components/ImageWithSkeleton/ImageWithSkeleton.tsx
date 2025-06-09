import React, { useState } from "react";
import styles from "./ImageWithSkeleton.module.css";

export default function ImageWithSkeleton({
  src,
  alt,
  ...rest
}: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={styles.wrapper}>
      {!loaded && <div className={styles.skeleton} />}
      <img
        src={src}
        alt={alt}
        className={styles.img}
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.4s",
        }}
        onLoad={() => setLoaded(true)}
        {...rest}
      />
    </div>
  );
}
