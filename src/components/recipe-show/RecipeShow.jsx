import React from 'react';
import Button from '../../components/button/Button';
import Container from '../container/Container';
import './recipe-show.scss';

function RecipeShow({ recipe}) {
  const createQrCode = () => {
    console.log("write logic for create qr");
  }
  return (
    <div className='RecipeDetailShow'>
        
        <Container>
                {/* <div className='component-heading'>
                    <h1>Recipe List</h1>
                </div> */}
                <div className='listContainer'>
                    {/* <div className='list-heading'>
                        <Button
                            buttonText={'Add New Recipe'}
                            buttonType="primary"
                            size={'medium'}
                            onClickFunc={createQrCode}
                         />
                    </div> */}
                    <div className="recipeDetails">
                      <div className="image-part">
                        <img src={`${process.env.REACT_APP_S3_URL_PREFIX}/${recipe?.recipePic}`} alt="" />
                      </div>
                      <div className="description-part">
                      <h2 className='product-name'>{ recipe.name }</h2>
                      <p className='product-description'>{ recipe.description }</p>
                      </div>
                    </div>
                </div>
                    </Container>
    </div>
  )
}

export default RecipeShow