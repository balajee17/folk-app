import React, {useEffect} from 'react';
import {View} from 'react-native';
import {
  Canvas,
  Path,
  Skia,
  useValue,
  runTiming,
  Easing,
  useComputedValue,
} from '@shopify/react-native-skia';

const WaveSkia = ({percentage = 60}) => {
  const width = 300;
  const height = 200;

  const horizontalOffset = useValue(0);
  const verticalFill = useValue(height); // Start from bottom (100%)

  // Animate vertical fill once on mount
  useEffect(() => {
    runTiming(verticalFill, height * (1 - percentage / 100), {
      duration: 3000,
      easing: Easing.inOut(Easing.cubic),
    });

    const loop = () => {
      runTiming(horizontalOffset, 100, {
        duration: 2000,
        easing: Easing.linear,
      }).then(() => {
        horizontalOffset.current = 0;
        loop(); // loop animation
      });
    };

    loop();
  }, [percentage]);

  // Recalculate the wave path dynamically
  const path = useComputedValue(() => {
    const p = Skia.Path.Make();
    const waveHeight = 10;
    const waveLength = 100;

    const offset = -horizontalOffset.current;
    const topY = verticalFill.current;

    p.moveTo(offset, topY);

    for (let x = offset; x <= width + waveLength; x += waveLength) {
      const cp1 = {x: x + waveLength / 4, y: topY - waveHeight};
      const cp2 = {x: x + waveLength / 2, y: topY};
      p.quadTo(cp1.x, cp1.y, cp2.x, cp2.y);
    }

    p.lineTo(width, height);
    p.lineTo(0, height);
    p.close();

    return p;
  }, [horizontalOffset, verticalFill]);

  return (
    <View
      style={{
        width,
        height,
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: '#e0f7fa',
      }}>
      <Canvas style={{flex: 1}}>
        <Path path={path} color="#4fc3f7" />
      </Canvas>
    </View>
  );
};

export default WaveSkia;
