import React from 'react';
import { Link } from "react-router-dom"

const NotFound = () => (
    <>
      <h1>
        404.
        <br/>
        <small>Здесь нечего смотреть. </small><img src="https://na.wargaming.net/clans/media/clans/emblems/cl_718/1000050718/emblem_195x195.png" alt="Печаль"/>
      </h1>
      <Link to="/">Главная страница</Link>
    </>
  );

export default NotFound;