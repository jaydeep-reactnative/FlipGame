import React, {useState, useEffect, useCallback, useRef} from 'react';
import {Provider, connect} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {saveGameData, store, persistor} from './redux';
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  FlatList,
  Image,
} from 'react-native';
import styles from './AppStyles';
import ScalableText from 'react-native-text';
import {Col, Row, Grid} from 'react-native-easy-grid';
import CardFlip from 'react-native-card-flip';
import Dialog from 'react-native-dialog';
import Modal from 'react-native-modal';

const duplicateCard = () => {
  return [0, 1, 2, 3, 4, 5, 6, 7].flatMap(val => [val, val]);
};

const randomCards = cards => {
  return [...cards.sort(() => Math.random() - 0.5)];
};

const App = props => {
  const cardRefs = useRef([]);
  const [shuffledCards, setShuffledCards] = useState(() =>
    randomCards(duplicateCard()),
  );
  const [openCards, setOpenCards] = useState([]);
  const [clearedCards, setClearedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [name, setName] = useState('');
  const [modalOpen, isModalOpen] = useState(false);

  const handleSave = () => {
    // redux logic
    props.saveScore({name, score: moves});
    setName('');
    restartGame();
  };

  const restartGame = () => {
    setShuffledCards(randomCards(duplicateCard()));
    for (let c of clearedCards) {
      cardRefs.current[c].flip();
    }
    setMoves(0);
    setClearedCards([]);
    setOpenCards([]);
  };

  const onFlipCard = card => {
    cardRefs.current[card].flip();
    if (openCards.length === 1) {
      setOpenCards(cards => [...cards, card]);
    } else {
      setOpenCards([card]);
    }
  };

  useEffect(() => {
    if (openCards.length === 2) {
      setMoves(m => m + 1);
      compareCards();
    }
  }, [openCards, compareCards]);

  const compareCards = useCallback(() => {
    const [first, second] = openCards;
    if (shuffledCards[first] === shuffledCards[second]) {
      setOpenCards([]);
      setClearedCards(cards => [...cards, first, second]);
      return;
    }
    setTimeout(() => {
      cardRefs.current[first].flip();
      cardRefs.current[second].flip();
      setOpenCards([]);
    }, 500);
  }, [openCards, shuffledCards]);

  const isGameOver = () => clearedCards.length === shuffledCards.length;

  const renderItem = scoreData => (
    <View style={styles.item}>
      <ScalableText style={styles.txtName}>{scoreData.name}</ScalableText>
      <ScalableText style={styles.txtScore}>{scoreData.score}</ScalableText>
    </View>
  );

  const scoreData = props.scoresReducer;
  const scoreSorted = scoreData.sort((a, b) => a.score - b.score);

  return (
    <SafeAreaView style={styles.container}>
      <Dialog.Container visible={isGameOver()}>
        <Dialog.Title>Game Over</Dialog.Title>
        <Dialog.Description>Your Moves: {moves}</Dialog.Description>
        <Dialog.Description>Please Enter Your Full Name</Dialog.Description>
        <Dialog.Input
          placeholder="Full Name"
          value={name}
          onChangeText={text => setName(text)}
        />
        <Dialog.Button label="Save" onPress={handleSave} />
      </Dialog.Container>
      <Grid style={styles.grid}>
        <Row style={styles.topBar}>
          <View style={styles.scoreView}>
            <View style={styles.winView}>
              <ScalableText style={styles.hits}>Moves: </ScalableText>
              <ScalableText style={styles.hitsCount}>{moves}</ScalableText>
            </View>
          </View>
          <View style={styles.btnsView}>
            <TouchableOpacity
              style={styles.btnReset}
              onPress={() => restartGame()}>
              <ScalableText style={styles.txtReset}>Reset</ScalableText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnScoreCard}
              onPress={() => isModalOpen(true)}>
              <ScalableText style={styles.txtScoreCard}>
                Score Card
              </ScalableText>
            </TouchableOpacity>
          </View>
        </Row>
        <Row style={styles.bottomBar}>
          {[0, 1, 2, 3].map(id => (
            <Col key={id} style={styles.mainCol1}>
              {shuffledCards.slice(4 * id, 4 * id + 4).map((card, idx) => {
                return (
                  <CardFlip
                    style={styles.col1}
                    ref={c => cardRefs.current.push(c)}
                    key={4 * id + idx}>
                    <TouchableOpacity
                      style={styles.face}
                      onPress={() => onFlipCard(4 * id + idx)}>
                      <Image
                        resizeMode="cover"
                        source={require('../jack.png')}
                        style={styles.jsckImage}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.back}
                      onPress={() => onFlipCard(4 * id + idx)}>
                      <ScalableText style={styles.cardNumber}>
                        {card}
                      </ScalableText>
                    </TouchableOpacity>
                  </CardFlip>
                );
              })}
            </Col>
          ))}
        </Row>
      </Grid>
      <Modal
        isVisible={modalOpen}
        backdropColor="#000000"
        backdropOpacity={0.9}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={600}
        animationOutTiming={600}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={600}
        onBackdropPress={() => isModalOpen(false)}>
        <ScalableText style={styles.scoreCardTxt}>Score Card</ScalableText>
        <FlatList
          data={scoreSorted}
          renderItem={score => renderItem(score.item)}
          keyExtractor={scoreIndex => Math.random()}
          style={styles.flatList}
        />
        <TouchableOpacity
          style={styles.btnClose}
          onPress={() => isModalOpen(false)}>
          <ScalableText style={styles.txtClose}>Close</ScalableText>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const AppContainer = connect(
  state => state,
  dispatch => ({
    saveScore: payload => dispatch(saveGameData(payload)),
  }),
)(App);

const Main = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppContainer />
    </PersistGate>
  </Provider>
);

export default Main;
