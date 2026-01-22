import { BookCheck } from "lucide-react";

const AuthTitle = () => {
  return (
    <div className="flex flex-col items-center ">
      <div className="flex items-center justify-center rounded-4xl bg-blue-500 h-12 w-12">
        <BookCheck size={24} className="  text-white" />
      </div>
      <h1 className="font-bold text-4xl mt-4 mb-2">TaskMaster</h1>
      <p className="text-lg">Manage your tasks efficiently</p>
    </div>
  );
};
export default AuthTitle;
