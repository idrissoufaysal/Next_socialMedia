import { sidebarLinks } from "@/app/constants";
import { INavLink } from "@/app/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function LeftBar() {
  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link href="/" className="flex gap-3 items-center">
          <Image
            src="assets/images/logo.svg"
            alt="logo"
            width={170}
            height={320}
          />
        </Link>

        <Link href="/profile/:id" className="flex gap-3 items-center">
          <Image
            src="assets/icons/profile-placeholder.svg"
            alt="profile"
            width={40}
            height={40}
            className="h-14 w-14 rounded-full"
          />
          <div className="flex flex-col">
            <p className="body-bold">JsMastery</p>
            <p className="small-regular text-light-3">{`@$username`}</p>
          </div>
        </Link>
        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link: INavLink) => {
            return (
              <li key={link.label} className="leftsidebar-link">
                <Link href={link.route} className="flex gap-4 items-center p-4">
                <Image
              src={link.imgURL}
              alt={link.label}
              width={20}
              height={10}
              className=""
            />
                {link.label}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
