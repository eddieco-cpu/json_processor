import { secretVariable } from "@/lib/server-data";

export function POST() {
  //
  secretVariable.push("This is secret " + Math.random());
  return Response.json(secretVariable);
}
