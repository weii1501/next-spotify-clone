import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Song } from "../types";

const useLoadImage = (song: Song) => {
  const supabase = useSupabaseClient();
  const { data: imageData } = supabase.storage
    .from("images")
    .getPublicUrl(song.image_path);

  return imageData.publicUrl;
};

export default useLoadImage;
