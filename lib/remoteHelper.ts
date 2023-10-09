import path from "path";
import fs from "fs";
import matter from "gray-matter";

const remoteDirectory = path.join(process.cwd(), "content/remote");

type FileTree = {
  tree: [
    {
      path: string;
      mode: string;
      type: "tree" | "blob";
      sha: string;
      size?: string;
      url: string;
    },
  ];
};

export default async function getSortedRemoteDocuments() {
  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/vnd.github+json");
  myHeaders.append("Authorization", `Bearer ${process.env.GITHUB_TOKEN}`);
  myHeaders.append("X-GitHub-Api-Version", "2022-11-28");
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  const res = await fetch(
    "https://api.github.com/repos/aksxaay/mdx-content/git/trees/main?recursive=1",
    requestOptions as RequestInit
  );

  const repoFileTree: FileTree = await res.json();
  // console.log("repoFileTree :", repoFileTree);

  // if (!repoFileTree || !repoFileTree.tree) return [];
  const filterRepoFileTree = repoFileTree.tree.filter(
    (obj) => obj.path.endsWith(".mdx")
    //  || obj.path.endsWith(".md"),
  );

  const allRemoteDocuments = await Promise.all(
    filterRepoFileTree.map(async (treeObject) => {
      const _id = treeObject.path.replace(/\.mdx?/, "");

      const fileResponse: {
        content: string;
      } = await (await fetch(treeObject.url)).json();
      const fileContents = atob(fileResponse.content);

      const { content, data: metaData } = matter(fileContents);
      const remoteDocument: MDXDocument = {
        _id,
        type: "remote",
        title: metaData.title || "<Missing Frontmatter Title>",
        date: metaData?.date,
        description: metaData?.description,
        body: content,
        slugAsParams: _id,
      };

      return remoteDocument;
    })
  );

  return allRemoteDocuments;
}
