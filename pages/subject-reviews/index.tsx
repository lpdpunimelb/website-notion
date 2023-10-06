import Head from "next/head";
import Link from "next/link";

export async function getStaticProps() {
  const res = await fetch(process.env.subjectReviewsGappsScriptUrl);
  const faculties = await res.json();

  return {
    props: {
      faculties,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 3600, // In seconds
  };
}

export default function SubjectReviewsHome({ faculties }) {
  return (
    <div className="h-screen flex flex-col divide-y">
      <Head>
        <title>Subject Reviews | LPDP Unimelb</title>
      </Head>
      <div className="flex-1 overflow-auto">
        <div className="container m-auto max-w-6xl">
          <div className="py-5 xl:px-0 px-3">
            <div className="flex flex-row divide-x gap-4 items-center">
              <img src="/luna.png" width={56}></img>
              <h1 className="text-xl font-heading pl-4">Subject Reviews</h1>
            </div>
          </div>
        </div>
        <div className="my-5 container m-auto max-w-6xl xl:px-0 px-3">
          <h1 className="font-heading text-3xl">Welcome!</h1>
          <div className="mt-2">
            Pick a faculty to see what other students are thinking about.
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {Object.keys(faculties).map((slug) => (
              <Link href={`/subject-reviews/${slug}`} key={slug}>
                <div className="px-3 py-5 rounded bg-sky-600 text-white">
                  {faculties[slug]}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
