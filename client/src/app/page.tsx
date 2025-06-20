import Image from 'next/image';
import Link from 'next/link';
import { getUsers } from '@/lib/users';

const testAPIConnection = async () => {
  //const url = `${process.env.API_DOMAIN}/api/users`;
  //const res = await fetch(url, { cache: 'no-cache' });
  const users = await getUsers();
  console.log(users);
  return users;
};

const Home = async () => {
  const apiData = await testAPIConnection();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1>ParaAccess Reviews</h1>
        <Image
          className="icon-brand-color"
          alt="wheelchair logo"
          src="/wheelchair-logo.svg"
          width={100}
          height={100}
          priority
        />

        <div>
          <h2>Debug Section</h2>
          {apiData}
          <p>
            <Link href="/reviews">Reviews Page</Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Home;
