import React from "react";
import { View } from "react-native";
import { scale } from "react-native-size-matters";

interface Props {
  mt?: number;
  mb?: number;
}

const Space = ({ mt = 5, mb = 5 }: Props) => {
  return <View style={{ marginTop: scale(mt), marginBlock: scale(mb) }} />;
};
export default Space;
