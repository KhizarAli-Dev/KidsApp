import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  PanResponder,
  ImageBackground,
  TouchableOpacity,
  UIManager,
  findNodeHandle,
} from "react-native";
import Svg, { Path } from "react-native-svg";


const EngTestScreen = () => {
  const [drawingPaths, setDrawingPaths] = useState([]);
  const [currentPath, setCurrentPath] = useState([]);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const viewRef = useRef(null);

  useEffect(() => {
    const handle = findNodeHandle(viewRef.current);
    if (handle) {
      UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
        setOffset({ x: pageX, y: pageY });
      });
    }
  }, []);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (e, gestureState) => {
      const x = gestureState.x0 - offset.x;
      const y = gestureState.y0 - offset.y;
      setCurrentPath([{ x, y }]);
    },
    onPanResponderMove: (e, gestureState) => {
      const x = gestureState.moveX - offset.x;
      const y = gestureState.moveY - offset.y;
      setCurrentPath((prevPath) => [...prevPath, { x, y }]);
    },
    onPanResponderRelease: () => {
      setDrawingPaths((prevPaths) => [...prevPaths, currentPath]);
      setCurrentPath([]);
    },
  });

  const getPathD = (path) => {
    if (path.length === 0) return "";
    return path.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  };

  const clearDrawing = () => {
    setDrawingPaths([]);
    setCurrentPath([]);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../../assets/images/engbg.jpg")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View
          style={styles.drawingContainer}
          ref={viewRef}
          {...panResponder.panHandlers}
        >
          <Svg style={StyleSheet.absoluteFill}>
            {drawingPaths.map((path, idx) => (
              <Path
                key={idx}
                d={getPathD(path)}
                stroke="black"
                strokeWidth={3}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}
            {currentPath.length > 0 && (
              <Path
                d={getPathD(currentPath)}
                stroke="black"
                strokeWidth={3}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </Svg>
        </View>
      </ImageBackground>

      <View style={styles.controls}>
        <Text style={styles.title}>Eng Test</Text>
        <TouchableOpacity style={styles.clearButton} onPress={clearDrawing}>
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom: 40,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
  },
  drawingContainer: {
    flex: 1,
    backgroundColor: "transparent",
  },
  controls: {
    position: "absolute",
    width: "100%",
    alignItems: "center",
    display:'flex',
    justifyContent:'space-between',
    flexDirection:'row',
    paddingHorizontal:12
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "black",
    paddingHorizontal: 20,
    borderRadius: 20,
    textDecorationLine: "underline",
  },
  clearButton: {
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: 8,
    marginTop: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#333",
  },
  clearButtonText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default EngTestScreen;
