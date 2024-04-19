"use client";

import { AlbumType } from "@/lib/types";
import React from "react";
import { useRouter } from "next/navigation";

function AlbumList({ data, userId }: { data: AlbumType[]; userId: string }) {
  const router = useRouter();
  return (
    <div className="flex flex-col w-full gap-2">
      <p className="text-2xl font-bold uppercase">Album List</p>
      <div className="flex gap-4 py-2 overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-500">
        {data.map((album) => (
          <div
            key={album.id}
            className="flex justify-center items-center min-w-max p-2 bg-slate-900 rounded-xl"
            onClick={() => router.push(`/user/${userId}/album/${album.id}`)}
          >
            {album.title}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AlbumList;
