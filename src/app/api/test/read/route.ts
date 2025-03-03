import { secretVariable } from "@/lib/server-data";

export function GET() {
  //
  return Response.json(secretVariable);
}
