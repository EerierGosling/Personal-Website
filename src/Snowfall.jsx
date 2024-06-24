// used https://www.fabiofranchino.com/blog/how-to-use-matter-js-in-react-functional-component/ to start

import { useEffect, useRef, useState } from 'react'
import { Engine, Render, Bodies, World, Runner, Body } from 'matter-js'

function Snowfall() {
  const scene = useRef()
  const isPressed = useRef(false)
  const engine = useRef(Engine.create())
  const runner = useRef(Runner.create())
  const ballRef = useRef();

  const cw = window.innerWidth
  const ch = window.innerHeight

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

    // for (let i = 0; i < 100; i++) {
    //   addSnowflake()
    // }

    const interval = setInterval(() => {
      addSnowflake()
    }, 100); 

    const cursor = Bodies.circle(0, 0, 30, {
      render: {
        fillStyle: 'transparent',
      },
      isStatic: true
    });

    World.add(engine.current.world, [cursor]);
    ballRef.current = cursor;

    Runner.run(runner.current, engine.current);
    Render.run(render);

    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      Body.setPosition(ballRef.current, { x: clientX, y: clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
      Render.stop(render)
      World.clear(engine.current.world)
      Engine.clear(engine.current)
      Runner.stop(runner.current)
      render.canvas.remove()
      render.canvas = null
      render.context = null
      render.textures = {}
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
        fillStyle: '#000000'
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

  const handleMove = e => {
    if (isPressed.current) {
      const ball = Bodies.circle(
        e.clientX,
        e.clientY,
        10 + Math.random() * 30,
        {
          mass: 10,
          restitution: 0.9,
          friction: 0.005,
          render: {
            fillStyle: '#0000ff'
          }
        })
      World.add(engine.current.world, [ball])
    }
  }

  return (
    <div
      onMouseDown={handleDown}
      // onMouseUp={handleUp}
      // onMouseMove={handleMove}
      style={{ width: '100%', height: '100%' }}
    >
      <div ref={scene} style={{ width: '100%', height: '100%' }} />
    </div>
  )
}

export default Snowfall
