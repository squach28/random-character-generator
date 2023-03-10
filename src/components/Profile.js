import './Profile.css'

const Profile = (props) => {
    console.log(props.character)
    return(
         <div className="profile-grid">
                <img className="character-image" src={props.character.picture.large} alt="character" />
                <h1 className="character-name">{props.character.name.first} {props.character.name.last}</h1>
                <div className="tel-city-container">
                    <h2>Phone: {props.character.cell}</h2>
                    <h2>Location: {`${props.character.location.city},`} {props.character.location.state}</h2>
                </div>
                <p>Hobbies</p>
                <ul className="hobbies-list"> 
                    {props.character.activities.hobbies.map(hobby => (<li key={hobby}>{hobby}</li>))}
                </ul>
                <p>Dislikes</p>
                <ul className="dislikes-list">
                    {props.character.activities.dislikes.map(dislike => (<li key={dislike}>{dislike}</li>))}
                </ul>
        </div>
    )
}

export default Profile