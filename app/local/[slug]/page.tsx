import Button from "@/app/components/Button";
import getSortedLocalDocuments from "@/lib/localHelper";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";

// rehype
// import rehypePrettyCode from "rehype-pretty-code";
// import rehypeSlug from "rehype-slug";
// import rehypeAutolinkHeadings from "rehype-autolink-headings/lib";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props) {
  const document = await getLocalDocument({ params });

  if (document)
    return {
      title: document.title,
      description: document.description,
    };

  return {
    title: "not found",
    description: "debug: generateMetadata()",
  };
}

async function getLocalDocument({ params }: Props) {
  const slug = params.slug;
  const localDocuments = await getSortedLocalDocuments();
  const document = localDocuments.find((local) => local.slugAsParams === slug);
  return document;
}

// export const revalidate = 86400;
export async function generateStaticParams() {
  const localDocuments = await getSortedLocalDocuments();

  const exportProps: Props[] = localDocuments.map((localDocument) => ({
    params: {
      slug: localDocument.slugAsParams,
    },
  }));
  console.log("exportProps :", exportProps);
  return exportProps;
}
generateStaticParams();

export default async function LocalPage({ params }: Props) {
  const page = await getLocalDocument({ params });

  if (page)
    return (
      <>
        <article className="prose dark:prose-invert">
          <h1>{page.title}</h1>
          <p className="text-xl">{page.date}</p>
          <p className="text-xl">{page.description}</p>
          <hr />
          <MDXRemote source={page.body} components={{ Button }} />
          <p className="mt-0 flex justify-end text-slate-700 dark:text-slate-200">
            <Link href="/local">Back</Link>
          </p>
        </article>
      </>
    );
}
