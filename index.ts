const w : number = window.innerWidth 
const h : number = window.innerHeight 
const parts : number = 4 
const scGap : number = 0.02 / parts 
const strokeFactor : number = 90 
const sizeFactor : number = 9.5 
const delay : number = 20 
const backColor : string = "#bdbdbd"
const colors : Array<string> = [
    "#F44336",
    "#3F51B5",
    "#4CAF50",
    "#FF5722",
    "#4CAF50"
]

class ScaleUtil {

    static maxScale(scale : number, i : number, n : number) : number {
        return Math.max(0, scale - i / n)
    }

    static divideScale(scale : number, i : number, n : number) : number {
        return ScaleUtil.maxScale(scale, i, n)
    }
    
    static sinify(scale : number) : number {
        return Math.sin(scale * Math.PI)
    }
}