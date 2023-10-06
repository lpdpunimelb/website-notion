import React, { useMemo, useState } from "react";
import SubjectReviews from "../../components/SubjectReviews";
import Link from "next/link";

const FACULTIES = [
  "architecture-building-and-planning",
  "arts",
  "business-and-economics",
  "education",
  "engineering-and-information-technology",
  "fine-arts-and-music",
  "law",
  "medicine-dentistry-and-health-sciences",
  "science",
];

export async function getStaticPaths() {
  return {
    paths: FACULTIES.map((facultySlug) => ({ params: { facultySlug } })),
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const facultySlug = encodeURIComponent(`${params.facultySlug}`);
  const res = await fetch(
    process.env.subjectReviewsGappsScriptUrl + "?faculty=" + facultySlug
  );
  const { facultyName, reviews } = await res.json();

  return {
    props: {
      facultyName,
      reviews,
    },
    revalidate: 3600, // In seconds
  };
}

export default function SubjectReviewsPage({ facultyName, reviews }) {
  const [search, setSearch] = useState<string>("");

  const isRelevant = (text, query) => {
    return `${query}`
      .toLowerCase()
      .split(" ")
      .every((qword) => {
        return `${text}`
          .toLowerCase()
          .split(" ")
          .some((word) => word.includes(qword));
      });
  };

  const filteredSubjects = useMemo(() => {
    if (!search) {
      return reviews;
    }

    const outReviews = {};
    Object.keys(reviews).forEach((subjectCode) => {
      const subjectReviews = reviews[subjectCode];
      subjectReviews.forEach((subjectReview) => {
        const { subjectName, lecturerName } = subjectReview;
        if (
          isRelevant(subjectCode, search) ||
          isRelevant(subjectName, search) ||
          isRelevant(lecturerName, search)
        ) {
          if (!(subjectCode in outReviews)) {
            outReviews[subjectCode] = [];
          }
          outReviews[subjectCode].push(subjectReview);
        }
      });
    });

    return outReviews;
  }, [search]);

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 overflow-auto">
        <div className="container m-auto max-w-6xl">
          <div className="py-5 xl:px-0 px-4">
            <div className="flex flex-row divide-x gap-4 items-center">
              <img src="/luna.png" width={56}></img>
              <h1 className="text-xl font-heading pl-4">Subject Reviews</h1>
            </div>
          </div>
        </div>
        <div className="my-5 container m-auto max-w-6xl xl:px-0 px-4">
          <Link href="/subject-reviews">
            <div className="text-sm mb-1 text-sky-700 hover:underline">
              &larr; Return to Faculty List
            </div>
          </Link>
          <h1 className="font-heading text-3xl">{facultyName}</h1>
          <div className="mt-4">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              className="w-full border-[1px] border-gray-300 px-4 py-2 rounded outline-none shadow-inner"
              placeholder="Search by subject code, subject name, or lecturer"
            />
          </div>
        </div>
        <div className="m-auto my-6 max-w-6xl xl:px-0 px-4 flex flex-col gap-8">
          {Object.keys(filteredSubjects).map((subjectCode) => (
            <SubjectReviews
              subjectCode={subjectCode}
              reviews={reviews[subjectCode]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
