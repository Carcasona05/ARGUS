import React, { useRef, useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Animated,
  useWindowDimensions,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const getImageSource = (img) =>
  typeof img === "string" ? { uri: img } : img;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const getDistance = (touches) => {
  const [a, b] = touches;
  return Math.hypot(a.pageX - b.pageX, a.pageY - b.pageY);
};

const getMidpoint = (touches) => {
  const [a, b] = touches;
  return { x: (a.pageX + b.pageX) / 2, y: (a.pageY + b.pageY) / 2 };
};

const ZoomableImage = ({ image, width, height, onZoomChange }) => {
  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const scaleRef = useRef(1);
  const txRef = useRef(0);
  const tyRef = useRef(0);
  const gestureRef = useRef(null);

  const applyTransform = (s, x, y) => {
    scaleRef.current = s;
    txRef.current = x;
    tyRef.current = y;
    scale.setValue(s);
    translateX.setValue(x);
    translateY.setValue(y);
    onZoomChange?.(s > 1.01);
  };

  const clampX = (x, s) => clamp(x, -((s - 1) * width) / 2, ((s - 1) * width) / 2);
  const clampY = (y, s) => clamp(y, -((s - 1) * height) / 2, ((s - 1) * height) / 2);

  const snapBack = () => {
    Animated.parallel([
      Animated.timing(scale, {
        toValue: 1,
        duration: 180,
        useNativeDriver: false,
      }),
      Animated.timing(translateX, {
        toValue: 0,
        duration: 180,
        useNativeDriver: false,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 180,
        useNativeDriver: false,
      }),
    ]).start(() => {
      scaleRef.current = 1;
      txRef.current = 0;
      tyRef.current = 0;
      onZoomChange?.(false);
    });
  };

  const onStartShouldSetResponder = (event) =>
    event.nativeEvent.touches.length >= 2;

  const onMoveShouldSetResponder = (event) => {
    const touches = event.nativeEvent.touches;
    return touches.length >= 2 || scaleRef.current > 1.01;
  };

  const onResponderGrant = (event) => {
    const touches = event.nativeEvent.touches;

    if (touches.length >= 2) {
      gestureRef.current = {
        mode: "pinch",
        startDistance: getDistance(touches),
        startMidpoint: getMidpoint(touches),
        baseScale: scaleRef.current,
        baseTx: txRef.current,
        baseTy: tyRef.current,
      };
    } else if (touches.length === 1) {
      gestureRef.current = {
        mode: "pan",
        startX: touches[0].pageX,
        startY: touches[0].pageY,
        baseTx: txRef.current,
        baseTy: tyRef.current,
      };
    }
  };

  const onResponderMove = (event) => {
    const gesture = gestureRef.current;
    const touches = event.nativeEvent.touches;
    if (!gesture) return;

    if (touches.length >= 2) {
      gesture.mode = "pinch";
      const currentDistance = getDistance(touches);
      const currentMidpoint = getMidpoint(touches);

      let nextScale = gesture.baseScale * (currentDistance / gesture.startDistance);
      nextScale = clamp(nextScale, 1, 4);

      let nextTx = gesture.baseTx;
      let nextTy = gesture.baseTy;

      if (nextScale > 1) {
        const dx = currentMidpoint.x - gesture.startMidpoint.x;
        const dy = currentMidpoint.y - gesture.startMidpoint.y;
        nextTx = gesture.baseTx + dx;
        nextTy = gesture.baseTy + dy;
      }

      applyTransform(
        nextScale,
        clampX(nextTx, nextScale),
        clampY(nextTy, nextScale)
      );
    } else if (touches.length === 1) {
      if (gesture.mode === "pan" && scaleRef.current > 1) {
        const dx = touches[0].pageX - gesture.startX;
        const dy = touches[0].pageY - gesture.startY;

        applyTransform(
          scaleRef.current,
          clampX(gesture.baseTx + dx, scaleRef.current),
          clampY(gesture.baseTy + dy, scaleRef.current)
        );
      }
    }
  };

  const onResponderRelease = () => {
    gestureRef.current = null;

    if (scaleRef.current <= 1) {
      snapBack();
    }
  };

  return (
    <View
      style={[styles.page, { width, height }]}
      onStartShouldSetResponder={onStartShouldSetResponder}
      onMoveShouldSetResponder={onMoveShouldSetResponder}
      onResponderGrant={onResponderGrant}
      onResponderMove={onResponderMove}
      onResponderRelease={onResponderRelease}
      onResponderTerminate={onResponderRelease}
    >
      <Animated.Image
        source={getImageSource(image)}
        style={[
          styles.fullImage,
          {
            width,
            height,
            transform: [
              { translateX },
              { translateY },
              { scale },
            ],
          },
        ]}
        resizeMode="contain"
      />
    </View>
  );
};

export default function FullscreenImageViewer({
  images = [],
  initialIndex = 0,
  visible,
  onClose,
}) {
  const { width, height } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [scrollEnabled, setScrollEnabled] = useState(true);

  const handleScrollEnd = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
    setScrollEnabled(true);
  };

  const renderPage = ({ item }) => {
    return (
      <ZoomableImage
        image={item}
        width={width}
        height={height}
        onZoomChange={setScrollEnabled}
      />
    );
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.closeButton}
            activeOpacity={0.8}
            onPress={onClose}
          >
            <Ionicons name="close" size={26} color="#FFFFFF" />
          </TouchableOpacity>

          {images.length > 1 ? (
            <Text style={styles.counter}>
              {activeIndex + 1} / {images.length}
            </Text>
          ) : null}
        </View>

        <FlatList
          data={images}
          keyExtractor={(item, index) => `${index}`}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEnabled={scrollEnabled}
          initialScrollIndex={Math.min(initialIndex, images.length - 1)}
          getItemLayout={(_, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
          onMomentumScrollEnd={handleScrollEnd}
          renderItem={renderPage}
          style={styles.list}
        />

        {images.length > 1 ? (
          <View style={styles.dotsRow}>
            {images.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  index === activeIndex && styles.dotActive,
                ]}
              />
            ))}
          </View>
        ) : null}

        <View style={styles.hintBar}>
          <Ionicons name="expand-outline" size={15} color="rgba(255,255,255,0.7)" />
          <Text style={styles.hintText}>
            {images.length > 1
              ? "Swipe to browse · Pinch to zoom"
              : "Pinch to zoom"}
          </Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0F19",
    justifyContent: "center",
  },

  topBar: {
    position: "absolute",
    top: Platform.OS === "ios" ? 52 : 28,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },

  closeButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(255,255,255,0.14)",
    alignItems: "center",
    justifyContent: "center",
  },

  counter: {
    fontSize: 14,
    fontFamily: "PoppinsMedium",
    color: "#FFFFFF",
  },

  list: {
    flexGrow: 0,
  },

  page: {
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  fullImage: {
    backgroundColor: "#0B0F19",
  },

  dotsRow: {
    position: "absolute",
    bottom: 70,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  dot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: "rgba(255,255,255,0.35)",
    marginHorizontal: 4,
  },

  dotActive: {
    width: 18,
    backgroundColor: "#FFFFFF",
  },

  hintBar: {
    position: "absolute",
    bottom: 32,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  hintText: {
    marginLeft: 6,
    fontSize: 12,
    fontFamily: "PoppinsRegular",
    color: "rgba(255,255,255,0.7)",
  },
});
