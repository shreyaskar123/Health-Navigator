import React from 'react'
import { View, StyleSheet } from 'react-native'
// assets\50-material-loader.json
const AppLoader = ({ size }: { size: number }) => {
    return (
        <MotiView
            from={{
                width: size,
                height: size,
                borderRadius: size / 2
            }}
            animate={{
                width: size + 20,
                height: size + 20,
                borderRadius: (size + 20) / 2
            }}
            transition={{
                type: 'timing',
                duration: 1000,
                repeat: Infinity,
            }}
            style={{
                widht: size,
                height: size,
                borderRadius: size / 2,
                borderWidth: size / 10,
                borderColor: "#fff",
                shadowColor: "#fff",
                shadowOpacity: 1,
                shadowOffset: 1,
                shadowRadius: 10,

            }}
        />



    );
}

const style = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
    }
})

export default AppLoader; 