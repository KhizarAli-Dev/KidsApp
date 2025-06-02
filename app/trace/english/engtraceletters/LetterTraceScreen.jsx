// import React, { useState, useRef } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   PanResponder,
//   ImageBackground,
//   TouchableOpacity,
// } from "react-native";
// import Svg, { Path } from "react-native-svg";
// import { useLocalSearchParams } from "expo-router";

// const LetterTraceScreen = () => {
//   const { letter } = useLocalSearchParams();
//   const [drawingPaths, setDrawingPaths] = useState([]);
//   const [currentPath, setCurrentPath] = useState([]);
//   const [offset, setOffset] = useState({ x: 0, y: 0 });

//   const letterImages = {
//     a: require("../../../../assets/images/traceletters/a.jpg"),
//     b: require("../../../../assets/images/traceletters/b.jpg"),
//     c: require("../../../../assets/images/traceletters/c.jpg"),
//     d: require("../../../../assets/images/traceletters/d.jpg"),
//     e: require("../../../../assets/images/traceletters/e.jpg"),
//     f: require("../../../../assets/images/traceletters/f.jpg"),
//     g: require("../../../../assets/images/traceletters/g.jpg"),
//     h: require("../../../../assets/images/traceletters/h.jpg"),
//     i: require("../../../../assets/images/traceletters/i.jpg"),
//     j: require("../../../../assets/images/traceletters/j.jpg"),
//     k: require("../../../../assets/images/traceletters/k.jpg"),
//     l: require("../../../../assets/images/traceletters/l.jpg"),
//     m: require("../../../../assets/images/traceletters/m.jpg"),
//     n: require("../../../../assets/images/traceletters/n.jpg"),
//     o: require("../../../../assets/images/traceletters/o.jpg"),
//     p: require("../../../../assets/images/traceletters/p.jpg"),
//     q: require("../../../../assets/images/traceletters/q.jpg"),
//     r: require("../../../../assets/images/traceletters/r.jpg"),
//     s: require("../../../../assets/images/traceletters/s.jpg"),
//     t: require("../../../../assets/images/traceletters/t.jpg"),
//     u: require("../../../../assets/images/traceletters/u.jpg"),
//     v: require("../../../../assets/images/traceletters/v.jpg"),
//     w: require("../../../../assets/images/traceletters/w.jpg"),
//     x: require("../../../../assets/images/traceletters/x.jpg"),
//     y: require("../../../../assets/images/traceletters/y.jpg"),
//     z: require("../../../../assets/images/traceletters/z.jpg"),
//   };

//   const handleLayout = (event) => {
//     const { x, y } = event.nativeEvent.layout;
//     setOffset({ x, y });
//   };

//   const panResponder = PanResponder.create({
//     onStartShouldSetPanResponder: () => true,
//     onMoveShouldSetPanResponder: () => true,
//     onPanResponderGrant: (e, gestureState) => {
//       const x = gestureState.x0 - offset.x;
//       const y = gestureState.y0 - offset.y;
//       setCurrentPath([{ x, y }]);
//     },
//     onPanResponderMove: (e, gestureState) => {
//       const x = gestureState.moveX - offset.x;
//       const y = gestureState.moveY - offset.y;
//       setCurrentPath((prevPath) => [...prevPath, { x, y }]);
//     },
//     onPanResponderRelease: () => {
//       setDrawingPaths((prevPaths) => [...prevPaths, currentPath]);
//       setCurrentPath([]);
//     },
//   });

//   const getPathD = (path) => {
//     if (path.length === 0) return "";
//     return path.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
//   };

//   const clearDrawing = () => {
//     setDrawingPaths([]);
//     setCurrentPath([]);
//   };

//   return (
//     <View style={styles.container}>
//       <ImageBackground
//         source={letterImages[letter?.toLowerCase()]}
//         style={styles.backgroundImage}
//         resizeMode="cover"
//       >
//         <View
//           style={styles.drawingContainer}
//           onLayout={handleLayout}
//           {...panResponder.panHandlers}
//         >
//           <Svg style={StyleSheet.absoluteFill}>
//             {drawingPaths.map((path, idx) => (
//               <Path
//                 key={idx}
//                 d={getPathD(path)}
//                 stroke="black"
//                 strokeWidth={3}
//                 fill="none"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             ))}
//             {currentPath.length > 0 && (
//               <Path
//                 d={getPathD(currentPath)}
//                 stroke="black"
//                 strokeWidth={3}
//                 fill="none"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             )}
//           </Svg>
//         </View>
//       </ImageBackground>

