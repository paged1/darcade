import { GLView } from 'expo';
import * as React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';

import DisableBodyScrollingView from '../../components/DisableBodyScrollingView';
import ExpoButton from '../../components/ExpoButton';
import GithubButton from '../../components/GithubButton';
import KeyboardControlsView from '../../components/KeyboardControlsView';
import logyo from '../../components/logyo';
import Game from './src/game';

function FlappyBird(props) {

    const { style, ...props } = props;
    const [score, setScore] = useState(0);
    var game
    
    // functional code
    return (
        <View
          style={[{ width: '100vw', height: '100vh', overflow: 'hidden' }, style]}
        >
          <DisableBodyScrollingView>
            <KeyboardControlsView
              onKeyDown={({ code }) => {
                if (game) {
                  if (code === 'Space') {
                    game.onPress();
                  }
                }
              }}
            >
              <TouchableWithoutFeedback
                onPressIn={() => {
                  if (game) game.onPress();
                }}
              >
                <GLView
                  style={{ flex: 1, backgroundColor: 'black' }}
                  onContextCreate={context => {
                    game = new Game(context);
                    game.onScore = setScore(score => score);
                  }}
                />
              </TouchableWithoutFeedback>
  
              <Score>{score}</Score>
            </KeyboardControlsView>
          </DisableBodyScrollingView>
          <ExpoButton />
          <GithubButton />
        </View>
    );

    
}

const Score = ({ children }) => (
    <Text
      style={{
        position: 'absolute',
        left: 0,
        top: '10%',
        right: 0,
        textAlign: 'center',
        color: 'white',
        fontSize: 48,
        userSelect: 'none',
      }}
    >
      {children}
    </Text>
);


export default withRouter(FlappyBird);