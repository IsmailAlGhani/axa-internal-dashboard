"use client";

import { useRouter } from "next/navigation";
import { IoArrowBackCircle } from "react-icons/io5";

function BackButton() {
  const router = useRouter();
  return (
    <div className="flex w-full justify-start">
      <IoArrowBackCircle className="w-8 h-8" onClick={() => router.back()} />
    </div>
  );
}

export default BackButton;
