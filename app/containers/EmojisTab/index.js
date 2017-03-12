import React from "react";
import {connect} from "react-redux";
import {List} from "material-ui";
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
import EmojiCategory from "../../components/EmojiCategory";
import {createStructuredSelector} from "reselect";
import {insertEmoji, openEmojiGroup} from "./actions";
import {selectFavEmojis, selectOpenEmojiGroups} from "./selectors";
import muiThemeable from "material-ui/styles/muiThemeable";

export class EmojiList extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  emojis = [
    {
      name: "Smileys",
      icon: <MoodIcon/>,
      emojis: ["🙂","😀","😁","😂","😃","😄","😅","😆","😇","😈","😉","😊","😋","😌","😍","😎","😏","😐","😑","😒","😓",
        "😔","😕","😖","😗","😘","😙","😚","😛","😜","😝","😞","😟","😠","😡","😢","😣","😤","😥","😧","😨","😩","😪",
        "😫","😬","😭","😮","😯","😰","😱","😲","😳","😴","😵","😶","😷","😸","😹","😺","😻","😼","😽","😾","😿","🙀",
        "👺","👹","👽","💀","👻","👵","👴","👳","👼","👶"]
    },{
      name: "Animals",
      icon: <PetsIcon/>,
      emojis: ["🐣","🐭","🐰","🐶","🐨","🐼","🐷","🐵","🙈","🙉","🙊","🐸","🐮","🐽","🐀","🐇","🐕","🐩","🐖","🐒","🐢",
        "🐌","🐛","🐍","🐬"]
    },{
      name: "Love",
      icon: <FaveIcon/>,
      emojis: ["❤️","💋","💕","💔","💘","💏","💑","👫","👬","👭","💌","💍","👰","💒","🌹","🌺","🍀"]
    },{
      name: "Gestures",
      icon: <HandIcon/>,
      emojis: ["🙍","🙎","🙅","💆","🙇","🙆","💁","💇","🙋","🙌","🙏","✌","👌","👏","☝","✋","👐","✊","👊","👍","👎",
        "👆","👇","👉","👈"]
    },{
      name: "Nasty",
      icon: <DndIcon/>,
      emojis: ["💣","💥","🔥","🔪","🔫","💨","💩","🚬","💉","💊","🍄","💰"]
    },{
      name: "Activities",
      icon: <DiceIcon/>,
      emojis: ["💤","🚽","🛀","🎓","📖","💻","🎨","📷","🎥","📺","🎮","🎤","🎸","🎹","🎵"]
    },{
      name: "Sports",
      icon: <RunIcon/>,
      emojis: ["💪","⚽","🏀","🏈","🏃","🚴","👯","💃","🏇","🏂","🏊","💦","🏁","🏆"]
    },{
      name: "Food",
      icon: <FoodIcon/>,
      emojis: ["🍕","🍟","🍔","🍣","🍳","🍗","🍰","🍩","🍪","🍫","🍨","🍭","☕","🍹","🍷","🍺","🍼","🍆","🍊","🍌","🍒"]
    },{
      name: "Party",
      icon: <WineIcon/>,
      emojis: ["🎉","🎂","🎁","🎄","🎅","🎃","🎳","🎱","🎲","🎰","👠","💄","💅"]
    },{
      name: "Weather",
      icon: <SnowIcon/>,
      emojis: ["💤","☀","☁","☔","✳","⛄","👙","🌴","👓"]
    },{
      name: "Transport",
      icon: <TrainIcon/>,
      emojis: ["🚦","⛽","🚗","🚕","🚓","🚑","🚒","🚜","🚈","🚢","✈","🚀"]
    },{
      name: "Business",
      icon: <CaseIcon/>,
      emojis: ["✔","✖","⚠","⛔","🔎","🔑","🔒","💡","⌚","☎","✉","💉","💊","©"]
    }
  ];

  render() {
    return (
      <List>
        <EmojiCategory
          name={"Favorites"}
          icon={<StarIcon/>}
          emojis={this.props.faves}
          onClick={this.props.insertEmoji}
          open={this.props.openGroups.get(0) == undefined ? true : this.props.openGroups.get(0)}
          onOpen={this.props.openEmojiGroup.bind(this, 0)}
        />
        {this.emojis.map((category, key) =>
          <EmojiCategory
            key={key+1}
            name={category.name}
            icon={category.icon}
            emojis={category.emojis}
            onClick={this.props.insertEmoji}
            open={this.props.openGroups.get(key + 1) === true}
            onOpen={this.props.openEmojiGroup.bind(this, key+1)}
          />
        )}
      </List>
    );
  }
}

EmojiList.propTypes = {
  faves: React.PropTypes.array,
}

const mapStateToProps = createStructuredSelector({
  faves: selectFavEmojis(),
  openGroups: selectOpenEmojiGroups(),
});

const mapDispatchToProps = (dispatch) => ({
  insertEmoji: (event) => dispatch(insertEmoji(event.target.alt)),
  openEmojiGroup: (index) => dispatch(openEmojiGroup(index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(muiThemeable()(EmojiList));
