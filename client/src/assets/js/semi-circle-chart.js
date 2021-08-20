import ReactDom from "react-dom";
export default class SemiCircleChart{
    constructor(){
        //default values
        this.chart_border_color = "rgba(190,218,249,0.7)";
        this.chart_border_thickness = "1px";
        this.chart_filling_color = "royalblue";
        this.chart_filling_color_danger = "red";
        this.chart_filling_color_warn = "orange";
        this.fontSize = "16px";
        this.width = "100px";
        this.height = "100px";
        this.filler_steps = 3;
        this.filler_timing = 20;
        this.backgroundColor ="white";
    }
    setExternalBackgroundColor(color){
        this.backgroundColor = color;
    }
    setTriColor(normal,mid,end){
        this.chart_filling_color = normal;
        this.chart_filling_color_warn = mid;
        this.chart_filling_color_danger = end;
    }
    setBorderRGBA(red,green,blue,alpha){
        this.chart_border_color = "rgba("+red+","+green+","+blue+","+alpha+")";
    }
    setBorderHex(hex){
        this.chart_border_color = hex;
    }
    setBorderColor(color){
        this.chart_border_color = color;
    }
    setBackground(bg){
        this.chart_filling_color = bg;
    }
    setFillColor(color){
        this.chart_filling_color =  color;
    }
    setSteps(steps){
        this.filler_steps = steps;
    }
    setFillerMillis(t){
        this.filler_timing = t;
    }
    createText(text, top) {
        let txt = document.createElement("div");
        txt.style.fontSize = this.fontSize;
        txt.style.position = "relative";
        txt.style.top = top + "px";
        txt.innerHTML = text;
        return txt;
    }
    createSemiCirlce(z_index, default_angle, width, height){
        let semicircle = document.createElement("div");
        semicircle.style.width = width+'px';
        semicircle.style.height = height+'px';
        semicircle.style.borderTopLeftRadius = "100px";
        semicircle.style.borderTopRightRadius= '100px';
        semicircle.style.webkitTransformOrigin = "50% 100%";
        semicircle.style.transformOrigin = "50% 100%";
        semicircle.style.webkitTransform = "rotate("+default_angle+")";
        semicircle.style.transform = "rotate("+default_angle+")";
        semicircle.style.verticalAlign = "bottom";
        semicircle.style.textAlign = "center";
        semicircle.style.zIndex = z_index;
        return semicircle;
    }
    createRectangleCover(z_index,width, height, top, left){
        let rectanglecover = document.createElement('div');
        rectanglecover.style.width = width+'px';
        rectanglecover.style.height = height+'px';
        rectanglecover.style.position = "relative";
        rectanglecover.style.top = top+"px";
        rectanglecover.style.left = left+"px";
        rectanglecover.style.zIndex = z_index;
        return rectanglecover;
    }
    async draw(angle, bottom_text, middle_text, appendID){
        //filling, w=200, h=100
        let semiCircle = this.createSemiCirlce(-2, 0,200,100);
        semiCircle.style.backgroundColor = this.chart_filling_color;
        semiCircle.style.display = "table-cell";
        //outer border, w=200, h=100
        let semiCircleBorder = this.createSemiCirlce(-3,0,200,100);
        semiCircleBorder.style.position = "relative";
        semiCircleBorder.style.top = "-100px";
        semiCircleBorder.style.display = "inline-block";
        semiCircleBorder.style.border = this.chart_border_thickness+" solid "+this.chart_border_color;
        //inner border, w=160, h=80
        let semiCircleInner = this.createSemiCirlce(0,0,160,80);
        semiCircleInner.style.position = "relative";
        semiCircleInner.style.top = "-180px";
        semiCircleInner.style.left= "20px";
        semiCircleInner.style.backgroundColor = this.backgroundColor;
        semiCircleInner.style.border = this.chart_border_thickness+" solid "+this.chart_border_color;
        //middle text (text, top)
        let middleText = this.createText(middle_text,20);
        //bottom text
        let bottomText = this.createText(bottom_text,36);
        //add text into inner semi cirlce
        semiCircleInner.appendChild(middleText);
        semiCircleInner.appendChild(bottomText);
        //append semicircles in order
        document.getElementById(appendID).appendChild(semiCircle);
        document.getElementById(appendID).appendChild(semiCircleBorder);
        document.getElementById(appendID).appendChild(semiCircleInner);
        //close the caps at semicircular tube ends
        //left end
        //z-index, width, height, top, left
        let rectanglecoverleft = this.createRectangleCover(0,21,1,30,-21);
        rectanglecoverleft.style.backgroundColor = this.chart_border_color;
        semiCircleInner.appendChild(rectanglecoverleft);
        //right end
        let rectanglecoverRight = this.createRectangleCover(0,21,1,30,158);
        rectanglecoverRight.style.backgroundColor = this.chart_border_color;
        semiCircleInner.appendChild(rectanglecoverRight);
        //cover the semicircle when at 180 deg = bottom, using white rectangle
        //z-index, w, h, t, l
        let rectanglecoverbottom = this.createRectangleCover(-1,212,102,28,-30);
        rectanglecoverbottom.style.backgroundColor = this.backgroundColor;
        semiCircleInner.appendChild(rectanglecoverbottom);
        //rotate semiCircle upto angle, hence filling the tube
        for(let i=180;i<=(angle+180);i+=this.filler_steps){
            if(i>270 && i< 300){
                semiCircle.style.backgroundColor = this.chart_filling_color_warn;
            }else if(i>300){
                semiCircle.style.backgroundColor = this.chart_filling_color_danger;
            }
            semiCircle.style.webkitTransform = "rotate("+i+"deg)";
            semiCircle.style.transform = "rotate("+i+"deg)";
            await new Promise(resolve => setTimeout(resolve, this.filler_timing)); // 3 sec
        }
    }
}