//       <View style={styles.controls}>
//         <Text style={styles.title}>Trace {letter?.toUpperCase()}</Text>
//         <TouchableOpacity style={styles.clearButton} onPress={clearDrawing}>
//           <Text style={styles.clearButtonText}>Clear</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     paddingBottom: 40,
//   },
//   backgroundImage: {
//     flex: 1,
//     width: "100%",
//     justifyContent: "center",
//   },
//   drawingContainer: {
//     flex: 1,
//     backgroundColor: "transparent",
//   },
//   controls: {
//     position: "absolute",
//     width: "100%",
//     alignItems: "center",
//     display: "flex",
//     justifyContent: "space-between",
//     flexDirection: "row",
//     paddingHorizontal: 12,
//     paddingTop: 20,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "bold",
//     color: "black",
//     paddingHorizontal: 20,
//     borderRadius: 20,
//     textDecorationLine: "underline",
//   },
//   clearButton: {
//     backgroundColor: "rgba(255,255,255,0.9)",
//     padding: 8,
//     borderRadius: 25,
//     borderWidth: 1,
//     borderColor: "#333",
//   },
//   clearButtonText: {
//     color: "black",
//     fontWeight: "bold",
//     fontSize: 14,
//   },
// });

// export default LetterTraceScreen;



import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  PanResponder,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { useLocalSearchParams } from "expo-router";

const LetterTraceScreen = () => {
  const { letter } = useLocalSearchParams();
  const [drawingPaths, setDrawingPaths] = useState([]);
  const [currentPath, setCurrentPath] = useState([]);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const letterImages = {
    a: require("../../../../assets/images/traceletters/a.jpg"),
    b: require("../../../../assets/images/traceletters/b.jpg"),
    c: require("../../../../assets/images/traceletters/c.jpg"),
    d: require("../../../../assets/images/traceletters/d.jpg"),
    e: require("../../../../assets/images/traceletters/e.jpg"),
    f: require("../../../../assets/images/traceletters/f.jpg"),
    g: require("../../../../assets/images/traceletters/g.jpg"),
    h: require("../../../../assets/images/traceletters/h.jpg"),
    i: require("../../../../assets/images/traceletters/i.jpg"),
    j: require("../../../../assets/images/traceletters/j.jpg"),
    k: require("../../../../assets/images/traceletters/k.jpg"),
    l: require("../../../../assets/images/traceletters/l.jpg"),
    m: require("../../../../assets/images/traceletters/m.jpg"),
    n: require("../../../../assets/images/traceletters/n.jpg"),
    o: require("../../../../assets/images/traceletters/o.jpg"),
    p: require("../../../../assets/images/traceletters/p.jpg"),
    q: require("../../../../assets/images/traceletters/q.jpg"),
    r: require("../../../../assets/images/traceletters/r.jpg"),
    s: require("../../../../assets/images/traceletters/s.jpg"),
    t: require("../../../../assets/images/traceletters/t.jpg"),
    u: require("../../../../assets/images/traceletters/u.jpg"),
    v: require("../../../../assets/images/traceletters/v.jpg"),
    w: require("../../../../assets/images/traceletters/w.jpg"),
    x: require("../../../../assets/images/traceletters/x.jpg"),
    y: require("../../../../assets/images/traceletters/y.jpg"),
    z: require("../../../../assets/images/traceletters/z.jpg"),
  };

  const handleLayout = (event) => {
    const { x, y } = event.nativeEvent.layout;
    setOffset({ x, y });
  };

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
        source={letterImages[letter?.toLowerCase()]}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View
          style={styles.drawingContainer}
          onLayout={handleLayout}
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
        <Text style={styles.title}>Trace {letter?.toUpperCase()}</Text>
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
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "black",
    paddingHorizontal: 20,
    textDecorationLine: "underline",
  },
  clearButton: {
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: 8,
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

export default LetterTraceScreen;
