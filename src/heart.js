import React, { Component } from "react";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


class Like extends Component {
    state = { liked: false };
toggle = () => {
    let localLiked = this.state.liked;

    // Toggle the state variable liked
    localLiked = !localLiked;
    this.setState({ liked: localLiked });
};
render() {
    return (
    <div className="container">
        <center>
        <div
            className="container"
            onClick={() => this.toggle()}
        >
                    { this.state.liked === false ? (
                        <FontAwesomeIcon icon={ faHeart } isLiked={ false }/>
            ) : (
                <FontAwesomeIcon icon={ faHeart } style={ { color: "red" } } isLiked/>
            ) }
        </div>
            </center>
            { console.log(this.state.liked) }
        </div>
        
    );
}
}

export default Like;