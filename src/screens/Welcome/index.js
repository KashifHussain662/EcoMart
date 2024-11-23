import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '../../theme';

const {width} = Dimensions.get('window');

const Welcome = () => {
  const navigation = useNavigation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollViewRef = useRef();

  const slides = [
    {
      title: 'Welcome to Our App',
      description:
        'Discover amazing features and services tailored just for you.',
      image: require('../../assets/images/logo.png'),
    },
    {
      title: 'Simplify Your Life',
      description: 'Our app helps you stay connected and productive every day!',
      image: require('../../assets/images/logo.png'),
    },
    {
      title: 'Start Your Journey!',
      description:
        'Join us and experience a world of opportunities at your fingertips.',
      image: require('../../assets/images/logo.png'),
    },
  ];

  const handleScroll = event => {
    const slideIndex = Math.floor(event.nativeEvent.contentOffset.x / width);
    setCurrentSlide(slideIndex);
  };

  const navigateToScreen = () => {
    if (currentSlide < slides.length - 1) {
      const nextSlide = currentSlide + 1;
      setCurrentSlide(nextSlide);
      scrollViewRef.current.scrollTo({x: nextSlide * width, animated: true});
    } else {
      navigation.navigate('CreateAccount');
    }
  };

  const renderDots = () => (
    <View style={styles.paginationContainer}>
      {slides.map((_, index) => (
        <View
          key={index}
          style={[
            styles.paginationDot,
            currentSlide === index ? styles.activeDot : styles.inactiveDot,
          ]}
        />
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Skip Button */}
      <TouchableOpacity
        style={styles.skipButton}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
      <View></View>

      {/* Slide Content */}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        ref={scrollViewRef}>
        {slides.map((slide, index) => (
          <View key={index} style={styles.slide}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{slide.title}</Text>
              <Text style={styles.description}>{slide.description}</Text>
            </View>
            <Image source={slide.image} style={styles.image} />
          </View>
        ))}
      </ScrollView>

      {/* Dots and Next Button */}
      <View style={styles.footer}>
        {renderDots()}
        <TouchableOpacity style={styles.nextButton} onPress={navigateToScreen}>
          <Text style={styles.buttonText}>
            {currentSlide === slides.length - 1 ? 'Start' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  skipButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
    padding: 10,
  },
  skipText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: 'bold',
  },
  slide: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: COLORS.light,
    textAlign: 'center',
    marginBottom: 30,
    width: '80%',
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  paginationContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: COLORS.primary,
  },
  inactiveDot: {
    backgroundColor: COLORS.light,
  },
  nextButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.background,
  },
  textContainer: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});

export default Welcome;
