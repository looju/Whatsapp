import * as ImagePicker from "expo-image-picker";

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


export async function UploadImage(uri,path,fName){
    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        }
        xhr.onerror = function (e) {
            console.log(e);
            reject(new TypeError("Network request failed"));
          };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
      });
      

}