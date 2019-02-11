// @flow

import React, { Component } from 'react';

import './styles.scss';

type Props = {
  recipe: Object,
};
const Recipe = ({ recipe }: Props) => (
  <div className="recipe">
    <a href={recipe.get('href')}>{recipe.get('title')}</a>
    <p>{recipe.get('ingredients')}</p>
  </div>
);

export default Recipe;
