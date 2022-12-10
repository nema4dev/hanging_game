import React from "react";
import { View,Image,StyleSheet} from "react-native";

import image0 from '../assets/0.png';
import image1 from '../assets/1.png';
import image2 from '../assets/2.png';
import image3 from '../assets/3.png';
import image4 from '../assets/4.png';
import image5 from '../assets/5.png';
import image6 from '../assets/6.png';
import image7 from '../assets/7.png';
import image8 from '../assets/8.png';
import image9 from '../assets/9.png';

const images: string[] = [
    image0,
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
];

interface Props {
    imageNumber: number;
}

const HangImage = ({ imageNumber }: Props) => {
    if ( imageNumber >= 9 ) {
        imageNumber = 9;
    }
    return (
        <View style={style.container}>
            <Image source={images[imageNumber]} style={style.image}/>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    image:{
        height: 347,
        width: 300,
    }    
})

export default HangImage;