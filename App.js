import React from 'react';
import FloreaApp from "./src"
import MyProvider from "./src/application/provider/index";
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <MyProvider>
        <FloreaApp />
      </MyProvider>
    </SafeAreaProvider>
  );
}