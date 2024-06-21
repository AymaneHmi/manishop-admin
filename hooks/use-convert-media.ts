const toBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const useConvertMedia = async (media: FileList | null): Promise<any[]> => {
  if (media) {
    const mediaArray = Array.from(media);
    const fileDataPromises = mediaArray.map((file: File) => toBase64(file));
    const fileDataList = await Promise.all(fileDataPromises);
    return fileDataList;
  } else {
    return [];
  }
};
