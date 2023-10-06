interface MyProps {
  subjectCode: string;
  reviews: any[];
}

export default function SubjectReviews({ subjectCode, reviews }: MyProps) {
  const subjectNames = reviews.reduce((acc, curr) => {
    const subjectName = curr.subjectName;
    if (!acc.includes(subjectName)) {
      acc.push(subjectName);
    }
    return acc;
  }, []);

  return (
    <div>
      {/* <h2 className="text-sm">{subjectCode}</h2> */}
      <h1 className="text-xl">{subjectNames[0]}</h1>
      {subjectNames.length > 1 && (
        <div className="text-xs text-gray-500 mt-1">
          Other names: {subjectNames.slice(1).join(", ")}
        </div>
      )}
      <div className="grid grid-cols-1 gap-6 mt-3">
        {reviews.map((review, i) => (
          <div
            key={i}
            className="rounded p-3 border-[1px] border-gray-300 shadow"
          >
            <div className="text-sm">
              {subjectCode} {review.subjectName}
            </div>
            <div className="text-xs text-gray-600">
              Lectured by {review.lecturerName}
            </div>
            <div className="flex flex-col md:divide-y mt-4 text-sm gap-2 md:gap-0">
              <div className="grid grid-cols-12 py-1">
                <div className="col-span-12 md:col-span-3 text-gray-600">
                  Delivery mode
                </div>
                <div className="col-span-12 md:col-span-9">
                  {review.modeOfDelivery}
                </div>
              </div>
              <div className="grid grid-cols-12 py-1">
                <div className="col-span-12 md:col-span-3 text-gray-600">
                  Teaching period
                </div>
                <div className="col-span-12 md:col-span-9">
                  {review.teachingPeriod}
                </div>
              </div>
              <div className="grid grid-cols-12 py-1">
                <div className="col-span-12 md:col-span-3 text-gray-600">
                  Types of assessment
                </div>
                <div className="col-span-12 md:col-span-9">
                  {review.typeOfAssessment}
                </div>
              </div>
              <div className="grid grid-cols-12 py-1">
                <div className="col-span-12 md:col-span-3 text-gray-600">
                  What does this subject cover?
                </div>
                <div className="col-span-12 md:col-span-9">
                  {review.subjectCoverage}
                </div>
              </div>
              <div className="grid grid-cols-12 py-1">
                <div className="col-span-12 md:col-span-3 text-gray-600">
                  What to do?
                </div>
                <div className="col-span-12 md:col-span-9">
                  {review.whatToDo}
                </div>
              </div>
              <div className="grid grid-cols-12 py-1">
                <div className="col-span-12 md:col-span-3 text-gray-600">
                  What NOT to do?
                </div>
                <div className="col-span-12 md:col-span-9">
                  {review.whatNotToDo}
                </div>
              </div>
              <div className="grid grid-cols-12 py-1">
                <div className="col-span-12 md:col-span-3 text-gray-600">
                  What prior knowledge do I need?
                </div>
                <div className="col-span-12 md:col-span-9">
                  {review.priorKnowledge}
                </div>
              </div>
              <div className="grid grid-cols-12 py-1">
                <div className="col-span-12 md:col-span-3 text-gray-600">
                  Why should I choose this subject?
                </div>
                <div className="col-span-12 md:col-span-9">
                  {review.whyShouldIChoose}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
