import Physics from "./physics";

namespace Circle {
  export type Circle = {
    position: Physics.Point;
    radius: number;
    velocity: Physics.Velocity;
    mass: number;
    colour: string;
  };

  type Create = (
    position: Physics.Point,
    radius: number,
    velocity?: Physics.Velocity,
    colour?: string
  ) => Circle;
  export const create: Create = (
    position,
    radius,
    velocity = { x: 0, y: 0 },
    colour = "rgba(29, 0, 255, 0.5)"
  ) => ({
    position,
    radius,
    velocity,
    mass: Math.PI * radius ** 2, // mass is proportional to area
    colour,
  });

  export const draw =
    (ctx: CanvasRenderingContext2D) =>
    ({ position, radius, colour }: Circle) => {
      ctx.save();

      const path = new Path2D();
      ctx.fillStyle = colour;
      path.arc(position.x, position.y, radius, 0, 2 * Math.PI);
      ctx.fill(path);
      ctx.restore();

      return path;
    };

  export const circleCollision =
    (circle1: Circle) =>
    (circle2: Circle): boolean => {
      if (circle1 === circle2) return false;

      const yLength = Math.abs(circle1.position.y - circle2.position.y);
      const xLength = Math.abs(circle1.position.x - circle2.position.x);
      const distance = Math.sqrt(Math.pow(yLength, 2) + Math.pow(xLength, 2));

      return distance <= circle1.radius + circle2.radius;
    };

  const velocityAfterCollision = (c1: Circle, c2: Circle): Physics.Velocity => {
    const distanceBetweenCentres = Math.sqrt(
      (c1.position.x - c2.position.x) ** 2 +
        (c1.position.y - c2.position.y) ** 2
    );

    const normOfCentres = Physics.vectorDivScalar(
      Physics.vectorSubtract(c2.position, c1.position),
      distanceBetweenCentres
    );

    const p =
      (2 *
        (Physics.dotProduct(c1.velocity, normOfCentres) -
          Physics.dotProduct(c2.velocity, normOfCentres))) /
      (c1.mass + c2.mass);

    return Physics.vectorSubtract(
      c1.velocity,
      Physics.vectorXScalar(normOfCentres, p * c1.mass)
    );
  };

  export const detectCollision = (
    canvasWidth: number,
    canvasHeight: number,
    circles: Circle[],
    circle: Circle,
    disableCircleCollision: boolean = false
  ): Circle => {
    const collidingCircles = !disableCircleCollision && circles.filter(circleCollision(circle));

    const collidesWithRightEdge =
      circle.position.x + circle.velocity.x > canvasWidth - circle.radius;
    const collidesWithLeftEdge =
      circle.position.x + circle.velocity.x < circle.radius;
    const collidesWithBottomEdge =
      circle.position.y + circle.velocity.y > canvasHeight - circle.radius;
    const collidesWithTopEdge =
      circle.position.y + circle.velocity.y < circle.radius;

    const velocity = { x: circle.velocity.x, y: circle.velocity.y };

    if (collidesWithRightEdge || collidesWithLeftEdge) {
      velocity.x = -circle.velocity.x;
    }

    if (collidesWithBottomEdge || collidesWithTopEdge) {
      velocity.y = -circle.velocity.y;
    }

    if (collidingCircles.length) {
      const { x, y } = velocityAfterCollision(circle, collidingCircles[0]);
      velocity.x = x;
      velocity.y = y;
    }

    return {
      ...circle,
      velocity,
    };
  };

  export const applyVelocity = (circle: Circle): Circle => ({
    ...circle,
    position: {
      x: circle.position.x + circle.velocity.x,
      y: circle.position.y + circle.velocity.y,
    },
  });

  export const drawCircles =
    (ctx: CanvasRenderingContext2D) =>
    (circles: Circle[]): Path2D[] =>
      circles.map(draw(ctx));

  type RenderCirclesParams = {
    context: CanvasRenderingContext2D;
    minRadius: number;
    maxRadius: number;
    maxSpeed: number;
  };
  export const renderCircles = (
    params: RenderCirclesParams,
    n: number,
    circles: Circle[] = []
  ): Circle[] => {
    const { context, minRadius, maxRadius, maxSpeed } = params;

    if (n > 0) {
      const radius = Math.floor(
        Math.random() * (maxRadius - minRadius + 1) + minRadius
      );
      let position = Physics.randomPosition(
        context.canvas.width,
        context.canvas.height,
        radius
      );
      const velocity = Physics.randomVelocity(maxSpeed);

      const newCircle = create(position, radius, velocity);

      const collidesWithOtherCircle = !!circles.find(
        circleCollision(newCircle)
      );

      if (collidesWithOtherCircle) {
        return renderCircles(params, n, circles);
      }

      return renderCircles(params, n - 1, [...circles, newCircle]);
    }
    return circles;
  };
}

export default Circle;
