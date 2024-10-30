import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import axios from 'axios';

const TranslatorApp = () => {
  const [inputText, setInputText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('yoda');
  const [translatedText, setTranslatedText] = useState('');
  const [languageName, setLanguageName] = useState('Mestre Yoda');

  const translateText = async () => {
    try {
      let apiUrl = '';
      if (selectedLanguage === 'yoda') {
        apiUrl = `https://api.funtranslations.com/translate/yoda.json?text=${encodeURIComponent(inputText)}`;
      } else if (selectedLanguage === 'minion') {
        apiUrl = `https://funtranslations.com/api/minion?text=${encodeURIComponent(inputText)}`;
      }

      const response = await axios.get(apiUrl);
      setTranslatedText(response.data.contents.translated);
    } catch (error) {
      console.error('Erro ao traduzir texto:', error);
    }
  };

  const clearData = () => {
    setInputText('');
    setTranslatedText('');
    setLanguageName('');
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        Tradutor Universal
      </Text>
      <TextInput
        placeholder="Digite o texto"
        value={inputText}
        onChangeText={(text) => setInputText(text)}
        style={{ borderWidth: 1, borderColor: 'gray', padding: 8, marginBottom: 20 }}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Button
          title="Mestre Yoda"
          type="outline"
          onPress={() => {
            setSelectedLanguage('yoda');
            setLanguageName('Mestre Yoda');
          }}
          containerStyle={{ margin: 10 }}
          buttonStyle={{ borderColor: selectedLanguage === 'yoda' ? 'blue' : 'gray' }}
          titleStyle={{ color: selectedLanguage === 'yoda' ? 'blue' : 'gray' }}
        />
        <Button
          title="Minions"
          type="outline"
          onPress={() => {
            setSelectedLanguage('minion');
            setLanguageName('Minions');
          }}
          containerStyle={{ margin: 10 }}
          buttonStyle={{ borderColor: selectedLanguage === 'minion' ? 'blue' : 'gray' }}
          titleStyle={{ color: selectedLanguage === 'minion' ? 'blue' : 'gray' }}
        />
      </View>
      <Button
        title="Traduzir"
        onPress={translateText}
        containerStyle={{ margin: 10 }}
      />
      <Button
        title="Limpar"
        onPress={clearData}
        containerStyle={{ margin: 10 }}
        buttonStyle={{ backgroundColor: 'red' }}
      />
      <Text style={{ marginTop: 20 }}>
        Língua selecionada: {languageName}
      </Text>
      <Text style={{ marginTop: 10 }}>
        Tradução:
      </Text>
      <Text style={{ fontSize: 18 }}>
        {translatedText}
      </Text>
    </View>
  );
};

export default TranslatorApp;
