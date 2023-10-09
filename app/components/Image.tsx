import React from "react";
import NextImage from "next/image";
type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

function Image({ src, alt, width, height }: Props) {
  return (
    <>
      <NextImage src={src} alt={alt} width={width} height={width} />
    </>
  );
}

export default Image;
