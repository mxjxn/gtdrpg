(ns electron.core)

(set! *warn-on-infer* true)

(def electron (js/require "electron"))
(def app (.-app electron))
(def browser-window (.-BrowserWindow electron))
(def crash-reporter (.-crashReporter electron))

(def main-window (atom nil))

(defn init-browser []
  (reset! main-window (browser-window.
                         (clj->js {:width 800
                                   :height 600})))
  (.loadURL ^js/electron.BrowserWindow @main-window (str "file://" js/__dirname "/public/index.html"))

  (.on ^js/electron.BrowserWindow @main-window "closed" #(reset! main-window nil)))

(.on app "window-all-closed" #(when-not (= js/process.platform "darwin")
                                (.quit app)))
(.on app "ready" init-browser)
