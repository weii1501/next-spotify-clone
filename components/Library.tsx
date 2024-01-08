"use client";
import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";

const Library = () => {
  const onClick = () => {};

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist size={26} className="text-neutral-400" />
          <p className="font-medium text-md text-neutral-400">Thư viện</p>
        </div>
        <AiOutlinePlus
            size={20}
            className="text-neutral-400 cursor-pointer hover:text-white transition"
            onClick={onClick}
        />
      </div>

      <div className="flex flex-col gap-y-2 mt-4 px-3">
        Danh sách bài hát!
      </div>
    </div>
  );
};

export default Library;
