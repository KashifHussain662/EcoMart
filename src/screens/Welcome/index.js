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
      title: 'Welcome to Zohaib Kiryana',
      description:
        'Fresh and quality groceries, from staples to snacks, delivered right to your doorstep.',
      image: require('../../assets/images/welcome1.png'),
    },
    {
      title: 'Shop with Ease',
      description:
        'Order everything from household essentials to beverages with just a few taps!',
      image: require('../../assets/images/welcome2.png'),
    },
    {
      title: 'Fast Delivery, Every Time!',
      description:
        'Get your daily essentials like spices, snacks, and more delivered quickly and safely to your home. No more long queues!',
      image: require('../../assets/images/welcome3.png'),
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
    width: 350,
    height: 350,
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
    width: '70%',
    backgroundColor: COLORS.dark,
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.light,
  },
  textContainer: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});

export default Welcome;
