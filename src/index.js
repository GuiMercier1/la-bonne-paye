import './index.css';
import 'animate.css/animate.min.css';
import React from 'react';
import ReactDOM from 'react-dom';

class Card extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isFlipped: false,
            first: true,
            content: undefined
        };

        this.flipCard = this.flipCard.bind(this);
        this.validateCard = this.validateCard.bind(this);
    }

    flipCard() {
        this.setState({
            isFlipped: true
        });
    }

    validateCard() {
        this.setState({
            isFlipped: false,
            first: false
        });
    }

    render() {

        let className = "card ";

        if (this.state.isFlipped) {
            className += "is-flipped";
        } else if (!this.state.first) {
            className += "animated bounceOutRight";
        }

        const button = this.state.isFlipped ? (<button onClick={() => this.validateCard()}>OK</button>) : "";

        return (
            <div className="card-wrapper">
                <div className="scene scene--card">
                    <div className={className}
                        onClick={() => !this.isFlipped ? this.flipCard() : false}
                        onAnimationEnd={() => this.state.isFlipped ? this.props.destroyCallback() : false}>
                        <div className="card__face card__face--front">EVENEMENT</div>
                        <div className="card__face card__face--back">{this.props.card.content}</div>
                    </div>
                </div>
                {button}
            </div>
        );
    }
}

class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cards: []
        };

        // Get cards from JSON and random sort them

        this.state.cards.push({ content: "Oui oui", id: Math.random() % 100 });
        this.state.cards.push({ content: "Non non", id: Math.random() % 100 });
    }

    destroyFirstCard() {
        let cards = this.state.cards.slice();
        cards.splice(0, 1);

        this.setState({
            cards: cards
        });
    }

    render() {

        const cards = this.state.cards.map((card, index) => {
            return (
                <Card key={card.id} card={card} isCurrentCard={index === 0} destroyCallback={() => this.destroyFirstCard()} />
            )
        });

        return (
            <div className="game-container">
                <div className="game-wrapper">
                    {cards}
                </div>
            </div>
        );
    }

}

// ==========================
// INIT
// ==========================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);