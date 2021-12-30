import React, {useCallback, useState, useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {BlurView} from '@react-native-community/blur';

import {Colors} from 'react-native/Libraries/NewAppScreen';
export type ChartItem = {
  key: string;
  title: string;
  artist: string;
  coverUrl: string;
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState<Array<ChartItem>>();

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const headers = new Headers({
      'X-Parse-Application-Id': '0eXZT8bQ84OwzjiZ9eYLwPkmmtZ0DH3MLgk4JsIc',
      'X-Parse-REST-API-Key': 'NacNZEy6CEDQW0gX58xpyvR3xppjAibMhW5eigg7',
      'Content-Type': 'application/json',
    });
    const res = await fetch('https://parseapi.back4app.com/functions/charts', {
      method: 'POST',
      headers,
    });
    const result = await res.json();
    setData(result.result);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <LinearGradient colors={['#734b6d', '#E94057', '#F27121']}>
        {data && (
          <FlatList
            style={{
              paddingHorizontal: 20,
            }}
            refreshing={isLoading}
            onRefresh={fetchData}
            data={data}
            ListHeaderComponent={
              <Text
                style={{fontWeight: 'bold', fontSize: 20, paddingVertical: 20}}>
                Top Charts
              </Text>
            }
            keyExtractor={d => d.key}
            renderItem={({item}) => (
              <BlurView
                style={{
                  borderRadius: 10,
                  marginBottom: 20,
                  padding: 10,
                  backgroundColor: 'transparent',
                }}
                blurType="light"
                blurAmount={1}
                reducedTransparencyFallbackColor="white">
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    overflow: 'hidden',
                  }}>
                  <Image
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 10,
                      marginRight: 10,
                    }}
                    source={{uri: item.coverUrl}}
                  />
                  <View
                    style={{
                      alignItems: 'flex-start',
                      justifyContent: 'flex-start',
                    }}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{
                        width: '100%',
                        flexShrink: 1,
                        fontWeight: 'bold',
                        fontSize: 14,
                      }}>
                      {item.title}
                    </Text>

                    <Text style={{marginTop: 5}}>{item.artist}</Text>
                  </View>
                </View>
              </BlurView>
            )}
          />
        )}
        {/* </ScrollView> */}
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
});

export default App;
