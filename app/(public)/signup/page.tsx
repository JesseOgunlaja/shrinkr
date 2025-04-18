import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <main>
      <SignUp
        signInUrl="/signin"
        forceRedirectUrl="/dashboard/loading"
        routing="hash"
      />
    </main>
  );
}
