import { NextResponse } from "next/server";
import { createClient } from "@/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = createClient();

    const {
      data: { user },
      error,
    } = await supabase.auth.exchangeCodeForSession(code);

    if (user && !error) {
      const forwardedHost = request.headers.get("x-forwarded-host"); // original origin before load balancer

      const userMetadata = {
        user_id: user.id,
        full_name: user.user_metadata.full_name,
        provider_id: user.user_metadata.provider_id,
        global_name: user.user_metadata.custom_claims.global_name,
        avatar_url: user.user_metadata.avatar_url,
        updated_at: new Date().toLocaleString(),
      };

      const { error: profileError } = await supabase
        .from("profiles")
        .upsert(userMetadata, { onConflict: "user_id" });

      if (profileError) {
        console.log(profileError);
      }

      const isLocalEnv = process.env.NODE_ENV === "development";
      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/signin`);
}
