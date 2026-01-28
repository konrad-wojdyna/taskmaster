import { BookCheck } from "lucide-react";

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center justify-center rounded-xl bg-[#4e38f5] h-10 w-10">
        <BookCheck size={22} className="  text-white" />
      </div>
      <h1 className="font-bold text-xl">TaskMaster</h1>
    </div>
  );
};
export default Logo;
