import { kv } from "@/lib/redis";
import { after } from "next/server";

const localCache = new Map<string, string>();

export async function getDestination(backhalf: string) {
    const cachedDestination = localCache.get(backhalf);

    if (cachedDestination) {
        console.log("HI");
        after(async () => {
            await revalidateCache(backhalf);
        });
        return cachedDestination;
    }

    const destination = (await kv.links.get(backhalf)) as string | undefined;
    if (!destination) return null;

    localCache.set(backhalf, destination);
    return destination;
}

async function revalidateCache(backhalf: string) {
    const destination = (await kv.links.get(backhalf)) as string | undefined;
    if (destination) localCache.set(backhalf, destination);
}
