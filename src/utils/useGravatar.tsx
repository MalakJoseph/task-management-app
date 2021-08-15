import * as React from "react";
import { Md5 } from "ts-md5";

const gravatarUrlGenerator = (email: string, size = 80) => {
  return `https://www.gravatar.com/avatar/${Md5.hashStr(
    email.toLowerCase()
  )}.jpg?s=${size}&d=404`;
};

const isImageExist = async (url: string) => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      return url;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export const useGravatar = (
  email: string,
  size = 80
): [string | null, React.Dispatch<React.SetStateAction<string | null>>] => {
  const [imageSrc, setImageSrc] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchImage = async () => {
      const url = gravatarUrlGenerator(email, size);
      const src = await isImageExist(url);
      setImageSrc(src);
    };
    if (email) fetchImage();
  }, [email, size]);

  return [imageSrc, setImageSrc];
};
