import { dotProduct, Point, subtractVector, vectorNorm, vectorXScalar, Velocity } from "./common"

export type Circle = {
  position: Point
  radius: number
  velocity: Velocity
  mass: number
  colour: string
}

type Create = (position: Point, radius: number, velocity?: Velocity, colour?: string) => Circle
export const create: Create = (position, radius, velocity = { x: 0, y: 0 }, colour = 'rgba(29, 0, 255, 0.5)') => ({
  position,
  radius,
  velocity,
  mass: Math.PI * radius**2, // mass is assumed to be proportional to area
  colour,
})

export const draw = (ctx: CanvasRenderingContext2D) => ({ position, radius, colour }: Circle) => {
  ctx.save()

  const path = new Path2D()
  ctx.fillStyle = colour
  path.arc(position.x, position.y, radius, 0, 2 * Math.PI)
  ctx.fill(path) 
  ctx.restore()

  return path
}

export const circleCollision = (circle1: Circle) => (circle2: Circle): boolean => {
  if (circle1 === circle2) return false

  const yLength = Math.abs(circle1.position.y - circle2.position.y)
  const xLength = Math.abs(circle1.position.x - circle2.position.x)
  const distance = Math.sqrt(Math.pow(yLength, 2) + Math.pow(xLength, 2))

  return distance <= circle1.radius + circle2.radius
}

const velocityAfterCollision = (c1: Circle, c2: Circle): Velocity => {
  const massRatio = (2 * c2.mass) / (c1.mass + c2.mass)
  const diffV1V2 = subtractVector(c1.velocity, c2.velocity)
  const diffX1X2 = subtractVector(c1.position, c2.position)
  const normDiffX1X2 = vectorNorm(diffX1X2)
  const normSquare = normDiffX1X2**2
  const vDiffDotXDiff = dotProduct(diffV1V2, diffX1X2)
  const dotprodDivNormsquare = vDiffDotXDiff / normSquare

  return subtractVector(c1.velocity, vectorXScalar(diffX1X2, (massRatio * dotprodDivNormsquare)))
}

export const detectCollision = (canvasWidth: number, canvasHeight: number, circles: Circle[], circle: Circle): Circle => {
  const collidesWithCircle = circles.find(circleCollision(circle))
  const collidesWithRightEdge = circle.position.x + circle.velocity.x > canvasWidth - circle.radius
  const collidesWithLeftEdge = circle.position.x + circle.velocity.x < circle.radius
  const collidesWithBottomEdge = circle.position.y + circle.velocity.y > canvasHeight - circle.radius
  const collidesWithTopEdge = circle.position.y + circle.velocity.y < circle.radius

  const velocity = { x: circle.velocity.x, y: circle.velocity.y }

  if (collidesWithRightEdge || collidesWithLeftEdge) {
    velocity.x = -circle.velocity.x
  }

  if (collidesWithBottomEdge || collidesWithTopEdge) {
    velocity.y = -circle.velocity.y
  }

  if (collidesWithCircle) {
    const { x, y } = velocityAfterCollision(circle, collidesWithCircle)
    velocity.x = x
    velocity.y = y
  }

  return {
    ...circle,
    velocity
  }
}

export const applyVelocity = (circle: Circle): Circle => ({
  ...circle,
  position: {
    x: circle.position.x + circle.velocity.x,
    y: circle.position.y + circle.velocity.y
  }
})

export const drawCircles = (ctx: CanvasRenderingContext2D) => (circles: Circle[]): Path2D[] => circles.map(draw(ctx))
