import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import ExtensionHomeScreen from "../../components/ExtensionHome/extensionhome";

export default function extensionhome() {
    return (
        <View style={styles.container}>
            <ExtensionHomeScreen />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
