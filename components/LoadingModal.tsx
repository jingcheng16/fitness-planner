import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";

type Props = {
  visible: boolean;
  isLoading: boolean;
  isError: boolean;
};

const LoadingModal = ({ visible, isLoading, isError }: Props) => {
  const loadingIndicator = () => {
    if (isError) {
      return <Text>Something run!</Text>;
    } else {
      if (isLoading) {
        return <Text>Loading...</Text>;
      } else {
        return <Text>Success</Text>;
      }
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.indicatorContainer}>{loadingIndicator()}</View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    borderRadius: 20,
    padding: 35,
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "40%",
  },
});

export default LoadingModal;
