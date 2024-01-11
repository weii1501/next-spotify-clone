"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { useUser } from "@/hooks/useUser";

import Modal from "./Modal";
import Input from "./Input";
import toast from "react-hot-toast";

import useUploadModal from "@/hooks/useUploadModal";
import uniqid from "uniqid";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import Button from "./Button";

const UploadModal = () => {
  const uploadModal = useUploadModal();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null,
    },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      // reset form
      reset();
      uploadModal.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    // upload to supabase
    try {
      setIsLoading(true);

      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];

      if (!imageFile || !songFile || !user) {
        toast.error("Vui lòng chọn bài hát và ảnh");
        return;
      }

      const uniqueID = uniqid();

      const { data: songData, error: songError } = await supabaseClient.storage
        .from("songs")
        .upload(`song-${values.title}-${uniqueID}`, songFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (songError) {
        setIsLoading(false);
        return toast.error("Tải bài hát lên thất bại");
      }

      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from("images")
          .upload(`image-${values.title}-${uniqueID}`, imageFile, {
            cacheControl: "3600",
            upsert: false,
          });

      if (imageError) {
        setIsLoading(false);
        return toast.error("Tải ảnh lên thất bại");
      }

      const { error: supabaseError } = await supabaseClient
        .from("songs")
        .insert({
          user_id: user?.id,
          title: values.title,
          author: values.author,
          song_path: songData.path,
          image_path: imageData.path,
        });

      if (supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.message);
      }

      router.refresh();
      setIsLoading(false);
      toast.success("Tải lên thành công");
      reset();
      uploadModal.onClose();
    } catch (error) {
      toast.error("Vui lòng thử lại sau");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Tải lên bài hát"
      description="Upload modal description"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input
          id="title"
          type="text"
          disabled={isLoading}
          placeholder="Tên bài hát"
          {...register("title", { required: true })}
        />

        <Input
          id="author"
          type="text"
          disabled={isLoading}
          placeholder="Tác giả"
          {...register("author", { required: true })}
        />

        <div>
          <div className="pb-1">Chọn bài hát tải lên</div>
          <Input
            id="song"
            type="file"
            disabled={isLoading}
            accept=".mp3"
            {...register("song", { required: true })}
          />
        </div>

        <div>
          <div className="pb-1">Chọn ảnh tải lên</div>
          <Input
            id="image"
            type="file"
            disabled={isLoading}
            accept="image/*"
            {...register("image", { required: true })}
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="bg-green-600 text-black"
        >
          Tải lên
        </Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
