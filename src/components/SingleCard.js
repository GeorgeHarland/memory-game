import './SingleCard.css'

export default function SingleCard({card,handleChoice,flipped,disabled}) {

    const handleClick = () => {
        if (!disabled) {
            handleChoice(card)
        }
        handleChoice(card)
    }

    return (
        <div className="card">
            <div className={flipped ? "flipped" : ""}>
              <img className="picture" src={card.src} alt="card front" />
              <img className="cover" src="/img/hidden.png" onClick={handleClick} alt="card back" />
            </div>
        </div>
    )
}
