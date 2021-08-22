import React from "react";
import "jquery";
import "../../assets/images/favicon.ico";
import "../../assets/fonts/fontawesome/css/fontawesome-all.min.css";
import "../../assets/plugins/animation/css/animate.min.css";
import "../../assets/css/style.css";
import "../../assets/css/imagealign.css"
import getProxy from "../../proxyConfig";
import Cmargarita from "../../assets/images/CadillacMargrita.jpg"
import Hmargarita from "../../assets/images/honey-thyme-margarita-1.jpg"
import margarita from "../../assets/images/margarita.jpg"
import smargarita from "../../assets/images/skinnyPeach.jpg"
import strawMargarita from "../../assets/images/StrawberryMargarita.jpg"
import tMargarita from "../../assets/images/tropical.jpg"
export default function DrinkMenu(){
    return <div>


        <div className="container-fluid px-3 px-md-0">
        <div className="row">
            <div className="col-md-4">
        <img src={Cmargarita} style={{borderRadius:"8px", width:"250px", height:"400px"}} alt="Logo" />
                <h2 className="h4">Cadillac Margrita</h2>
                <p> INGREDIENTS</p>
                <li>3 tablespoons (1 ½ ounces) best quality tequila reposado</li>
                <li>2 tablespoons (1 ounce) Cointreau</li>
                <li>2 tablespoons (1 ounce) fresh lime juice</li>
                <li>2 tablespoons (1 ounce) Grand Marnier</li>
                <li>Kosher salt or flaky sea salt, for the rim</li>
            </div>
    </div>

        <div className="row">
            <div className="col-md-4">
                <img src={Hmargarita} style={{borderRadius: "8px", width: "250px", height: "400px"}} alt="Logo"/>
                <h2 className="h4">Honey Thyme Margarita</h2>

                <p> INGREDIENTS</p>
                <li>1 ½ oz silver tequila</li>
                <li>¾ oz fresh squeezed lime juice</li>
                <li>¾ oz fresh squeezed grapefruit juice</li>
                <li>½ oz orange liqueur, like Cointreu</li>
                <li>½ oz honey thyme syrup</li>
                <li>coarse sea salt, to rim serving glass</li>
            </div>
        </div>
        <div className="row">
            <div className="col-md-4">
                <img src={margarita} style={{borderRadius: "8px", width: "250px", height: "400px"}} alt="Logo"/>
                <h2 className="h4">Casual Margarita</h2>
                <p> INGREDIENTS</p>
                <li>2 lime wedges, for rimming glasses and garnish</li>
                <li>1/4 c. kosher salt or coarse sea salt, for rimming glassis</li>
                <li>4 oz. tequila</li>
                <li>2 oz. triple sec</li>
                <li>1 1/2 oz. freshly squeezed lime juice and Ice</li>
            </div>
        </div>
        <div className="row">
            <div className="col-md-4">
                <img src={smargarita} style={{borderRadius: "8px", width: "250px", height: "400px"}} alt="Logo"/>
                <h2 className="h4">Skinny Peach margarita</h2>
                <p> INGREDIENTS</p>
                <li>16 ounces frozen peaches</li>
                <li>½ cup Exotico Resposado Tequila</li>
                <li>1/4 cup fresh lime juice</li>
                <li>1 1/2 cup Mountain Vally Peach Sparkling Water</li>
                <li>1 tablespoon light agave nectar</li>
                <li>2 cups crushed ice and salt</li>
            </div>
        </div>
        <div className="row">
            <div className="col-md-4">
                <img src={strawMargarita} style={{borderRadius: "8px", width: "250px", height: "400px"}} alt="Logo"/>
                <h2 className="h4">Strawberry Margarita</h2>
                <p> INGREDIENTS</p>
                <li>Margarita salt,kosher salt and Lime wedges</li>
                <li>1 pound fresh strawberries hulled</li>
                <li>1 cup tequila</li>
                <li>2/3 cup fresh lime juice</li>
                <li>1/4 cup triple sec</li>
            </div>
        </div>
        <div className="row">
            <div className="col-md-4">
                <img src={tMargarita} style={{borderRadius: "8px", width: "250px", height: "400px"}} alt="Logo"/>
                <h2 className="h4">Tropical Margarita</h2>
                <p> INGREDIENTS</p>
                <li>1 1/2 cups frozen mango chunks</li>
                <li> 1 cup frozen pineapple chunks</li>
                <li> 2 Tablespoons fresh lime juice</li>
                <li> 1/2 cup silver tequila</li>
                <li> 1 Tablespoon orange liqueur</li>
                <li>1/4 cup shredded coconut finely chopped</li>
            </div>
        </div>
    </div>

        </div>


}

