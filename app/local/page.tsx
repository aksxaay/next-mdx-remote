import Link from "next/link";
import React from "react";

// debug
import getSortedLocalDocuments from "@/lib/localHelper";

// pulling from content/local
// pulling from content/remote

const Local = async () => {
  const localDocuments = await getSortedLocalDocuments();
  return (
    <>
      <div className="text-xl font-semibold">Local Documents</div>
      {localDocuments.map((document) => (
        <div key={document._id} className="mt-5">
          <article className="mb-5">
            <Link href={`local/${document.slugAsParams}`}>
              <h2 className="text-xl font-semibold underline">
                {document.title}
              </h2>
            </Link>
            <p className="text-sm">{document.description}</p>
            <p className="text-sm">{document.slugAsParams}</p>
          </article>
        </div>
      ))}
    </>
  );
};

export default Local;
