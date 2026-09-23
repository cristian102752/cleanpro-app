import { useRef, useEffect } from 'react';
import { Animated, Easing } from 'react-native';

// Semana 09 - Animaciones Básicas

export function useFadeIn(duration = 400, delay = 0) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration, delay, useNativeDriver: true, easing: Easing.out(Easing.ease) }),
      Animated.timing(translateY, { toValue: 0, duration, delay, useNativeDriver: true, easing: Easing.out(Easing.ease) }),
    ]).start();
  }, []);

  return { opacity, translateY };
}

export function useScaleOnPress() {
  const scale = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scale, { toValue: 0.95, useNativeDriver: true, speed: 50, bounciness: 4 }).start();
  };
  const onPressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 50, bounciness: 4 }).start();
  };

  return { scale, onPressIn, onPressOut };
}

export function useStaggeredFade(count: number, staggerDelay = 80) {
  const anims = useRef(Array.from({ length: count }, () => new Animated.Value(0))).current;

  useEffect(() => {
    Animated.stagger(
      staggerDelay,
      anims.map((anim) => Animated.timing(anim, { toValue: 1, duration: 400, useNativeDriver: true }))
    ).start();
  }, [count]);

  return anims;
}

export function useShimmer() {
  const shimmer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmer, { toValue: 1, duration: 1200, useNativeDriver: true, easing: Easing.linear })
    ).start();
  }, []);

  const translateX = shimmer.interpolate({ inputRange: [0, 1], outputRange: [-100, 200] });
  const opacity = shimmer.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0.3, 1, 0.3] });

  return { translateX, opacity };
}
