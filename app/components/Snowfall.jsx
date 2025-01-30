// used https://www.fabiofranchino.com/blog/how-to-use-matter-js-in-react-functional-component/ to start

"use client"

import { useEffect, useRef, useState, useMemo } from 'react'
import { Engine, Render, Bodies, World, Runner, Body, Events } from 'matter-js'
import { useRouter, usePathname } from 'next/navigation';


function Snowfall() {
  const scene = useRef()
  const engine = useRef(Engine.create())
  const runner = useRef(Runner.create())
  const ballRef = useRef();

  const [viewWidth, setViewWidth] = useState(0);
  const [viewHeight, setViewHeight] = useState(0);
  const [height, setHeight] = useState(0);

  const allSnowflakes = useRef([]); // Use ref to persist the array across renders

  let walls = []

  const snowflakes = [
    '/snowflakes/1.svg',
    '/snowflakes/2.svg',
    '/snowflakes/3.svg'
  ]

  const generateWalls = (width, height) => {
    return [
      Bodies.rectangle(width / 2, -10, width, 20, { isStatic: true, render: {fillStyle: 'transparent'}}),
      Bodies.rectangle(-10, height / 2, 20, height, { isStatic: true, render: {fillStyle: 'transparent'} }),
      Bodies.rectangle(width / 2, height + 10, width, 20, { isStatic: true, render: {fillStyle: 'transparent'} }),
      Bodies.rectangle(width + 10, height / 2, 20, height, { isStatic: true, render: {fillStyle: 'transparent'}})
    ]
  }

  // const router = useRouter();
  // const pathname = usePathname();

  // let prevPathname = pathname;

  useEffect(() => {

    setHeight(document.documentElement.scrollHeight);
    setViewHeight(window.innerHeight);
    setViewWidth(window.innerWidth);

    const render = Render.create({
      element: scene.current,
      engine: engine.current,
      options: {
        width: viewWidth,
        height: viewHeight,
        wireframes: false,
        background: 'transparent'
      }
    })

    // Set gravity
    engine.current.gravity.y = 0.05

    walls = generateWalls(viewWidth, viewHeight)

    World.add(engine.current.world, walls)

    Runner.run(runner.current, engine.current)
    Render.run(render)

    const interval = setInterval(() => {
      addSnowflake()
      if (allSnowflakes.current.length > 100) {
        World.remove(engine.current.world, allSnowflakes.current.shift());
      }
    }, 300); 

    const cursor = Bodies.circle(0, 0, 30, {
      render: {
        fillStyle: 'transparent',
      },
      isStatic: true
    });

    World.add(engine.current.world, [cursor]);
    ballRef.current = cursor;

    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      Body.setPosition(ballRef.current, { x: clientX, y: clientY+window.scrollY });
    };

    const handleResize = () => {
      setViewWidth(window.innerWidth);
      setViewHeight(window.innerHeight);

      if (render.canvas) {
        render.canvas.width = window.innerWidth;
        render.canvas.height = window.innerHeight;
        Render.run(render)
      }

      World.remove(engine.current.world, walls);

      walls = generateWalls(window.innerWidth, window.innerHeight)

      World.add(engine.current.world, walls)
      
    };

    handleResize();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearInterval(interval);
      Runner.stop(runner.current);
      Render.stop(render);

      World.clear(engine.current.world, false);
      Engine.clear(engine.current);

      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      if (render.canvas) {
        render.canvas.remove();
        render.canvas = null;
      }

      render.context = null;
      render.textures = {};
    }
  }, []) // pathname

  const addSnowflake = () => {
    const xPosition = Math.random() * window.innerWidth;
    const sizeShift = Math.random();
    const size = 4 + 4*sizeShift; // Existing size variation
    const initialVelocityX = Math.random() * 0.5 - 0.25; // Random horizontal velocity
    const initialVelocityY = Math.random() * 0.5; // Random vertical velocity to add to the initial drop
    const angularVelocity = Math.random() * 0.05 - 0.025; // Random angular velocity
  
    const newSnowflake = Bodies.circle(xPosition, 0, size, {
      restitution: 0.5 + Math.random() * 0.1, // Optional: Adding randomness to restitution
      frictionAir: 0.01 + Math.random() * 0.005, // Optional: Adding randomness to air friction
      // Set initial velocity
      velocity: { x: initialVelocityX, y: initialVelocityY },
      // Set angular velocity
      angularVelocity: angularVelocity,
      render: {
        sprite: {
          texture: snowflakes[Math.floor(Math.random() * snowflakes.length)],
          xScale: 0.06*(2*sizeShift+1),
          yScale: 0.06*(2*sizeShift+1)
        },
        fillStyle: 'transparent'
      }
    });

    allSnowflakes.current.push(newSnowflake);
  
    World.add(engine.current.world, newSnowflake);
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
      style={{ width: '100%', height: '100%', position: 'fixed', top: 0, left: 0}}
    >
      <div ref={scene} style={{ width: '100%', height: viewHeight}} />
    </div>
  )
}

export default Snowfall
