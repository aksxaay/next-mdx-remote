import Link from "next/link";
import React from "react";

// debug
import getSortedRemoteDocuments from "@/lib/remoteHelper";

// pulling from content/local
// pulling from content/remote

const Remote = async () => {
  const remoteDocuments = await getSortedRemoteDocuments();
  // console.log("remoteDocuments", remoteDocuments)
  return (
    <>
      <div className="text-xl font-semibold">Remote Documents</div>
      {remoteDocuments.map((document) => (
        <div key={document._id} className="mt-5">
          <article className="mb-5">
            <Link href={`remote/${document.slugAsParams}`}>
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

export default Remote;
