import React from "react";
import {connect} from "react-redux";
import {List, ListItem} from "material-ui";
import StarIcon from "material-ui/svg-icons/toggle/star";
import MoodIcon from "material-ui/svg-icons/social/mood";
import PetsIcon from "material-ui/svg-icons/action/pets";
import FaveIcon from "material-ui/svg-icons/action/favorite";
import HandIcon from "material-ui/svg-icons/action/pan-tool";
import DndIcon from "material-ui/svg-icons/notification/do-not-disturb-on";
import DiceIcon from "material-ui/svg-icons/places/casino";
import RunIcon from "material-ui/svg-icons/maps/directions-run";
import FoodIcon from "material-ui/svg-icons/maps/local-dining";
import WineIcon from "material-ui/svg-icons/maps/local-bar";
import SnowIcon from "material-ui/svg-icons/places/ac-unit";
import TrainIcon from "material-ui/svg-icons/maps/train";
import CaseIcon from "material-ui/svg-icons/places/business-center";
import {createStructuredSelector} from "reselect";
import {insertEmoji, openEmojiGroup} from "./actions";
import {selectFavEmojis, selectOpenEmojiGroups} from "./selectors";
import muiThemeable from "material-ui/styles/muiThemeable";
import {injectIntl, intlShape} from "react-intl";
import emoji from "react-easy-emoji";
import messages from "./messages";
import styled from "styled-components";

/*
A categorized and expandable list of unicode emojis including users favorites.
*/
export class EmojiList extends React.PureComponent {

  styles = {
    list: {
      display: "flex",
      flexWrap: "wrap",
      marginLeft: "1em",
    },
    emoji: {
      width: "2em",
      height: "2em",
    }
  };

  render() {
    const {formatMessage} = this.props.intl;

    /* Categorized selection of unicode emojis */
    const emojis = [
      {
        name: messages.favorites,
        icon: <StarIcon/>,
        emojis: this.props.faves
      },{
        name: messages.smileys,
        icon: <MoodIcon/>,
        emojis: ["🙂","😀","😁","😂","😃","😄","😅","😆","😇","😈","😉","😊","😋","😌","😍","😎","😏","😐","😑","😒","😓",
          "😔","😕","😖","😗","😘","😙","😚","😛","😜","😝","😞","😟","😠","😡","😢","😣","😤","😥","😧","😨","😩","😪",
          "😫","😬","😭","😮","😯","😰","😱","😲","😳","😴","😵","😶","😷","😸","😹","😺","😻","😼","😽","😾","😿","🙀",
          "👺","👹","👽","💀","👻","👵","👴","👳","👼","👶"]
      },{
        name: messages.animals,
        icon: <PetsIcon/>,
        emojis: ["🐣","🐭","🐰","🐶","🐨","🐼","🐷","🐵","🙈","🙉","🙊","🐸","🐮","🐽","🐀","🐇","🐕","🐩","🐖","🐒","🐢",
          "🐌","🐛","🐍","🐬"]
      },{
        name: messages.love,
        icon: <FaveIcon/>,
        emojis: ["❤️","💋","💕","💔","💘","💏","💑","👫","👬","👭","💌","💍","👰","💒","🌹","🌺","🍀"]
      },{
        name: messages.gestures,
        icon: <HandIcon/>,
        emojis: ["🙍","🙎","🙅","💆","🙇","🙆","💁","💇","🙋","🙌","🙏","✌","👌","👏","☝","✋","👐","✊","👊","👍","👎",
          "👆","👇","👉","👈"]
      },{
        name: messages.nasty,
        icon: <DndIcon/>,
        emojis: ["💣","💥","🔥","🔪","🔫","💨","💩","🚬","💉","💊","🍄","💰"]
      },{
        name: messages.activities,
        icon: <DiceIcon/>,
        emojis: ["💤","🚽","🛀","🎓","📖","💻","🎨","📷","🎥","📺","🎮","🎤","🎸","🎹","🎵"]
      },{
        name: messages.sports,
        icon: <RunIcon/>,
        emojis: ["💪","⚽","🏀","🏈","🏃","🚴","👯","💃","🏇","🏂","🏊","💦","🏁","🏆"]
      },{
        name: messages.food,
        icon: <FoodIcon/>,
        emojis: ["🍕","🍟","🍔","🍣","🍳","🍗","🍰","🍩","🍪","🍫","🍨","🍭","☕","🍹","🍷","🍺","🍼","🍆","🍊","🍌","🍒"]
      },{
        name: messages.party,
        icon: <WineIcon/>,
        emojis: ["🎉","🎂","🎁","🎄","🎅","🎃","🎳","🎱","🎲","🎰","👠","💄","💅"]
      },{
        name: messages.weather,
        icon: <SnowIcon/>,
        emojis: ["💤","☀","☁","☔","✳","⛄","👙","🌴","👓"]
      },{
        name: messages.transport,
        icon: <TrainIcon/>,
        emojis: ["🚦","⛽","🚗","🚕","🚓","🚑","🚒","🚜","🚈","🚢","✈","🚀"]
      },{
        name: messages.business,
        icon: <CaseIcon/>,
        emojis: ["✔","✖","⚠","⛔","🔎","🔑","🔒","💡","⌚","☎","✉","💉","💊","©"]
      }
    ];

    /*
    ListItem injects a nestedLevel property into nested items.
    Standard HTML tags don't accept those, therefore a dummy component is needed.
    */
    const EmojiCategory = styled.div``;
    return (
      <List>
        {emojis.map((cat, key) =>
          <ListItem
            key={key}
            leftIcon={cat.icon}
            primaryText={formatMessage(cat.name)}
            primaryTogglesNestedList={true}
            open={this.props.openGroups.get(key)}
            onClick={this.props.openEmojiGroup.bind(this, key)}
            nestedItems={[
              <EmojiCategory
                key={key}
                style={this.styles.list}>
                {cat.emojis.map((char, key) =>
                  <div
                    key={key}
                    style={this.styles.emoji}
                    onClick={this.props.insertEmoji}>{emoji(char)}
                  </div>
                )}
              </EmojiCategory>
            ]}
          />
        )}
      </List>
    );
  }
}

EmojiList.propTypes = {
  intl: intlShape.isRequired,
  faves: React.PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  faves: selectFavEmojis(),
  openGroups: selectOpenEmojiGroups(),
});

const mapDispatchToProps = (dispatch) => ({
  insertEmoji: (event) => dispatch(insertEmoji(event.target.alt)),
  openEmojiGroup: (index) => dispatch(openEmojiGroup(index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(muiThemeable()(injectIntl(EmojiList)));
