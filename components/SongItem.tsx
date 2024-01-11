import { Song } from "@/types";
import React from "react";

interface SongItemProps {
    data: Song;
    onClick: (id: string) => void;
}

const SongItem: React.FC<SongItemProps> = ({ data, onClick }) => {
    return (
        <div>
            Songitem!
        </div>
    );
};

export default SongItem;