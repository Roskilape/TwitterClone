import { ReactNode } from "react";
import { Modal, Platform, Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface SheetModalProps {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function SheetModal({ visible, onClose, children }: SheetModalProps) {
  const insets = useSafeAreaInsets();
  const isAndroid = Platform.OS === "android";

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={isAndroid}
      presentationStyle={isAndroid ? "overFullScreen" : "pageSheet"}
      onRequestClose={onClose}
    >
      {isAndroid ? (
        <View style={styles.overlay}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={onClose}
            accessibilityRole="button"
            accessibilityLabel="Close modal"
          />
          <View style={[styles.sheet, { paddingBottom: insets.bottom }]}>
            {children}
          </View>
        </View>
      ) : (
        children
      )}
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  sheet: {
    height: "85%",
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: "hidden",
  },
});
