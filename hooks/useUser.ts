import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/app/types";

export const useUser = () => {
    const [user, setUser] = useState<User>();
    const [isAuth, setIsAuth] = useState(false)


    useEffect(() => {
        const fetchUser = async () => {

            const response = await fetch(`/api/auth/user`);
            const existingUser = await response.json();
            console.log(response);
            console.log(existingUser);
            if (!existingUser.ok) {
                setIsAuth(false)
            }

            if (existingUser) {
                setUser(existingUser);
                setIsAuth(true)
            }
        };

        fetchUser();
    }, []);

    return {
        user,
        isAuth
    };
};
