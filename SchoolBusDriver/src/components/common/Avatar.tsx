// src/components/common/Avatar.tsx

import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ViewStyle,
  ImageStyle,
  TextStyle,
} from 'react-native';
import { colors, fontWeight } from '../../config/theme';

interface AvatarProps {
  uri?: string;
  name: string;
  size?: number;
  style?: ViewStyle;
}

const Avatar: React.FC<AvatarProps> = ({ uri, name, size = 48, style }) => {
  const getInitials = (fullName: string): string => {
    const names = fullName.trim().split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return names[0][0].toUpperCase();
  };

  // ✅ Define separate styles for Image and View
  const imageStyle: ImageStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
  };

  const viewStyle: ViewStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
  };

  if (uri) {
    return (
      <Image
        source={{ uri }}
        style={[styles.image, imageStyle, style as ImageStyle]} // ✅ correct type
        defaultSource={require('../../assets/images/default-avatar.png')}
      />
    );
  }

  return (
    <View style={[styles.placeholder, viewStyle, style]}>
      <Text style={[styles.initials, { fontSize: size * 0.4 }]}>
        {getInitials(name)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create<{
  image: ImageStyle;
  placeholder: ViewStyle;
  initials: TextStyle;
}>({
  image: {
    backgroundColor: colors.backgroundDark,
  },
  placeholder: {
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    color: colors.textLight,
    fontWeight: fontWeight.semibold,
  },
});

export default Avatar;
