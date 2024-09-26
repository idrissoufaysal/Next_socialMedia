import LeftBar from "@/components/shared/leftBar";
import Navbar from "@/components/shared/navbar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="md:flex w-full ">
      <Navbar />
      <LeftBar />
      <section className="flex flex-1 h-full">{children}</section>
    </div>
  );
}
