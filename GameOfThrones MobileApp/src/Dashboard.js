import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, ActivityIndicator, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const Dashboard = () => {
  const navigation = useNavigation();
  const [characters, setCharacters] = useState([]);
  const [originalCharacters, setOriginalCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    try {
      const response = await fetch('https://thronesapi.com/api/v2/Characters');
      const data = await response.json();
      setCharacters(data);
      setOriginalCharacters(data); // Set original characters list
      setLoading(false);
    } catch (error) {
      console.error('Error fetching characters:', error);
      setLoading(false);
    }
  };

  const handleSettingsPress = () => {
    navigation.navigate('Settings');
  };

  const renderCharacter = ({ item }) => (
    <TouchableOpacity style={styles.characterItem}>
      <Image
        source={{ uri: `${item.imageUrl}` }}
        style={styles.characterImage}
        resizeMode="cover"
      />
      <View style={styles.characterDetails}>
        <Text style={styles.characterName}>{item.fullName}</Text>
        <Text style={styles.characterTitle}>{item.title}</Text>
        <Text style={styles.characterFamily}>{item.family}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filteredCharacters = originalCharacters.filter(
      (character) =>
        character.fullName.toLowerCase().includes(text.toLowerCase())
    );
    setCharacters(filteredCharacters);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setCharacters(originalCharacters); // Reset characters list to original
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleSettingsPress} style={styles.button}>
        <Ionicons name="settings-outline" size={40} color="white" />
      </TouchableOpacity>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by name..."
        placeholderTextColor="white"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
        <Text style={{ color: '#FFD482' }}>Clear</Text>
      </TouchableOpacity>
      <FlatList
        data={characters}
        renderItem={renderCharacter}
        keyExtractor={(item) => item.id.toString()}
        style={styles.characterList}
      />
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: 'center',
    backgroundColor: '#1E1E1E'
  },
  button: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 1,
  },
  searchInput: {
    width: '77%',
    height: 40,
    borderColor: '#CCCCCC',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 60,
    marginLeft: 20,
    color: "white",
    backgroundColor: '#3D3D3D'
  },
  clearButton: {
    position: 'absolute',
    top: 70,
    right: 80,
    color: 'white',
  },
  characterList: {
    width: '100%',
    marginTop: 20,
    color: 'white',
    marginBottom: 20,

  },
  characterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    padding: 9,
    backgroundColor: '#3D3D3D',
    borderRadius: 10,
    color: 'white',
    margin: 5,
    left: 15,

  },
  characterImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginRight: 20,
  },
  characterDetails: {
    flex: 1,
  },
  characterName: {
    fontSize: 16,
    color: '#FFD482',
  },
  characterTitle: {
    fontSize: 13,
    color: '#666666',
    color: '#FFFFFF',
  },
  characterFamily: {
    fontSize: 12,
    color: '#C0C0C0',
  },
});
