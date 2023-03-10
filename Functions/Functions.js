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

}