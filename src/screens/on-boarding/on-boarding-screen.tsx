import React, { useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions, Platform, Alert } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolate, Extrapolate } from 'react-native-reanimated';
import { useTheme } from '../../context/theme-context';
import LocationService from '../../services/location-service';

const { width } = Dimensions.get('window');

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const OnBoardingScreen = () => {
  const { colors, changeTheme } = useTheme();
  const scrollX = useSharedValue(0);
  const flatListRef = useRef<FlatList>(null);

  const handleScroll = (event: any) => {
    scrollX.value = event.nativeEvent.contentOffset.x;
  };

  const handleNext = () => {
    const currentIndex = Math.round(scrollX.value / width);
    if (currentIndex < data.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
    }
  };

  const requestLocationPermission = async () => {
    let permissionGranted = await LocationService.checkLocationPermission();

    if (!permissionGranted) {
      const requestResults = await LocationService.requestLocationPermission();
      permissionGranted = requestResults.granted;
    }

    if (permissionGranted) {
      const currentLocation = await LocationService.getCurrentLocation();
      if (currentLocation) {
        // Save location to backend
        await LocationService.saveLocationToBackend(currentLocation);
      }
    }
  }

  const data = [
    {
      id: '1',
      title: 'Selamat Datang',
      description: 'Selamat datang di aplikasi Muslim App. Mari mulai perjalanan Anda.',
      image: require('../../assets/muslim-app-logo.png'),
      renderContent: () => (
        <TouchableOpacity style={[styles.button, { backgroundColor: colors.card.background }]} onPress={handleNext}>
          <Text style={[styles.buttonText, { color: colors.text.primary }]}>Mulai</Text>
        </TouchableOpacity>
      ),
    },
    {
      id: '2',
      title: 'Pilih Tema',
      description: 'Pilih tema aplikasi yang sesuai dengan preferensi Anda: terang atau gelap.',
      image: require('../../assets/muslim-app-logo.png'),
      renderContent: () => (
        <View style={styles.themeSelectionContainer}>
          <TouchableOpacity
            style={[styles.themeButton, { backgroundColor: colors.card.background }]} // Use card color for theme buttons
            onPress={() => {
              changeTheme('light');
              handleNext();
            }}
          >
            <Text style={[styles.buttonText, { color: colors.text.accent }]}>Light</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.themeButton, { backgroundColor: colors.card.background }]} // Use card color for theme buttons
            onPress={() => {
              changeTheme('dark');
              handleNext();
            }}
          >
            <Text style={[styles.buttonText, { color: colors.text.accent }]}>Dark</Text>
          </TouchableOpacity>
        </View>
      ),
    },
    {
      id: '3',
      title: 'Izin Lokasi',
      description: 'Izinkan akses lokasi untuk fitur yang lebih personal.',
      image: require('../../assets/muslim-app-logo.png'),
      renderContent: () => (
        <TouchableOpacity style={[styles.button, { backgroundColor: colors.card.background }]} onPress={requestLocationPermission}>
          <Text style={[styles.buttonText, { color: colors.text.accent }]}>Izinkan Lokasi</Text>
        </TouchableOpacity>
      ),
    },
    {
      id: '4',
      title: 'Selesai',
      description: 'Anda siap menggunakan aplikasi. Selamat menikmati!',
      image: require('../../assets/muslim-app-logo.png'),
      renderContent: () => (
        <TouchableOpacity style={[styles.button, { backgroundColor: colors.card.background }]} onPress={() => Alert.alert('Onboarding Selesai!')}>
          <Text style={[styles.buttonText, { color: colors.text.accent }]}>Selesai</Text>
        </TouchableOpacity>
      ),
    },
  ];

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    return (
      <View style={[styles.slide, { backgroundColor: colors.bg.primary, width }]}>
        <View style={styles.heroContainer}>
          <Image source={item.image} style={styles.heroImage} />
        </View>
        <View style={styles.contentContainer}>
          <Text style={[styles.title, { color: colors.text.primary }]}>{item.title}</Text>
          <Text style={[styles.description, { color: colors.text.secondary }]}>{item.description}</Text>
          {item.renderContent && item.renderContent()}
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg.primary }]}>
      <AnimatedFlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item: any) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
      <View style={styles.indicatorContainer}>
        {data.map((_, index) => {
          const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

          const indicatorWidth = useAnimatedStyle(() => {
            const widthAnimated = interpolate(
              scrollX.value,
              inputRange,
              [10, 30, 10],
              Extrapolate.CLAMP
            );
            return {
              width: widthAnimated,
              backgroundColor: colors.bg.secondary,
            };
          });

          return (
            <Animated.View
              key={index}
              style={[styles.indicator, indicatorWidth]}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  themeSelectionContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  themeButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginHorizontal: 10,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  indicator: {
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});

export default OnBoardingScreen;