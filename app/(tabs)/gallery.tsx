import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";

interface CapturedImage {
  id: string;
  imageUri: string;
  title: string;
  description: string;
  treatment: string;
  date: string;
  location: string;
}

// Datos de ejemplo
const capturedImages: CapturedImage[] = [
  {
    id: "1",
    imageUri: "../../assets/images/example.jpeg", // Reemplaza con la URL o la ruta local de la imagen
    title: "Potato Healthy",
    description:
      "Esta papa no muestra signos de enfermedad. Se encuentra en perfecto estado.",
    treatment: "No se necesita tratamiento.",
    date: "16/10/2024",
    location: "Ubicación: Lima, Perú",
  },
  {
    id: "2",
    imageUri: "../../assets/images/example.jpeg",
    title: "Potato Early Blight",
    description:
      "Se detectaron manchas negras en las hojas. Tratamiento recomendado es con fungicidas.",
    treatment: "Aplicar fungicida a base de cobre cada 7 días.",
    date: "14/10/2024",
    location: "Ubicación: Arequipa, Perú",
  },
  // Agrega más imágenes si es necesario
];

export default function GalleryScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<CapturedImage | null>(
    null
  );

  const openModal = (image: CapturedImage) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedImage(null);
  };

  const renderItem = ({ item }: { item: CapturedImage }) => (
    <TouchableOpacity
      style={styles.imageContainer}
      onPress={() => openModal(item)}
    >
      <View style={styles.imageWrapper}>
        <Image source={{ uri: item.imageUri }} style={styles.imageThumbnail} />
        <View style={styles.textContainer}>
          <Text style={styles.imageTitle}>Foto</Text>
          <Text style={styles.imageSubtitle}>{item.title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={capturedImages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2} // Mostrar dos imágenes por fila
      />

      {selectedImage && (
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Image
                source={{ uri: selectedImage.imageUri }}
                style={styles.modalImage}
              />
              <Text style={styles.modalTitle}>{selectedImage.title}</Text>
              <Text style={styles.modalDescription}>
                {selectedImage.description}
              </Text>
              <Text style={styles.modalTreatment}>
                Tratamiento: {selectedImage.treatment}
              </Text>
              <Text style={styles.modalDetails}>
                Fecha: {selectedImage.date}
              </Text>
              <Text style={styles.modalDetails}>
                Ubicación: {selectedImage.location}
              </Text>
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 10,
  },
  imageContainer: {
    flex: 1,
    margin: 10,
    alignItems: "center",
  },
  imageWrapper: {
    backgroundColor: "#fff", // Fondo blanco para la apariencia de foto antigua
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000", // Color de la sombra
    shadowOffset: { width: 0, height: 4 }, // Desplazamiento de la sombra
    shadowOpacity: 0.3, // Opacidad de la sombra
    shadowRadius: 5, // Radio de desenfoque de la sombra
    elevation: 5, // Sombra para Android
    alignItems: "center",
  },
  imageThumbnail: {
    width: 150,
    height: 150,
    borderRadius: 5,
    marginBottom: 5,
  },
  textContainer: {
    backgroundColor: "#fff",
    padding: 5,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    width: "100%",
    alignItems: "center",
  },
  imageTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  imageSubtitle: {
    fontSize: 14,
    color: "#555",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "90%",
  },
  modalImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
    textAlign: "center",
  },
  modalTreatment: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  modalDetails: {
    fontSize: 12,
    color: "#666",
    marginBottom: 5,
    textAlign: "center",
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: "#ff6347",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
