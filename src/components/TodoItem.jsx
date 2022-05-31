import React from "react";

export function TodoItem({ todo, }) {
  const { id, tasks, completed } = todo;
  return <li>{tasks}</li>;

}
