import Image from "next/image";
import React from "react";

export default function BackGround(): React.JSX.Element {
  return (
    <div className="absolute z-[-1] flex h-screen w-full flex-col items-center justify-center">
      <Image
        src={`/todos-background.jpg`}
        alt="Background"
        fill
        className="object-cover"
      />
    </div>
  );
}
