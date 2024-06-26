// used https://www.fabiofranchino.com/blog/how-to-use-matter-js-in-react-functional-component/ to start

import { useEffect, useRef, useState } from 'react'
import { Engine, Render, Bodies, World, Runner, Body, Events } from 'matter-js'
import snowflake1 from './assets/snowflakes/1.svg'
import snowflake2 from './assets/snowflakes/2.svg'
import snowflake3 from './assets/snowflakes/3.svg'

function Snowfall() {
  const scene = useRef()
  const isPressed = useRef(false)
  const engine = useRef(Engine.create())
  const runner = useRef(Runner.create())
  const ballRef = useRef();

  const cw = window.innerWidth
  const ch = window.innerHeight

  const snowflakes = [snowflake1, snowflake2, snowflake3]

  useEffect(() => {
    const render = Render.create({
      element: scene.current,
      engine: engine.current,
      options: {
        width: cw,
        height: ch,
        wireframes: false,
        background: 'transparent'
      }
    })

    // Set gravity
    engine.current.gravity.y = 0.05

    // Add boundaries
    World.add(engine.current.world, [
      Bodies.rectangle(cw / 2, -10, cw, 20, { isStatic: true }),
      Bodies.rectangle(-10, ch / 2, 20, ch, { isStatic: true }),
      Bodies.rectangle(cw / 2, ch + 10, cw, 20, { isStatic: true }),
      Bodies.rectangle(cw + 10, ch / 2, 20, ch, { isStatic: true })
    ])

    Runner.run(runner.current, engine.current)
    Render.run(render)

    const interval = setInterval(() => {
      addSnowflake()
    }, 100); 

    const cursor = Bodies.circle(0, 0, 5, {
      render: {
        fillStyle: 'transparent',
      },
      isStatic: true
    });

    World.add(engine.current.world, [cursor]);
    ballRef.current = cursor;

    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      Body.setPosition(ballRef.current, { x: clientX, y: clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Events.on(engine.current, 'collisionStart', event => {
    //   const pairs = event.pairs;
  
    //   // Example: Assuming `trackedBody` is the body you want to check for collisions
    //   const trackedBodyId = trackedBody.id; // Make sure `trackedBody` is defined and has an id
  
    //   // Initialize an array to store bodies colliding with `trackedBody`
    //   let collidingBodies = [];
  
    //   // Iterate over the pairs to find collisions involving `trackedBody`
    //   pairs.forEach(pair => {
    //     if (pair.bodyA.id === trackedBodyId) {
    //       collidingBodies.push(pair.bodyB);
    //     } else if (pair.bodyB.id === trackedBodyId) {
    //       collidingBodies.push(pair.bodyA);
    //     }
    //   });
  
    //   // `collidingBodies` now contains all bodies colliding with `trackedBody`
    //   // You can now do something with this list
    //   console.log(collidingBodies);
    // });
    

    return () => {
      // Events.off(engine.current, 'collisionStart');
      // window.removeEventListener('mousemove', handleMouseMove);
      // clearInterval(interval);
      // Render.stop(render)
      // World.clear(engine.current.world)
      // Engine.clear(engine.current)
      // Runner.stop(runner.current)
      // render.canvas.remove()
      // render.canvas = null
      // render.context = null
      // render.textures = {}

      // Stop the engine
      Runner.stop(runner.current);
      Render.stop(render);

      // Clear the world and engine
      World.clear(engine.current.world, false); // false to not remove the renderer
      Engine.clear(engine.current);

      // Remove event listeners
      // Events.off(engine.current, 'collisionStart');
      window.removeEventListener('mousemove', handleMouseMove);

      // Check if the canvas exists before trying to remove it
      if (render.canvas) {
        render.canvas.remove();
        render.canvas = null;
      }

      // Now it's safe to nullify the context and textures
      render.context = null;
      render.textures = {};
    }
  }, [])

  const addSnowflake = e => {
    const xPosition = Math.random() * cw;
    const size = 3 + Math.random() * 0.1; // Existing size variation
    const initialVelocityX = Math.random() * 0.5 - 0.25; // Random horizontal velocity
    const initialVelocityY = Math.random() * 0.5; // Random vertical velocity to add to the initial drop
    const angularVelocity = Math.random() * 0.05 - 0.025; // Random angular velocity
  
    const ball = Bodies.circle(xPosition, 0, size, {
      restitution: 0.5 + Math.random() * 0.1, // Optional: Adding randomness to restitution
      frictionAir: 0.01 + Math.random() * 0.005, // Optional: Adding randomness to air friction
      // Set initial velocity
      velocity: { x: initialVelocityX, y: initialVelocityY },
      // Set angular velocity
      angularVelocity: angularVelocity,
      render: {
        sprite: {
          texture: snowflakes[Math.floor(Math.random() * snowflakes.length)],
          xScale: 0.06,
          yScale: 0.06
        },
        fillStyle: 'white'
      }
    });
  
    World.add(engine.current.world, ball);
  };

  const handleDown = e => {
    const ball = Bodies.circle(
      e.clientX,
      e.clientY,
      20,
      {
        isStatic: true
      })
    World.add(engine.current.world, [ball])
  }

  const handleUp = () => {
    
  }
  
  return (
    <div
      // onMouseDown={handleDown}
      // onMouseUp={handleUp}
      // onMouseMove={handleMove}
      style={{ width: '100%', height: '100%' }}
    >
      <div ref={scene} style={{ width: '100%', height: '100%' }} />
    </div>
  )
}

export default Snowfall
