import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import PropTypes from "prop-types";
import Constants from "@constants";
import SuperAlert from "./SuperAlert";
import MainButton from "@buttons/MainButton/MainButton";

import Utils from "@utils";
import { connect } from "react-redux";

class SimpleAlert extends Component {
  static propTypes = {
    navigator: PropTypes.object,
    text: PropTypes.string,
    cancelTitle: PropTypes.string,
    okTitle: PropTypes.string,
    action: PropTypes.func,
  };

  render() {
    return (
      <SuperAlert
        componentId={this.props.componentId}
        onClose={() => Utils.closeOverlay(this.props.componentId)}
        ref={(parentRef) => {
          this.parentRef = parentRef;
        }}
        content={
          <View
            style={{
              alignItems: "center",
              width: "100%",
            }}
          >
            <Text
              style={[
                Constants.NORMAL_FONT_STYLE,
                {
                  textAlign: "center",
                  paddingBottom: Constants.MAIN_MARGIN,
                },
              ]}
            >
              {this.props.text}
            </Text>
            {this.props.content}

            {this.props.action ? (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: this.props.cancelTitle
                    ? "space-between"
                    : "center",
                  width: "100%",
                  marginTop: Constants.MAIN_MARGIN,
                  alignSelf: "center",
                }}
              >
                {this.props.cancelTitle ? (
                  <MainButton
                    onPress={() => {
                      this.parentRef.close();
                    }}
                    fontColor={Constants.FONT_COLOR}
                    borderColor={Constants.FONT_COLOR}
                    title={this.props.cancelTitle}
                    width={"45%"}
                  />
                ) : null}
                <MainButton
                  onPress={() => {
                    this.parentRef.close();
                    this.props.action();
                  }}
                  title={this.props.okTitle ? this.props.okTitle : "OK"}
                  width={this.props.cancelTitle ? "45%" : "90%"}
                />
              </View>
            ) : null}
          </View>
        }
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    defaultOrg: state.userReducer.defaultOrg,
  };
};

export default connect(mapStateToProps)(SimpleAlert);
