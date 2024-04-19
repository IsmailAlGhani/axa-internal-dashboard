import BackButton from "@/components/BackButton";
import BackGround from "@/components/Background";
import CommentList from "@/components/CommentList";
import { getComments } from "@/lib/fetch";

export default async function Page({
  params,
}: Readonly<{
  params: { postId: string };
}>) {
  const commentData = await getComments(params.postId);
  return (
    <div className="h-screen overflow-hidden !text-white">
      <BackGround />
      <main className="z-1 flex h-full flex-grow flex-col justify-between bg-gray-500 bg-opacity-60 backdrop-filter dark:bg-gray-900 dark:bg-opacity-60">
        <section className="h-[10vh] flex justify-center items-center border-b">
          <div className="text-2xl font-bold">
            Album: {commentData.post.title}
          </div>
        </section>
        <section className="flex relative flex-grow flex-col gap-4 items-center overflow-y-auto scrollbar-none py-2 px-[2vh] sm:px-[9vh]">
          <div className="z-10 sticky flex w-full justify-start top-0 left-0">
            <BackButton />
          </div>
          <CommentList
            dataComment={commentData.comments}
            dataPost={commentData.post}
          />
        </section>
      </main>
    </div>
  );
}
