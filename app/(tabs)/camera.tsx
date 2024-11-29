import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import {
  CameraView,
  CameraType,
  useCameraPermissions,
  Camera,
} from "expo-camera";

export default function CameraScreen() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Permisos de la cámara aún están cargando.
    return <View />;
  }

  if (!permission.granted) {
    // Los permisos no han sido otorgados todavía.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          Necesitamos permisos para usar la cámara.
        </Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.text}>Otorgar Permiso</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  async function takePicture(camera: any) {
    const photoResult = await camera.takePictureAsync();
    setPhoto(photoResult.uri);
  }

  return (
    <View style={styles.container}>
      {photo ? (
        // Muestra la foto tomada
        <Image source={{ uri: photo }} style={styles.fullscreenImage} />
      ) : (
        <CameraView style={styles.camera} facing={facing}>
          <View style={styles.frameContainer}>
            <View style={styles.frame} />
          </View>
          <View style={styles.controls}>
            <TouchableOpacity
              style={styles.button}
              onPress={toggleCameraFacing}
            >
              <Text style={styles.text}>Cambiar Cámara</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={async () => await takePicture(Camera)}
            >
              <Text style={styles.text}>Tomar Foto</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  frameContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  frame: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: "white",
    backgroundColor: "transparent",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#1e90ff",
  },
  text: {
    color: "white",
    fontSize: 16,
  },
  fullscreenImage: {
    flex: 1,
    resizeMode: "cover",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
    color: "white",
  },
});
