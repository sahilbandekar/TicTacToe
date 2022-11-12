import { StatusBar } from 'expo-status-bar';
import react from 'react';
import { FlatList, StyleSheet, Text, Image, TouchableOpacity, View } from 'react-native';
import { FancyAlert } from 'react-native-expo-fancy-alerts';

export default function App() {

  const [notification, setNotification] = react.useState("Player X to start")
  const [refresh, setRefresh] = react.useState(false)
  const [currentPlayer, setCurrentPlayer] = react.useState("X")
  const [whoWon, setwhoWon] = react.useState()
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  const [board, setBoard] = react.useState(
    [
      " ", " ", " ",
      " ", " ", " ",
      " ", " ", " "
    ]
  )

  const pressField = (index) => {
    let newBoard = board

    if (newBoard[index] !== "X" && newBoard[index] !== "O") {
      if (currentPlayer == "X") {
        newBoard[index] = "X"
        setCurrentPlayer("O")
        setNotification("Player O to move")
      }
      else {
        newBoard[index] = "O"
        setCurrentPlayer("X")
        setNotification("Player X to move")
      }
    }

    setBoard(newBoard)
    setRefresh(!refresh)
    checkIfPlayerWon()
  }


  const checkIfPlayerWon = async () => {
    if (board[0] == board[1] && board[1] == board[2] && board[0] !== " ") {
      playerWon(board[0])
      setVisible(true)
      await delay(1500)
      setVisible(false)
    } else if (board[3] == board[4] && board[4] == board[5] && board[3] !== " ") {
      playerWon(board[3])
      setVisible(true)
      await delay(1500)
      setVisible(false)
    } else if (board[6] == board[7] && board[7] == board[8] && board[6] !== " ") {
      playerWon(board[6])
      setVisible(true)
      await delay(1500)
      setVisible(false)
    } else if (board[0] == board[3] && board[3] == board[6] && board[0] !== " ") {
      playerWon(board[0])
      setVisible(true)
      await delay(1500)
      setVisible(false)
    } else if (board[1] == board[4] && board[4] == board[7] && board[1] !== " ") {
      playerWon(board[1])
      setVisible(true)
      await delay(1500)
      setVisible(false)
    } else if (board[2] == board[5] && board[5] == board[8] && board[2] !== " ") {
      playerWon(board[2])
      setVisible(true)
      await delay(1500)
      setVisible(false)
    } else if (board[0] == board[4] && board[4] == board[8] && board[0] !== " ") {
      playerWon(board[0])
      setVisible(true)
      await delay(1500)
      setVisible(false)
    } else if (board[2] == board[4] && board[4] == board[6] && board[2] !== " ") {
      playerWon(board[2])
      setVisible(true)
      await delay(1500)
      setVisible(false)
    }
  }


  const playerWon = async (symbol) => {
    setwhoWon("Hurray!! Player " + symbol + " Won!")
    await delay(1000)
    setBoard([
      " ", " ", " ",
      " ", " ", " ",
      " ", " ", " "
    ])

  }


  const [visible, setVisible] = react.useState(false);
  const toggleAlert = react.useCallback(() => {
    setVisible(!visible);
  }, [visible]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Image
        source={require('./assets/background.jpg')}
        style={styles.backgroundImage}
      />

      <Text style={styles.text1}>TicTacToe</Text>
      <Text style={styles.text2}>{notification}</Text>

      <View style={styles.flatlistContainer}>

        <Image
          source={require('./assets/bg.png')}
          style={styles.image}
        />

        <FlatList
          style={styles.list}
          data={board}
          numColumns={3}
          refreshing={true}
          extraData={refresh}
          renderItem={({ item, index }) =>
            <TouchableOpacity style={styles.square} onPress={() => pressField(index)}>
              <Text style={styles.textXO}>{item}</Text>
            </TouchableOpacity>
          }
        />
      </View>
      <FancyAlert
        visible={visible}
        icon={<View style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'red',
          borderRadius: 50,
          width: '100%',
        }}><Text>🤓</Text></View>}
        style={{ backgroundColor: 'white' }}
      >
        <Text style={{ marginTop: -16, marginBottom: 32 }}>{whoWon}</Text>
      </FancyAlert>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatlistContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
    width: '100%'
  },
  text1: {
    fontSize: 50,
    position: 'absolute',
    top: 60,
    color: 'white'
  },
  text2: {
    fontSize: 20,
    position: 'absolute',
    top: 130,
    color: 'white'
  },
  textXO: {
    fontSize: 60,
    color: 'white'
  },
  list: {
    height: 300,
    width: 300,
  },

  square: {
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    position: 'absolute',
  },
  backgroundImage: {
    position: 'absolute',
    zIndex: -1,
    width: '100%',
    heigth: '100%'
  }
});
