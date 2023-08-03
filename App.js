import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Image, Dimensions } from 'react-native';
import Start from "./start";
import styles from './style';

const GameScreen = () => {
  const [username, setUserName] = useState(null);
  const [userSelection, setUserSelection] = useState('');
  const [enemySelection, setEnemySelection] = useState('');
  const [score, setScore] = useState({ user: 0, enemy: 0 });
  const [gameWinner, setGameWinner] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [roundCount, setRoundCount] = useState(0);

  useEffect(() => {
    if (score.user === 2 || score.enemy === 2) {
      determineGameWinner();
    }
  }, [score]);

  const handleUserSelection = (selection) => {
    if (gameWinner) {
      return; // Ignore user selection after the game ends
    }
    setUserSelection(selection);
    generateEnemySelection(selection); // Pass user selection to generateEnemySelection function
  };

  const generateEnemySelection = (userSelection) => {
    const options = ['Rock', 'Paper', 'Scissors'];
    const randomIndex = Math.floor(Math.random() * options.length);
    const selection = options[randomIndex];
    setEnemySelection(selection);
    determineRoundWinner(userSelection, selection);
  };

  const determineRoundWinner = (userSelection, enemySelection) => {
    if (
      (userSelection === 'Rock' && enemySelection === 'Scissors') ||
      (userSelection === 'Paper' && enemySelection === 'Rock') ||
      (userSelection === 'Scissors' && enemySelection === 'Paper')
    ) {
      setScore((prevScore) => ({
        ...prevScore,
        user: prevScore.user + 1,
      }));
    } else if (
      (enemySelection === 'Rock' && userSelection === 'Scissors') ||
      (enemySelection === 'Paper' && userSelection === 'Rock') ||
      (enemySelection === 'Scissors' && userSelection === 'Paper')
    ) {
      setScore((prevScore) => ({
        ...prevScore,
        enemy: prevScore.enemy + 1,
      }));
    }
    setModalVisible(true);
    setRoundCount((prevRoundCount) => prevRoundCount + 1);
  };

  const determineGameWinner = () => {
    if (score.user === 2) {
      setGameWinner(username);
    } else {
      setGameWinner('Enemy');
    }
  };

  const resetGame = () => {
    setUserSelection('');
    setEnemySelection('');
    setScore({ user: 0, enemy: 0 });
    setGameWinner('');
    setRoundCount(0);
  };

  return (
    <View style={styles.container}>
      {username ? (
        <>
      <View style={styles.title}>
        <View style={styles.titleContainer}>
          <Text style={styles.title1}>A Fistful</Text>
        </View>
        <View>
          <Text style={styles.title2}>of Destiny</Text>
        </View>
      </View>
      {/* {userSelection ? (
        <Text style={styles.enemySelection}>
          Enemy's Selection: {enemySelection}
        </Text>
      ) : null} */}
      <View style={styles.selections}>
        <TouchableOpacity
          style={[
            styles.enemybutton,
            enemySelection === 'Rock' && { backgroundColor: '#7E57C2' },
            enemySelection !== '' && styles.disabledButton,
            enemySelection === 'Rock' && styles.highlightedButton,
          ]}
         disabled={true}
        >
          <Image
            source={require('./assets/rock.png')}
            style={styles.buttonImage}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.enemybutton,
            enemySelection === 'Paper' && { backgroundColor: '#7E57C2' },
            enemySelection !== '' && styles.disabledButton,
            enemySelection === 'Paper' && styles.highlightedButton,
          ]}
          disabled={true}
        >
          <Image
            source={require('./assets/paper.png')}
            style={styles.buttonImage}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.enemybutton,
            enemySelection === 'Scissors' && { backgroundColor: '#7E57C2' },
            enemySelection !== '' && styles.disabledButton,
            enemySelection === 'Scissors' && styles.highlightedButton,
          ]}
          disabled={true}
        >
          <Image
            source={require('./assets/scissors.png')}
            style={styles.buttonImage}
          />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.score}>
          Score: {score.user} - {score.enemy}
        </Text>
      </View>
      {gameWinner ? (
        <Text
          style={[
            styles.gameWinner,
            { color: gameWinner === username ? '#00ff00' : '#ff0000' },
          ]}
        >
          {gameWinner} Wins
        </Text>
      ) : null}
      <View style={styles.selections}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#7E57C2' }, userSelection === 'Rock' && styles.highlightedButton]}
          onPress={() => handleUserSelection('Rock')}
        >
          <Image
            source={require('./assets/rock.png')}
            style={styles.buttonImage}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#7E57C2' }, userSelection === 'Paper' && styles.highlightedButton]}
          onPress={() => handleUserSelection('Paper')}
        >
          <Image
            source={require('./assets/paper.png')}
            style={styles.buttonImage}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#7E57C2' }, userSelection === 'Scissors' && styles.highlightedButton]}
          onPress={() => handleUserSelection('Scissors')}
        >
          <Image
            source={require('./assets/scissors.png')}
            style={styles.buttonImage}
          />
        </TouchableOpacity>
      </View>
      {gameWinner ? (
        <View>
          <View>
            <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
              <Text style={styles.resetButtonText}>Restart Game</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
      </> ) 
      : (
        <Start setUserName={setUserName} />
      )}
    </View>
  );
};

export default GameScreen;
