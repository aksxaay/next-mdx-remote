import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

type Props = {
  revalidate: boolean;
  now: Date;
  message: string;
};
export async function GET(request: NextRequest) {
  const route = request.nextUrl.searchParams.get("path");
  const secret = request.nextUrl.searchParams.get("secret");
  if (secret === process.env.SECRET_TOKEN) {
    if (route) {
      console.log("revalidateTag: ", route);
      revalidateTag(route);
    }
    return NextResponse.json({
      revalidated: route ? true : false,
      now: Date.now(),
      message: secret === route ? "Revalidated" : "Provide path parameter",
    });
  } else
    return NextResponse.json({
      revalidated: false,
      now: Date.now(),
      message: "Not Authorized",
    });
}
