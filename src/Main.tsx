import React from "react";
import { useEffect, useState } from 'react';
import { View, StyleSheet, Button ,Text } from "react-native";
import HangImage from "./components/HangImage";
import { letters } from "./helpers/letters";

import { getRandomWord } from './helpers/getRandomWord';

const Main = () => {
    const [word, setWord] = useState(getRandomWord());
    const [hiddenWord, setHiddenWord] = useState('_ '.repeat(word.length));
    const [attempts, setAttempts] = useState(0);
    const [lose, setLose] = useState(false);
    const [won, setWon] = useState(false);

    useEffect(() => {
        if (attempts >= 9) {
            setLose(true);
        }
    }, [attempts]);

    useEffect(() => {
        const currentHiddenWord = hiddenWord.split(' ').join('');
        if (currentHiddenWord === word) {
            setWon(true);
        }

    }, [hiddenWord])

    const checkLetter = (letter: string) => {
        if (lose) return;
        if (won) return;

        if (!word.includes(letter)) {
            setAttempts(Math.min(attempts + 1, 9));
            return;
        }

        const hiddenWordArray = hiddenWord.split(' ');

        for (let i = 0; i < word.length; i++) {
            if (word[i] === letter) {
                hiddenWordArray[i] = letter;
            }
        }
        setHiddenWord(hiddenWordArray.join(' '));
    }

    const newGame = () => {
        const newWord = getRandomWord();
        setWord(newWord);
        setHiddenWord('_ '.repeat(newWord.length));

        setAttempts(0);
        setLose(false);
        setWon(false);
    }
    return (
        <View style={style.container}>
            
            <View style={style.board}>           
                {
                    ( lose ) 
                    ? <Text style={style.indicator}>Lo siento, usted perdiò</Text>
                    : <Text style={style.indicator}></Text>
                }       
                {
                    ( won ) 
                    ? <Text style={style.indicator}>Felicidades, usted ganó</Text>
                    : <Text style={style.indicator}></Text>
                }
            </View> 

            <HangImage style={style.image} imageNumber={attempts} />

            <View style={style.board}>
                <Text style={style.hiddenWord}>{ hiddenWord }</Text>
            </View>

            <View style={style.board}>
                <Text style={style.attempts}>Intentos: { attempts }</Text>
            </View>

            <View style={style.board}>
                {letters.map((letter) => (
                    <Button
                        key={letter}
                        title={letter}
                        color="black"
                        style={style.key}
                        onPress={() => checkLetter(letter)}
                    />
                ))}
            </View>
           
           <View style={style.board}>
            <Button
                title="Nuevo Juego"
                color="black"
                style={style.button}
                onPress={() => newGame()}
            />
            </View>

        </View>
    )
}

const style = StyleSheet.create({
    container: {
        top: 170,
        justifyContent: "center",
    },
    board: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
    },
    image: {
        width: 300,
        height: 300,
        resizeMode: "contain",
    },
    key: {
        width: 50,
    },
    button: {
        color: "red",
        backgroundColor: "red",
    },
    attempts: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    hiddenWord: {
        alignItems: 'center',
        justifyContent: 'center',
        color: 'black',
        fontSize: 40,
        marginBottom: 20
    },
    indicator: {
        color: 'red',
        fontSize: 20,
        marginBottom: 20, 
    }   
})

export default Main;