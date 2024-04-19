import AlbumList from "@/components/AlbumList";
import BackButton from "@/components/BackButton";
import BackGround from "@/components/Background";
import PostList from "@/components/PostList";
import { getAlbums, getPosts, getUser } from "@/lib/fetch";

export const revalidate = 60;

import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id;

  // fetch data
  const user = await getUser(id);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: user.username,
    description: `Detail for user ${user.name}`,
    openGraph: {
      images: ["/todos-background.jpg", ...previousImages],
    },
  };
}

export default async function Page({
  params,
}: Readonly<{
  params: { id: string };
}>) {
  const userData = await getUser(params.id);
  const postData = await getPosts(params.id);
  const albumData = await getAlbums(params.id);
  return (
    <div className="h-screen overflow-hidden !text-white">
      <BackGround />
      <main className="z-1 flex h-full flex-grow flex-col justify-between bg-gray-500 bg-opacity-60 backdrop-filter dark:bg-gray-900 dark:bg-opacity-60">
        <section className="h-[10vh] flex justify-center items-center border-b">
          <div className="text-4xl font-bold">User: {userData.username}</div>
        </section>
        <section className="flex flex-grow flex-col gap-4 items-center py-2 px-[2vh] sm:px-[9vh]">
          <BackButton />
          <PostList data={postData} userId={params.id} />
          <AlbumList data={albumData} userId={params.id} />
        </section>
      </main>
    </div>
  );
}
