(ns dev.core
  (:require [figwheel.client :as fw :include-macros true]
            [todoapp.core]))

(fw/watch-and-reload
  :websocket-url        "ws://localhost:3449/figwheel-ws"
  :jsload-callback (fn [] (print "reloaded")))
