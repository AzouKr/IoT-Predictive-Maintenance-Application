import React, { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { LIGHT_THEME } from "../../constants/themeConstants";
import "./CreateModel.scss";

function CreateModel() {
  const { theme } = useContext(ThemeContext); // Accessing theme from ThemeContext

  return (
    <div className="min-h-min w-full">
      <div className="flex w-full h-[80vh]">
        <div className="h-[80vh] w-[50%]">
          <h1
            className={`text-center text-[3vh] font-bold ${
              theme === LIGHT_THEME ? `text-black` : `text-white`
            } mt-[10vh] mb-[5vh]`}
          >
            AutoML: rationalisez votre processus d'apprentissage automatique
          </h1>
          <p
            className={`text-center text-[2vh] font-bold ${
              theme === LIGHT_THEME ? `text-black` : `text-white`
            } mt-[10vh] mb-[5vh]`}
          >
            Laissez notre système faire le gros du travail à votre place. Nous
            sélectionnerons automatiquement les meilleurs paramètres et
            algorithmes, garantissant une précision optimale sans intervention
            manuelle. Asseyez-vous et détendez-vous pendant que nous gérons pour
            vous les complexités de la sélection de modèles.
          </p>
          <div className="h-[10vh] w-full flex items-center justify-center">
            <a href="/createmodel/auto">
              <button className="btn bg-blue-600 dark:bg-blue-600 text-white hover:bg-blue-700 m-4">
                Création automatique
              </button>
            </a>
          </div>
        </div>
        <div
          className={`divider divider-horizontal ${
            theme === LIGHT_THEME ? `text-black` : `text-white`
          }`}
        >
          OR
        </div>
        <div className="h-[80vh] w-[50%]">
          <h1
            className={`text-center text-[3vh] font-bold ${
              theme === LIGHT_THEME ? `text-black` : `text-white`
            } mt-[10vh] mb-[5vh]`}
          >
            Manual Mode: Fine-Tune Your Machine Learning Experience
          </h1>
          <p
            className={`text-center text-[2vh] font-bold ${
              theme === LIGHT_THEME ? `text-black` : `text-white`
            } mt-[10vh] mb-[5vh]`}
          >
            Prenez le contrôle total de votre parcours d’apprentissage
            automatique avec le mode manuel. Ici, vous avez la possibilité de
            sélectionner manuellement les paramètres et les algorithmes en
            fonction de vos préférences et de votre expertise. Que vous
            expérimentiez différents paramètres ou que vous ayez des exigences
            spécifiques en tête, le mode manuel vous permet d'adapter vos
            modèles à vos besoins précis.
          </p>
          <div className="h-[10vh] w-full flex items-center justify-center">
            <a href="/createmodel/manual">
              <button className="btn bg-blue-600 dark:bg-blue-600 text-white hover:bg-blue-700 m-4">
                Création manuelle
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateModel;
