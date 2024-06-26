// import { auth } from "@/app/_lib/auth";

// import { NextResponse } from "next/server";

// export async function middleware(req) {
//   const session = await auth();

//   if (!session?.user) return NextResponse.redirect(new URL("/about", req.url));
// }

import { auth } from "@/app/_lib/auth";

export const middleware = auth;

export const config = {
  matcher: ["/account"],
};
