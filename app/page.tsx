import BackGround from "@/components/Background";
import UserList from "@/components/UserList";
import { getUsers } from "@/lib/fetch";

export default async function Page() {
  const usersData = await getUsers();
  return (
    <div className="h-screen overflow-hidden !text-white">
      <BackGround />
      <main className="z-1 flex h-full flex-grow flex-col justify-between bg-gray-500 bg-opacity-60 backdrop-filter dark:bg-gray-900 dark:bg-opacity-60">
        <section className="h-[10vh] flex justify-center items-center border-b">
          <div className="text-4xl font-bold">Users</div>
        </section>
        <section className="flex flex-grow flex-col items-center px-[2vh] sm:px-[9vh]">
          <UserList data={usersData} />
        </section>
      </main>
    </div>
  );
}
