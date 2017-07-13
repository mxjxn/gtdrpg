(ns todoapp.core
  (:require 
    [reagent.core :as reagent]
    [re-frame.core :as rf]))

(defn ui []
  [:div 
   [:h1 "wow!"]])

(reagent/render [ui]
                (js/document.getElementById "app"))
