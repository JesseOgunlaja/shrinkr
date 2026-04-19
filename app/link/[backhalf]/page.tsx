import { getDestination } from "@/lib/link-redirect";
import { permanentRedirect } from "next/navigation";

interface PropsType {
    params: Promise<Record<string, string>>;
}

export default async function Page({ params }: PropsType) {
    const { backhalf } = await params;

    const destination = await getDestination(backhalf);
    return permanentRedirect(destination || "https://shrinkr.jesseogu.dev");
}
