import CreateLinkForm from "@/components/protected/CreateLinkForm";
import { getUser } from "@/lib/redis";
import styles from "@/styles/protected/create-link.module.css";
import { currentUser } from "@clerk/nextjs/server";

interface PropsType {
  searchParams: Promise<Record<string, string>>;
}

export default async function Page({ searchParams }: PropsType) {
  const { destination } = await searchParams;
  const user = await getUser((await currentUser())?.id);

  return (
    <main className={styles.main}>
      <h1>Create a link</h1>
      <CreateLinkForm user={user} destination={destination || ""} />
    </main>
  );
}
