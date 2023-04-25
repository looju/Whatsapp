import * as ImagePicker from "expo-image-picker";
import "react-native-get-random-values";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../Config/Firebase";

export async function PickImage() {
  let result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    quality: 1,
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
  });
  return result;
}

export async function RequestPermission() {
  let { status } = await ImagePicker.requestCameraPermissionsAsync();
  return status;
}

export async function UploadImage(uri, path, fName) {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const fileName = fName || randomString();
  const imageRef = ref(storage, `${path}/${fileName}.jpeg`);

  const snapshot = await uploadBytes(imageRef, blob, {
    contentType: "image/jpeg",
  });

  blob.close();

  const url = await getDownloadURL(snapshot.ref);

  return { url, fileName };
}

export const randomString = () => {
  return String(Date.now().toString(32) + Math.random().toString(16)).replace(/\./g, "");
};

