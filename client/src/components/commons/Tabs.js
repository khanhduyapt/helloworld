import React, { useState } from "react";
import "./Tabs.css";

export default class Tabs extends React.Component {
  state = {
    activeTab: this.props.children[0].props.id,
  };
  changeTab = (tab) => {
    this.setState({ activeTab: tab });
  };

  render() {
    let content;
    let buttons = [];
    return (
      <div>
        {React.Children.map(this.props.children, (child) => {
          buttons.push({
            id: child.props.id,
            label: child.props.label,
            main: child.props.main,
            image: child.props.image,
          });
          if (child.props.id === this.state.activeTab)
            content = child.props.children;
        })}

        <TabButtons
          activeTab={this.state.activeTab}
          buttons={buttons}
          changeTab={this.changeTab}
        />
        <div className="tab__content">{content}</div>
      </div>
    );
  }
}

const TabButtons = ({ buttons, changeTab, activeTab }) => {
  return (
    <div className="tab__buttons">
      {buttons.map((button) => {
        return (
          <button
            key={button.id}
            className={button.id === activeTab ? "active" : ""}
            onClick={() => changeTab(button.id)}
          >
            <div className={`courses ${button.id}`}>
              <div className="courses__header">
                <h3>
                  <p className="line1">{button.label}</p>
                  <p className="line2">{button.main}</p>
                </h3>
              </div>

              <img src={button.image} className="img-responsive"></img>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export const Tab = (props) => {
  return <React.Fragment>{props.children}</React.Fragment>;
};
