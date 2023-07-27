import path from "path";
import fs from "fs";
import matter from "gray-matter";

// full path where .md files exist
const localDirectory = path.join(process.cwd(), "content/local");

export default async function getSortedLocalDocuments() {

  // read file names
  const fileNames = fs.readdirSync(localDirectory);
  /*
  fileNames : [
    'sample.mdx',
    'local.mdx'
  ]
  */

  const allLocalDocuments: MDXDocument[] = await Promise.all(
    // resolve array of promises
    fileNames.map(async (fileName) => {
      // remove .md to get slug
      const _id = fileName.replace(/\.mdx/, "");

      // read markdown file as string
      const fullPath = path.join(localDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // to parse metadata use 'gray-matter'
      // you get data: metadata and content: mdx
      const { content, data: metaData } = matter(fileContents);
      // renamed data: metaData

      const localDocument : MDXDocument = {
        _id,
        type: "local",
        title: metaData?.title,
        date: metaData?.date,
        description: metaData?.description,
        body: content,
        slugAsParams: _id,
      }

      return localDocument;
    })
  );

  return allLocalDocuments;
}