"use client";

import SongItem from "@/components/SongItem";
import { Song } from "@/types";
import React from "react";

interface PageContentProps {
  songs: Song[];
}

const PageContent: React.FC<PageContentProps> = ({ songs }) => {
  if (songs.length === 0) {
    return (
      <div className="mt-4 text-neutral-400">Hiện tại chưa có bài hát nào!</div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4 mt-4">
      {songs.map((song) => (
        <SongItem key={song.id} data={song} onClick={() => {}} />
      ))}
    </div>
  );
};

export default PageContent;
