import * as Circle from './circle'
import { generateRandomPosition, generateRandomVelocity } from './common'
import { state } from './store'
import './index.css'

let canvas: HTMLCanvasElement | null
let context: CanvasRenderingContext2D | null

const update = (ctx: CanvasRenderingContext2D) => () => {
  requestAnimationFrame(update(ctx))

  const drawCirclesOnCanvas = Circle.drawCircles(ctx)

  const { canvasWidth, canvasHeight, circles } = state
  
  ctx.fillStyle = "white"
  ctx.fillRect(0, 0, canvasWidth, canvasWidth)

  drawCirclesOnCanvas(circles)
  
  const updatedCircles = state.circles.map(c => Circle.applyVelocity(Circle.detectCollision(canvasWidth, canvasHeight, circles, c)))
  // store.dispatch(updateCircles(updatedCircles))
  state.circles = updatedCircles
}

type CreateManyCirclesParams = {
  context: CanvasRenderingContext2D
  minRadius: number
  maxRadius: number
  maxSpeed: number
}
const createManyCircles = (params: CreateManyCirclesParams, n: number, circles: Circle.Circle[] = []): Circle.Circle[] => {
  const { context, minRadius, maxRadius, maxSpeed } = params

  if (n > 0) {
    const radius = Math.floor((Math.random() * (maxRadius - minRadius + 1)) + minRadius) // random int between 10 and 15
    let position = generateRandomPosition(context.canvas.width, context.canvas.height, radius)
    const velocity = generateRandomVelocity(maxSpeed)

    const newCircle = Circle.create(position, radius, velocity)

    const collidesWithOtherCircle = !!circles.find(Circle.circleCollision(newCircle))

    if (collidesWithOtherCircle) {
      return createManyCircles(params, n, circles)
    }

    return createManyCircles(params, n - 1, [...circles, newCircle])
  }
    return circles
}

window.onload = () => {
  canvas = document.querySelector('#canvas')
  context = canvas && canvas.getContext('2d')

  const { canvasWidth, canvasHeight, numCircles, minRadius, maxRadius, maxSpeed } = state
  
  if (canvas && context) {
    canvas.width = canvasWidth
    canvas.height = canvasHeight
    
    const initialCircles = createManyCircles({ context, minRadius, maxRadius, maxSpeed  }, numCircles)
    state.circles = initialCircles
    // store.dispatch(updateCircles(initialCircles))

    const updateContext = update(context)
    updateContext()
  }
}
