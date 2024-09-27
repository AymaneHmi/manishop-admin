import { useEffect, useState } from "react";

const toBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const convertMedia = (media: FileList | null) => {
  const [fileDataList, setFileDataList] = useState<any[]>([]);
  
  useEffect(() => {
    if(!media) return;

    const convertMedia = async () => {
      const mediaArray = Array.from(media);
      const fileDataPromises = mediaArray.map((file: File) => toBase64(file));
      const fileDataList = await Promise.all(fileDataPromises);
      setFileDataList(fileDataList);
    }

    convertMedia();
  },[media])

  return fileDataList;
};
