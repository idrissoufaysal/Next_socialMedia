import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const useUser = () => {
    const [user, setUser] = useState(null);
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            if (!session) {
                router.push("/login");
                return;
            }

            const response = await fetch(`/api/user?email=${session.user?.email}`);
            const existingUser = await response.json();

            if (existingUser) {
                setUser(existingUser);
            }
        };

        fetchUser();
    }, [session, router]);

    return {
        user,
    };
};
