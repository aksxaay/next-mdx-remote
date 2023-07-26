import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="mt-5">
        <article className="mb-5">
          <h2 className="text-xl font-semibold underline">Title</h2>
          <p className="text-sm">Description</p>
        </article>
        <article>
          <h2>Title 2</h2>
          <p>Description 2</p>
        </article>
      </div>
    </>
  );
}
