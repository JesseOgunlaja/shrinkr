import { SignIn } from "@clerk/nextjs";

interface PropsType {
  searchParams: Promise<Record<string, string>>;
}

export default async function Page({ searchParams }: PropsType) {
  const { returnUrl } = await searchParams;
  return (
    <main>
      <SignIn
        signUpUrl="/signup"
        forceRedirectUrl={returnUrl || "/dashboard"}
        routing="hash"
      />
    </main>
  );
}
