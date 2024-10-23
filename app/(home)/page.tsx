"use client";
import Loader from "@/components/shared/Loader";
import { useUser } from "@/hooks/useUser";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function HomePage() {
  return (
    <SessionProvider>
      <Page />
    </SessionProvider>

  );
}



const Page = () => {
  // const { data: session } = useSession()
  const { user, isAuth } = useUser()
  const router = useRouter()
  const isPostLoading = false;
  const posts = null;

  useEffect(() => {
    if (!isAuth) {
      router.push("/login")
    }
  }, [isAuth, router])

  // console.log(session?.user);
  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full"> Home Feed</h2>
          {isPostLoading && !posts ? <Loader /> :
            <ul className="flex flex-1 flex-col gap-9  w-full">
              {/* {session?.user?.email} */}
              {user?.name}
            </ul>}
        </div>
      </div>
    </div>
  )
}
