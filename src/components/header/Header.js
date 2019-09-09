import React, {Component} from "react";

class Header extends Component {
  render() {
    return (
      <header>
        <nav className="bg-light p-3">
          <div className="text-center">
            <h3>Data Visualizer</h3>
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;
