import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import Button from "@/app/components/Button";
import Image from "@/app/components/Image";
// rehype
import rehypePrettyCode from "rehype-pretty-code";
import getSortedRemoteDocuments from "@/lib/remoteHelper";

// optional catch all
type Props = {
  params: {
    slug: string[];
  };
};

export async function generateMetadata({ params }: Props) {
  const document = await getRemoteDocument({ params });

  if (document)
    return {
      title: document.title,
      description: document.description,
    };

  return {
    title: "Not Found!",
    description: "debug: remote/[slug]/page.tsx generateMetadata()",
  };
}

async function getRemoteDocument({ params }: Props) {
  let slug = params.slug;
  let slugFlattened = slug.join("/");
  // console.log("slug :", slugFlattened);
  const remoteDocuments = await getSortedRemoteDocuments();
  const document = remoteDocuments.find(
    (remote) => remote.slugAsParams === slugFlattened
  );
  return document;
}

export async function generateStaticParams() {
  const remoteDocuments = await getSortedRemoteDocuments();

  const exportProps = remoteDocuments.map((remoteDocument) => ({
    params: {
      slug: remoteDocument.slugAsParams,
    },
  }));
  // console.log('exportProps :', exportProps);
  return exportProps;
}
// generateStaticParams();

export default async function RemotePage({ params }: Props) {
  const document = await getRemoteDocument({ params });

  if (document) {
    return (
      <>
        <article className="prose dark:prose-invert">
          <h1>{document.title}</h1>
          <p className="text-xl">{document.date}</p>
          <p className="text-xl">{document.description}</p>
          <hr />
          <MDXRemote
            source={document.body}
            components={{ Button, Image }}
            options={{
              mdxOptions: {
                remarkPlugins: [],
                rehypePlugins: [
                  [
                    rehypePrettyCode,
                    {
                      theme: "monokai",
                    },
                  ],
                ],
                format: "mdx",
              },
            }}
          />
          <p className="mt-0 flex justify-end text-slate-700 dark:text-slate-200">
            <Link href="/local">Back</Link>
          </p>
        </article>
      </>
    );
  }
}
