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

class DrawingUtil {

    static drawLine(context : CanvasRenderingContext2D, x1 : number, y1 : number, x2 : number, y2 : number) {
        context.beginPath()
        context.moveTo(x1, y1)
        context.lineTo(x2, y2)
        context.stroke()
    }

    static drawRightAngleSquareFill(context : CanvasRenderingContext2D, scale : number) {
        const size : number = Math.min(w, h) / sizeFactor 
        const sf : number = ScaleUtil.sinify(scale)
        const y : number = size * ScaleUtil.divideScale(sf, 3, parts)
        context.save()
        context.translate(w / 2, h / 2)
        context.fillRect(-size, -y, 2 * size, 2 * y)
        for (var j = 0; j < 2; j++) {
            context.save()
            context.scale(1, 1 - 2 * j)
            context.translate(size * 0.5 * (1 - 2 * j), 0.4 * h * (1 - ScaleUtil.divideScale(sf, 2, parts)))
            for (var k = 0; k < 2; k++) {
                const xEnd = -size * (1 - 2 * j) * ScaleUtil.divideScale(sf, 0, parts) 
                context.save()
                context.translate(0, size / 2)
                context.rotate(k * ScaleUtil.divideScale(sf, 1, parts) * Math.PI / 2)
                DrawingUtil.drawLine(context, 0, 0, xEnd, 0)
                context.restore()
            }
            context.restore()
        }
        context.restore()
    }

    static drawRASFNode(context : CanvasRenderingContext2D, i : number, scale : number) {
        context.lineCap = 'round'
        context.lineWidth = Math.min(w, h) / strokeFactor 
        context.strokeStyle = colors[i]
        context.fillStyle = colors[i]
        DrawingUtil.drawRightAngleSquareFill(context, scale)
    }
}