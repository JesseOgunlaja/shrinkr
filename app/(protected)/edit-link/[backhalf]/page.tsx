import EditLinkForm from "@/components/protected/EditLinkForm";
import { getUser } from "@/lib/redis";
import styles from "@/styles/protected/create-link.module.css";
import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

interface PropsType {
  params: Promise<Record<string, string>>;
}

export default async function Page({ params }: PropsType) {
  const { backhalf } = await params;
  const user = await getUser((await currentUser())?.id);
  const link = user.links.find((link) => link.backhalf === backhalf);

  if (!link) notFound();

  return (
    <main className={styles.main}>
      <h1>Edit a link</h1>
      <EditLinkForm user={user} link={link} />
    </main>
  );
}
