import BackButton from "@/components/BackButton";
import BackGround from "@/components/Background";
import { getPhotos } from "@/lib/fetch";
import Image from "next/image";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { albumId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.albumId;

  // fetch data
  const album = await getPhotos(id);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `Album ${album.albums.title} Photo List`,
    description: `Album ${album.albums.title} with Photo List`,
    openGraph: {
      images: ["/todos-background.jpg", ...previousImages],
    },
  };
}

export default async function Page({
  params,
}: Readonly<{
  params: { albumId: string };
}>) {
  const photoData = await getPhotos(params.albumId);
  return (
    <div className="h-screen overflow-hidden !text-white">
      <BackGround />
      <main className="z-1 flex h-full flex-grow flex-col justify-between bg-gray-500 bg-opacity-60 backdrop-filter dark:bg-gray-900 dark:bg-opacity-60">
        <section className="h-[10vh] flex justify-center items-center border-b">
          <div className="text-2xl font-bold">
            Album: {photoData.albums.title}
          </div>
        </section>
        <section className="flex relative flex-grow flex-col gap-4 items-center overflow-y-auto scrollbar-none py-2 px-[2vh] sm:px-[9vh]">
          <div className="z-10 sticky flex w-full justify-start top-0 left-0">
            <BackButton />
          </div>
          <div className="columns-2 w-full md:columns-3 lg:columns-4">
            {photoData.photos.map((photo) => (
              <div key={photo.id} className="!w-full !h-80 relative mb-4">
                <Image
                  src={photo.url}
                  alt={photo.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="!rounded-lg"
                  style={{
                    objectFit: "cover",
                  }}
                  loading="lazy"
                />
                <div className="absolute rounded bg-[#ced4da] opacity-40 px-2 hover:opacity-100 right-3 bottom-3 left-3">
                  <p className="!text-wrap text-sm text-black">{photo.title}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
