import React from "react";
import "jquery";
import "../../assets/images/favicon.ico";
import "../../assets/fonts/fontawesome/css/fontawesome-all.min.css";
import "../../assets/plugins/animation/css/animate.min.css";
import "../../assets/css/style.css";
import "../../assets/css/imagealign.css"
import getProxy from "../../proxyConfig";
import cheeseBurger from "../../assets/images/cc.jpg";
import chickenBurger from "../../assets/images/ccc.jpg";
import fishBurger from "../../assets/images/bbb.jpeg";
import crispy from "../../assets/images/crispy.jpg";
import hamburger from "../../assets/images/hamburger.jpg";
import veggieBurger from "../../assets/images/veggieBurger.jpg";
export default function BurgerMenu(){
    return <div>


        <div className="container-fluid px-3 px-md-0">
            <div className="row">
                <div className="col-md-4">
                    <img src={veggieBurger} style={{borderRadius:"8px", width:"200px", height:"400px"}} alt="Logo" />
                    <h2 className="h4">Veggie Burger</h2>
                    <p> INGREDIENTS</p>
                    <li>1 1/2 pounds sweet potatoes</li>
                    <li>1 cup water</li>
                    <li>1/2 cup chopped red onion</li>
                    <li>1 can black beans, rinsed and drained</li>
                    <li>1/2 cup quinoa, rinsed in a fine-mesh colander</li>
                    <h2 className="h4">Price : Rs. 420.00</h2>
                </div>



                <div className="col-md-4">
                    <img src={cheeseBurger} style={{borderRadius: "8px",  width:"200px", height:"400px"}} alt="Logo"/>
                    <h2 className="h4">Cheese Burger</h2>

                    <p> INGREDIENTS</p>
                    <li> 2 pounds freshly ground chuck</li>
                    <li>1 tablespoon onion powder</li>
                    <li>1 teaspoon salt</li>
                    <li>1 teaspoon freshly ground black pepper</li>
                    <li>12 slices deli-counter American cheese</li>
                    <h2 className="h4">Price : Rs. 520.00</h2>
                </div>


                <div className="col-md-4">
                    <img src={chickenBurger} style={{borderRadius: "8px",  width:"200px", height:"400px"}} alt="Logo"/>
                    <h2 className="h4">Chicken Burger</h2>
                    <p> INGREDIENTS</p>
                    <li>1 1/2 lb. , ground chicken</li>
                    <li>3/4 tsp. , smoked paprika</li>
                    <li>1 , clove garlic, minced</li>
                    <li>3 , green onions, minced</li>
                    <li> Kosher salt</li>
                    <h2 className="h4">Price : Rs. 500.00</h2>
                </div>


                <div className="col-md-4">
                    <img src={fishBurger} style={{borderRadius: "8px", width:"200px", height:"400px"}} alt="Logo"/>
                    <h2 className="h4">Fish Burger</h2>
                    <p> INGREDIENTS</p>
                    <li>4 codfish fillet</li>
                    <li>1 cup panko breadcrumbs</li>
                    <li>½ tbsp smoked paprika</li>
                    <li> 1 tsp onion powder</li>
                    <li>½ tsp garlic powder</li>
                    <li>2 cups crushed ice and salt</li>
                     <h2 className="h4">Price : Rs. 550.00</h2>
                </div>

                <div className="col-md-4">
                    <img src={crispy} style={{borderRadius: "8px",width:"200px", height:"400px"}} alt="Logo"/>
                    <h2 className="h4">Crispy Chicken Burger</h2>
                    <p> INGREDIENTS</p>
                    <li>4 Boneless Skinless Chicken Breasts</li>
                    <li>Honey + Sriracha</li>
                    <li>8-12 rashers of Bacon, cooked to preference</li>
                    <h2 className="h4">Price : Rs. 580.00</h2>
                </div>

                <div className="col-md-4">
                    <img src={hamburger} style={{borderRadius: "8px", width:"200px", height:"400px"}} alt="Logo"/>
                    <h2 className="h4">Hamburger</h2>
                    <p> INGREDIENTS</p>
                    <li>  1 1/4 pounds ground chuck</li>
                    <li> 1 1/4 pounds ground sirloin</li>
                    <li>  Coarse salt and freshly ground black pepper</li>
                    <li>1/2 medium-size onion, cut into 8 thin wedges</li>
                    <h2 className="h4">Price : Rs. 450.00</h2>
                </div>

            </div>
        </div>


    </div>


}

