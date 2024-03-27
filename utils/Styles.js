import Colors from './Colors';
import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.primary,
    },
    paragraph: {
        fontSize: 16,
        color: Colors.secondary,
    },
    link: {
        fontSize: 16,
        color: Colors.link,
        textDecorationLine: 'underline',
    },
});

export default globalStyles;