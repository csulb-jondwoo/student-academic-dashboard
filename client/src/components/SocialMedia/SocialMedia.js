import React, {Component} from 'react'
import Facebook from "../../utility/components/assets/facebook.png"
import Twitter from "../../utility/components/assets/twitter.png"
import Instagram from "../../utility/components/assets/instagram.png"
import Youtube from "../../utility/components/assets/Youtube.png"
import Reddit from "../../utility/components/assets/Reddit.png"

/**
 *  Social media icons
 *  @author Ryan Stehle
 */
class SocialMedia extends Component {
    render() {
        return (
            <div className="social-media-icons">
                <img src={Facebook} alt="Facebook"/>
                <img src={Twitter} alt="Twitter"/>
                <img src={Instagram} alt="Instagram"/>
                <img src={Youtube} alt="Youtube"/>
                <img src={Reddit} alt="Reddit"/>
            </div>
        );
    }
}

export default SocialMedia;
