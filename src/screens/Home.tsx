import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View
} from 'react-native';
import { useSelector } from 'react-redux';
import { COLORS, FONTSIZE, SPACING } from '../common/Constants';
import { HomeScreenStyles } from '../common/GlobalStyles';
import CoffeeCard from '../components/CoffeeCard';
import CustomIcon from '../components/CustomIcon';
import CoffeeData from '../data/CoffeeData';
import useDispatch from '../hooks/useDispatch';
import { addToCart, calculateCartPrice } from '../reducers/productReducer';

const Home = ({navigation}: any) => {
  useEffect(() => {
    getCategories();
  }, []);

  const [categories, setCategories] = useState<string[]>([]);
  
  const coffeArray = useSelector((state:any) => state.favorites.CoffeeList);
  const BeansData =  useSelector((state:any) => state.favorites.BeanList);
 

  useEffect(() => {
    // Set the initial category once categories are populated
    if (categories.length > 0) {
      setCategoryIndex({index: 0, category: categories[0]});
      setSortedCoffee(getCoffeeList(categories[0], CoffeeData));
    }
  }, [categories]);

  const getCategories = () => {
    const coffeArray = CoffeeData;
    const categorySet = new Set();
    coffeArray.forEach(coffee => {
      categorySet.add(coffee.name);
    });
    const categorySetArray = [...categorySet] as string[];
    categorySetArray.unshift('All');
    setCategories(categorySetArray);
  };

  const getCoffeeList = (category: string, data: any) => {
    if (category === 'All') {
      return data;
    } else {
      const sortedCoffeeList = data.filter(
        (coffee: {name: string}) => coffee.name === category,
      );
      return sortedCoffeeList;
    }
  };

  const [categoryIndex, setCategoryIndex] = useState({
    index: 0,
    category: '',
  });
  const [sortedCoffee, setSortedCoffee] = useState(
    getCoffeeList(categoryIndex.category, CoffeeData),
  );
  const [searchText, setSearchText] = useState('');

  const searchCoffee = (search: string) => {
    if (search != '') {
      ListRef?.current?.scrollToOffset({
        animated: true,
        offset: 0,
      });
      setCategoryIndex({index: 0, category: categories[0]});
      setSortedCoffee([
        ...coffeArray.filter((item: any) =>
          item.name.toLowerCase().includes(search.toLowerCase()),
        ),
      ]);
    } else if (search == '' || search == null || search == undefined) {
      setSortedCoffee([...coffeArray]);
    }
  };

  const resetSearchCoffee = () => {
    ListRef?.current?.scrollToOffset({
      animated: true,
      offset: 0,
    });
    setCategoryIndex({index: 0, category: categories[0]});
    setSortedCoffee([...coffeArray]);
    setSearchText('');
  };

  const ListRef: any = useRef<FlatList>();
  const dispatch = useDispatch();

  // Add to cart
  const CoffeCardAddToCart = ({
    id,
    index,
    name,
    roasted,
    imagelink_square,
    special_ingredient,
    type,
    prices,
  }: any) => {
    
    dispatch(addToCart({
      id,
      index,
      name,
      roasted,
      imagelink_square,
      special_ingredient,
      type,
      prices,
    }));
    dispatch(calculateCartPrice());
    ToastAndroid.showWithGravity(
      `${name} is Added to Cart`,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

  return (
    <View style={HomeScreenStyles.Container}>
      <ScrollView>
        {/* App Title */}
        <Text style={HomeScreenStyles.Title}>
          Find the best{'\n'}coffee for you
        </Text>

        {/* Search Bar */}
        <View style={HomeScreenStyles.SearchBar}>
          <TouchableOpacity>
            <CustomIcon
              name="search"
              color={COLORS.primaryLightGreyHex}
              style={{marginHorizontal: SPACING.space_20}}
              size={FONTSIZE.size_18}
            />
          </TouchableOpacity>
          <TextInput
            placeholderTextColor={COLORS.primaryLightGreyHex}
            style={HomeScreenStyles.TextInputContainer}
            placeholder="Find your coffee..."
            value={searchText}
            onChangeText={text => {
              setSearchText(text);
              searchCoffee(text);
            }}
          />
          {searchText.length > 0 ? (
            <TouchableOpacity
              onPress={() => {
                resetSearchCoffee();
              }}>
              <CustomIcon
                style={HomeScreenStyles.InputIcon}
                name="close"
                size={FONTSIZE.size_16}
                color={COLORS.primaryLightGreyHex}
              />
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={HomeScreenStyles.CategoryScrollViewStyle}>
          {categories.map((data, index) => (
            <View
              key={index.toString()}
              style={HomeScreenStyles.CategoryScrollViewContainer}>
              <TouchableOpacity
                style={HomeScreenStyles.CategoryScrollViewItem}
                onPress={() => {
                  ListRef?.current?.scrollToOffset({
                    animated: true,
                    offset: 0,
                  });
                  setCategoryIndex({index: index, category: categories[index]});
                  setSortedCoffee([
                    ...getCoffeeList(categories[index], CoffeeData),
                  ]);
                }}>
                <Text
                  style={[
                    HomeScreenStyles.CategoryText,
                    categoryIndex.index == index
                      ? {color: COLORS.primaryOrangeHex}
                      : {},
                  ]}>
                  {data}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/* Coffee List */}
        <FlatList
          ref={ListRef}
          data={sortedCoffee}
          horizontal
          contentContainerStyle={HomeScreenStyles.FlatListContainer}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={
            <View style={HomeScreenStyles.EmptyListContainer}>
              <Text style={HomeScreenStyles.CategoryText}>
                No Coffee Available
              </Text>
            </View>
          }
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.push('Details', {
                    index: item.index,
                        id: item.id,
                        type: item.type,
                  });
                }}>
                <CoffeeCard
                  id={item.id}
                  index={item.index}
                  type={item.type}
                  roasted={item.roasted}
                  imagelink_square={item.imagelink_square}
                  name={item.name}
                  special_ingredient={item.special_ingredient}
                  average_rating={item.average_rating}
                  price={item.prices[2]}
                  buttonPressHandler={CoffeCardAddToCart} favourite={false}/>
              </TouchableOpacity>
            );
          }}
        />

        <Text style={HomeScreenStyles.CoffeeBeansTitle}>Coffee beans</Text>

        <FlatList
          ref={ListRef}
          data={BeansData}
          horizontal
          contentContainerStyle={HomeScreenStyles.FlatListContainer}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <TouchableOpacity 
              onPress={() => {
                navigation.push('Details', {
                  index: item.index,
                      id: item.id,
                      type: item.type,
                });
              }}
              >
                <CoffeeCard
                  id={item.id}
                  index={item.index}
                  type={item.type}
                  roasted={item.roasted}
                  imagelink_square={item.imagelink_square}
                  name={item.name}
                  special_ingredient={item.special_ingredient}
                  average_rating={item.average_rating}
                  price={item.prices[2]}
                  buttonPressHandler={CoffeCardAddToCart} favourite={false} />
              </TouchableOpacity>
            );
          }}
        />
      </ScrollView>
    </View>
  );
};

export default Home;


