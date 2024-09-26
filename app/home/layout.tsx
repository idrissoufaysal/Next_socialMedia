import LeftBar from "@/components/shared/leftBar";
import Navbar from "@/components/shared/navbar";

export default function HomeLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
     <div className="flex flex-col">
     <Navbar/>
     {children}
     <LeftBar/>
     </div>
    );
  }