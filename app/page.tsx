import getSortedLocalDocuments from "@/lib/localHelper";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const localDocuments = await getSortedLocalDocuments();
  const allDocuments = [...localDocuments];
  return (
    <>
      <div className="text-xl font-semibold">Local + Remote Documents</div>
      <div className="mt-5">
        {allDocuments.map((document) => (
          <article key={document._id} className="mb-5">
            <Link href={`local/${document.slugAsParams}`}>
              <h2 className="text-xl font-semibold underline">
                {document.title}
              </h2>
            </Link>
            <p className="text-sm">{document.description}</p>
            <p className="text-xs">{document.slugAsParams}</p>
          </article>
        ))}
      </div>
    </>
  );
}
