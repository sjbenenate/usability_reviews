import Image from 'next/image';

const testAPIConnection = async () => {
  const url = `${process.env.API_DOMAIN}/api/users`;
  const res = await fetch(url, { cache: 'no-cache' });
  console.log(res);
  const data = await res.json();
  console.log(data);
  return data;
};

const Home = async () => {
  const apiData = await testAPIConnection();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1>ParaAccess Reviews</h1>
        <Image
          className="logo-color"
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
            <a href="/reviews">Reviews Page</a>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Home;
