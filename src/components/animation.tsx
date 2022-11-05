import { Component, onMount } from "solid-js";
import * as PIXI from "pixi.js";

export const AnimationImage: Component<{ width: number; height: number; image: string; depth: string; speed: number }> = (
    props
  ) => {
    let ref;
  
    onMount(() => {
      const app = new PIXI.Application({ width: props.width / 1.03, height: props.height / 1.03, backgroundAlpha: 0 });
      ref.appendChild(app.view);
      let sprite = PIXI.Sprite.from(props.image);
      app.stage.addChild(sprite);
      sprite.width = props.width;
      sprite.height = props.height;
      let depthMap = PIXI.Sprite.from(props.depth);
      app.stage.addChild(depthMap);
  
      let displacementFilter = new PIXI.filters.DisplacementFilter(depthMap);
      app.stage.filters = [displacementFilter];
  
      window.onmousemove = function (e) {
        displacementFilter.scale.x = (window.innerWidth / 2 - e.clientX) / (100 / props.speed);
        displacementFilter.scale.y = (window.innerHeight / 2 - e.clientY) / (100 / props.speed);
      };
    });
  
    return (
      <div class="animated animate-fade-in flex mx-auto">
        <div class=" mx-auto" ref={ref}></div>
      </div>
    );
  };