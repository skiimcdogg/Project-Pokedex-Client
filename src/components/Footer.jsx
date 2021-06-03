import React from 'react'

import pokeballLogo4 from "./../styles/images/pokeball-logo-4.png"

const Footer = () => {
 return (
<div className="footer">
<div>

<p>Designed by <span>Antoine</span>, <span>Claire</span> & <span>Pauline</span></p>
</div>

<div className="pokeball-footer"> 
            <img  src={pokeballLogo4}/>
            </div>

<div className="portfolios">
<p>See our portfolios:</p>
<ul>
    <li><a href="https://www.antoinestouff.fr/" target="_blank" rel="noreferrer"><span>Antoine</span></a></li>
    <li><a href="https://www.clairesayart.fr/" target="_blank" rel="noreferrer"><span>Claire</span></a></li>
    <li><a href="https://www.paulinebellaud.fr/" target="_blank" rel="noreferrer"><span>Pauline</span></a></li>
</ul>
</div>

</div>
 )
}

export default Footer;