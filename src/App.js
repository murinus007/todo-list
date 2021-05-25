import React from "react";
import "./App.css";
import TodoItem from "./components/todoItem";
import TodoForm from "./components/todoForm";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      items: [],
    };

    this.iterator = 0;
  }

  addItem = (item) => {
    this.setState((state) => {
      let { items } = state;
      items.push({
        id: this.iterator,
        title: item,
        done: false,
      });
      this.iterator++;
      return items;
    });
  };

  doneItem = (id) => {
    const index = this.state.items.map((item) => item.id).indexOf(id);
    this.setState((state) => {
      let { items } = state;
      items[index].done = true;
      return items;
    });
  };

  deleteItem = (id) => {
    const index = this.state.items.map((item) => item.id).indexOf(id);
    this.setState((state) => {
      let { items } = state;
      delete items[index];
      return items;
    });
  };

  render() {
    const { items } = this.state;
    const activeItems = items.filter((item) => !item.done);
    const doneItems = items.filter((item) => item.done);

    return (
      <div className="App">
        <h1 className="top">Active tasks: {activeItems.length}</h1>
        <TodoForm addItem={this.addItem} />
        {[...activeItems, ...doneItems].map((item) => (
          <TodoItem
            doneItem={() => this.doneItem(item.id)}
            deleteItem={() => this.deleteItem(item.id)}
            item={item}
            key={item.id}
          />
        ))}
      </div>
    );
  }
}

export default App;
