"use client";

import { Provider } from "react-redux";
import { createStore } from "@/redux/store";
import { useRef } from "react";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export function StoreProvider({ children }) {
  const storeRef = useRef();
  if (!storeRef.current) {
    storeRef.current = createStore();
  }
  return (
    <Provider store={storeRef.current}>
      <DndProvider backend={HTML5Backend}>{children}</DndProvider>
    </Provider>
  );
}
