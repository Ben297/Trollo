import React, { Component } from "react";
import { connect } from "react-redux";
import { Droppable } from "react-beautiful-dnd";
import Card from "../Card/Card";
import { Spin } from "antd";
import PropTypes from "prop-types";

class Cards extends Component {
  static propTypes = {
    listId: PropTypes.string.isRequired,
    cards: PropTypes.arrayOf(PropTypes.string).isRequired
  };

  componentDidUpdate = prevProps => {
    // Scroll to bottom of list if a new card has been added
    if (
      this.props.cards[this.props.cards.length - 2] ===
      prevProps.cards[prevProps.cards.length - 1]
    ) {
      this.scrollToBottom();
    }
  };

  scrollToBottom = () => {
    this.listEnd.scrollIntoView();
  };

  render() {
    const { listId, cards, cardLoading } = this.props;
    return (
      <div>
        {!cardLoading && (
          <Droppable droppableId={listId}>
            {(provided, { isDraggingOver }) => (
              <>
                <div className="cards" ref={provided.innerRef}>
                  {cards.map((cardId, index) => (
                    <Card
                      isDraggingOver={isDraggingOver}
                      key={cardId}
                      cardId={cardId}
                      index={index}
                      listId={listId}
                    />
                  ))}
                  {provided.placeholder}
                  <div
                    style={{ float: "left", clear: "both" }}
                    ref={el => {
                      this.listEnd = el;
                    }}
                  />
                </div>
              </>
            )}
          </Droppable>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const cards = state.lists.byId[ownProps.listId].cards;
  return {
    cardLoading: state.cards.loading,
    cards
  }
};

export default connect(mapStateToProps)(Cards);
